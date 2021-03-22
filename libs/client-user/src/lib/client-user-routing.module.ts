import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { AppUserAuthComponent } from './components/auth/auth.component';
import { AppUserDataComponent } from './components/data/data.component';

const routes: Route[] = [
  {
    path: 'auth',
    component: AppUserAuthComponent,
  },
  {
    path: 'data',
    component: AppUserDataComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppClientUserRoutingModule {}
