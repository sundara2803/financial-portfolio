import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const modifiedRequest = request.clone({
      headers: request.headers.set('Content-Type', 'application/json')
    });

    return next.handle(modifiedRequest).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          const standardizedResponse = {
            status: 'success',
            message: 'Request was successful',
            data: event.body || null,
            error: null
          };

          return event.clone({ body: standardizedResponse });
        }

        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        const standardizedErrorResponse = {
          status: 'error',
          message: error.message || 'An error occurred',
          data: null,
          error: {
            code: error.status,
            description: error.error?.message || 'Something went wrong'
          }
        };
        return throwError(() => standardizedErrorResponse);
      })
    );
  }
}
