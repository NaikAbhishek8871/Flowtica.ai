import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './app/Core/Interceptors/token-interceptor';
import { routes } from './app/app.routes';

bootstrapApplication(App,
  
  {
  
     providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([tokenInterceptor])),

    

    ...(appConfig.providers || [])
  ]
}).catch(err => console.error(err));
