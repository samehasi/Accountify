import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from './Components/App/app.component';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { BASE_URL } from './Tokens/tokens';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideHttpClient(),
    { provide: BASE_URL, useValue: "https://localhost:7024" },
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    )]
};
