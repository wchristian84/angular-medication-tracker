import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url.includes('https://identitytoolkit.googleapis.com') || req.url.includes('https://angular-medication-tracker-default-rtdb.firebaseio.com/medications/'))
    {
    return this.authService.currentUser.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) return next.handle(req);

        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', (user.token as string))
        });
        return next.handle(modifiedReq);
      })
    );} else {
      return next.handle(req);
    }
  }
}
