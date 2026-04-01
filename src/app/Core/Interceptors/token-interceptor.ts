import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Authservice } from '../Services/AuthService/authservice';
import { catchError, switchMap, throwError } from 'rxjs';
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(Authservice);
  const token = authService.getToken();

  let authReq = req.clone({
    withCredentials: true // 🔥 ALWAYS SEND COOKIE
  });

  if (token) {
    authReq = authReq.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq).pipe(

    catchError((error) => {

      if (error.status === 401) {

        return authService.refreshToken().pipe(

          switchMap((res: any) => {

            authService.setToken(res.accessToken);

            const retryReq = req.clone({
              withCredentials: true,
              setHeaders: {
                Authorization: `Bearer ${res.accessToken}`
              }
            });

            return next(retryReq);
          }),

          catchError((err) => {
            authService.clearToken();
            return throwError(() => err);
          })

        );
      }

      return throwError(() => error);
    })
  );
};