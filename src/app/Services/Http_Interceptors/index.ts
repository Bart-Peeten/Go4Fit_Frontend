import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AgendaHttpInterceptorService} from './agenda-http-interceptor.service';
import {LoadingHttpInterceptorService} from './loading-http-interceptor.service';

export const httpInterceptProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AgendaHttpInterceptorService, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: LoadingHttpInterceptorService, multi: true}
];
