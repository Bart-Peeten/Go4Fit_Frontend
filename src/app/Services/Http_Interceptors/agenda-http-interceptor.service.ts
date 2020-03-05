import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AgendaHttpInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = 'My Auth Token';
    const authReq = req.clone({
      setHeaders: {Authorization: authToken}
    });

    return next.handle(req);
  }
}
