import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../auth.service';

@Injectable()
export class AgendaHttpInterceptorService implements HttpInterceptor {


  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = `Bearer ${this.authService.getToken()}`;
    const authReq = req.clone({
      setHeaders: {
        'Authorization': authToken,
        'Content-Type': 'application/json'
      }
    });

    return next.handle(authReq);
  }
}
