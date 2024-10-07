import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserModule } from '@angular/platform-browser';
import { bootstrapApplication } from '@angular/platform-browser';
import { HeaderComponent } from "./app/components/header/header.component"

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),  // Это должно правильно настроить HttpClient
    provideRouter(routes),
    importProvidersFrom(BrowserModule),
    importProvidersFrom(ReactiveFormsModule),
    provideAnimationsAsync(),
    HeaderComponent,
    provideAnimationsAsync(),
    provideAnimationsAsync('noop'),
    provideAnimationsAsync('noop'),
  ]
}).catch(err => console.error(err));
