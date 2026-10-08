# Store locator

Angular 15 app that shows our stores on a map and lets customers book a callback.

## Running

```
npm install
ng serve
```

then open http://localhost:4200

Stores are loaded from the stores API (`/api/stores`). Set the base URL in
`src/environments/environment.ts`. If the API is down the page shows an error banner.

## Callback form

The callback form is a reactive form (FormBuilder, see `callback.service.ts`). The phone number
is checked against the UK regex in `validators.ts` and the request is posted to `/api/callbacks`.

## Tests

```
npm test
```

runs karma + jasmine in Chrome.

## Deploying

Build with `ng build --prod` and copy `dist/` to the CDN bucket.
