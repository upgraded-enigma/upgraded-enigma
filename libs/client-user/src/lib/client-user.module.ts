import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppClientMaterialModule } from '@upgraded-enigma/client-material';
import { AppClientTranslateModule } from '@upgraded-enigma/client-translate';

import { AppClientUserRoutingModule } from './client-user-routing.module';
import { AppUserAuthComponent } from './components/auth/auth.component';
import { AppUserDataComponent } from './components/data/data.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AppClientMaterialModule,
    AppClientTranslateModule.forRoot(),
    AppClientUserRoutingModule,
  ],
  declarations: [AppUserAuthComponent, AppUserDataComponent],
})
export class AppClientUserModule {}
