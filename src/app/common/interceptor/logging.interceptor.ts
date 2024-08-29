import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../interface/user.model';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<User>, next: HttpHandler): Observable<HttpEvent<User>> {
    const clonedRequest = req.clone({
      headers: req.headers.set('Custom-Header', 'MyHeaderValue')
    });

    return next.handle(clonedRequest).pipe(
      tap(event => {
        if (event.type === HttpEventType.Response) {
          console.log('Intercepted Response:', event);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An error occurred; please try again later.';
        if (error.status === 500) {
          errorMessage = 'A server error occurred. Please contact support if the issue persists.';
        } else if (error.status === 403) {
          errorMessage = 'Access denied. You do not have permission to perform this action.';
        } else if (error.status === 400) {
          errorMessage = 'Bad request. Please check the data you have submitted.';
        }
        window.alert(errorMessage);
        return throwError(() => error);
      })
    );
  }
}
