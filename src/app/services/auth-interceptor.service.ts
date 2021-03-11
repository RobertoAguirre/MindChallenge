import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
//import { Observable } from 'rxjs/Observable';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private router: Router, private authService: AuthService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    let tkn = this.authService.getToken();
    tkn = localStorage.getItem('tkn');
    if(tkn === undefined) this.router.navigate(['login']);



    req = req.clone({
      setHeaders: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
        'Authorization': `${tkn}`,
      },
    });

    return next.handle(req)
     .pipe(
        catchError(error => {
          if (error.status === 401 || error.status === 403) {
            // handle error
            this.router.navigate(['login']);
          }
          return throwError(error);
        })
     );




  }



}
