import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Authservice } from '../Services/AuthService/authservice';
import { map, catchError, of } from 'rxjs';

export const authGuard: CanActivateFn = () => {

  const router = inject(Router);
  const auth = inject(Authservice);

  // ✅ if access token exists → allow
  if (auth.getToken()) {
    return true;
  }

  // 🔁 try refresh using cookie
  return auth.refreshToken().pipe(
    map((res: any) => {
      auth.setToken(res.accessToken);
      return true;
    }),
    catchError(() => {
      auth.clearToken();
      router.navigate(['/login']);
      return of(false);
    })
  );
};