import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { AppUserState } from '../user.store';

@Injectable({
  providedIn: 'root',
})
export class AppAuthenticatedGuard implements CanActivate {
  constructor(private readonly store: Store, private readonly router: Router) {}

  public canActivate(): Observable<boolean | UrlTree> {
    return this.store.selectOnce(AppUserState.model).pipe(
      first(),
      map(user => {
        if (!Boolean(user.token) && Boolean(user.email)) {
          // eslint-disable-next-line no-alert -- needed here
          window.alert('to access data you need to log in first');
          return this.router.createUrlTree(['login']);
        }
        return Boolean(user.token) ? true : false;
      }),
    );
  }
}
