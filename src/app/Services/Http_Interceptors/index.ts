import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AgendaHttpInterceptorService} from './agenda-http-interceptor.service';

export const httpInterceptProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AgendaHttpInterceptorService, multi: true}
];
