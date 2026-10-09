import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';

export interface OAuthTokens {
  access_token: string;
  refresh_token?: string;
  token_type?: string;
  expires_in?: number;
  scope?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  // OAuth2 authorization-code + refresh-token endpoints
  private readonly authorizeUrl = '/api/oauth/authorize';
  private readonly tokenUrl = '/api/oauth/token';
  private readonly clientId = 'store-locator-web';
  private readonly scope = 'stores callbacks';
  private readonly storageKey = 'sl_oauth_tokens';

  // de-duplicates concurrent refreshes when several calls 401 at once
  private refreshInFlight$: Observable<string> | null = null;

  constructor(private http: HttpClient) { }

  get accessToken(): string | null {
    var tokens = this.readTokens();
    return tokens ? tokens.access_token : null;
  }

  get hasRefreshToken(): boolean {
    var tokens = this.readTokens();
    return !!(tokens && tokens.refresh_token);
  }

  get isLoggedIn(): boolean {
    return !!this.accessToken;
  }

  // starts the OAuth2 authorization-code flow
  login(redirectUri: string = window.location.origin + window.location.pathname) {
    var params = new HttpParams()
      .set('response_type', 'code')
      .set('client_id', this.clientId)
      .set('redirect_uri', redirectUri)
      .set('scope', this.scope);
    window.location.href = this.authorizeUrl + '?' + params.toString();
  }

  // exchanges the ?code= from the redirect for an access + refresh token
  handleRedirect(code: string, redirectUri: string = window.location.origin + window.location.pathname): Observable<OAuthTokens> {
    var body = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('code', code)
      .set('client_id', this.clientId)
      .set('redirect_uri', redirectUri);
    return this.postToken(body);
  }

  // swaps the refresh token for a fresh access token
  refreshAccessToken(): Observable<string> {
    if (this.refreshInFlight$) {
      return this.refreshInFlight$;
    }
    var tokens = this.readTokens();
    if (!tokens || !tokens.refresh_token) {
      return throwError(() => new Error('No refresh token available'));
    }
    var body = new HttpParams()
      .set('grant_type', 'refresh_token')
      .set('refresh_token', tokens.refresh_token)
      .set('client_id', this.clientId);
    this.refreshInFlight$ = this.postToken(body).pipe(
      map((res) => res.access_token),
      finalize(() => { this.refreshInFlight$ = null; })
    );
    return this.refreshInFlight$;
  }

  logout() {
    try {
      localStorage.removeItem(this.storageKey);
    } catch (e) {
      // storage unavailable
    }
  }

  private postToken(body: HttpParams): Observable<OAuthTokens> {
    return this.http.post<OAuthTokens>(this.tokenUrl, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).pipe(
      tap((res) => this.writeTokens(res)),
      catchError((err) => {
        this.logout();
        return throwError(() => err);
      })
    );
  }

  private readTokens(): OAuthTokens | null {
    try {
      var raw = localStorage.getItem(this.storageKey);
      return raw ? (JSON.parse(raw) as OAuthTokens) : null;
    } catch (e) {
      return null;
    }
  }

  private writeTokens(res: OAuthTokens) {
    var current = this.readTokens();
    var merged: OAuthTokens = {
      access_token: res.access_token || (current ? current.access_token : ''),
      refresh_token: res.refresh_token || (current ? current.refresh_token : undefined),
      token_type: res.token_type || (current ? current.token_type : undefined),
      expires_in: res.expires_in || (current ? current.expires_in : undefined),
      scope: res.scope || (current ? current.scope : undefined)
    };
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(merged));
    } catch (e) {
      // storage unavailable
    }
  }
}
