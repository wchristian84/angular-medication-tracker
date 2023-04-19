import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take } from "rxjs/operators";
import { AuthService } from "./auth.service";


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url.includes('angular-med-tracker-backend.herokuapp.com'))
    {
    return this.authService.currentUser.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) return next.handle(req);
        console.log("interceptor user token: ", user.token);
        const modifiedReq = req.clone({
          headers: new HttpHeaders().set('Authorization', (`Bearer ${user.token as string}`))
        });
        return next.handle(modifiedReq);
      })
    );} else {
      return next.handle(req);
    }
  }
}
