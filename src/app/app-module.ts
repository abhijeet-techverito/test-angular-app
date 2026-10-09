import { NgModule, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { App } from './app';
import { StoreLocatorComponent } from './store-locator.component';
import { CitySearchComponent } from './city-search.component';
import { StoreCountComponent } from './store-count.component';
import { authInterceptor } from './auth.interceptor';

@NgModule({
  declarations: [
    App,
    StoreLocatorComponent,
    CitySearchComponent,
    StoreCountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
  ],
  bootstrap: [App]
})
export class AppModule { }
