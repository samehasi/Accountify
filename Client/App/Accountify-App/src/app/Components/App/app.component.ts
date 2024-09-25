import { Component, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Client, WeatherForecast } from './api-client';
import { BASE_URL } from '../../Tokens/tokens';
import { Observable, map, of, tap } from 'rxjs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
// Factory function for loading translation files
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@Component({
  selector: 'app-root', 
  standalone: true,
  imports: [CommonModule,
     RouterOutlet,
     TranslateModule,
     MatSlideToggleModule,
     MatButtonModule,
     MatButtonToggleModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
serverResponse:Observable<string> | undefined;

protected getWeather() {
    this.serverResponse= this.weatherForecastClient.getWeatherForecast().pipe(
map (x => {
  const str = JSON.stringify(x);
  console.log(x);
  return str;
}
)
      );
}
protected switchLanguage(language: string) {
  console.log("switching language...")
  this.translate.use(language);  // Use the selected language

  // Adjust direction for RTL (Hebrew or Arabic) or LTR (English)
  if (language === 'he' || language === 'ar') {
    // Set direction to right-to-left for Hebrew and Arabic
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', language);
  } else {
    // Set direction to left-to-right for English (or any LTR language)
    document.documentElement.setAttribute('dir', 'ltr');
    document.documentElement.setAttribute('lang', language);
  }
}
  constructor(public translate: TranslateService,private weatherForecastClient: Client) {
    translate.addLangs(['en', 'he' , 'ar']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|he|ar/) ? browserLang : 'en');
  }
  title = 'Accountify-App';
}
