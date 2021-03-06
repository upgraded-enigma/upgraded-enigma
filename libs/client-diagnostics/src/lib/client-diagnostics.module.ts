import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppClientMaterialModule } from '@app/client-material';
import { AppClientTranslateModule } from '@app/client-translate';

import { AppClientDiagnosticsRoutingModule } from './client-diagnostics-routing.module';
import { AppHomeComponent } from './home/home.component';
import { AppHomePage } from './home/page/home-page.component';
import { AppIndexComponent } from './index/index.component';
import { AppInfoComponent } from './info/info.component';
import { AppInfoPage } from './info/page/info-page.component';

@NgModule({
  imports: [FlexLayoutModule, CommonModule, AppClientMaterialModule, AppClientTranslateModule, AppClientDiagnosticsRoutingModule],
  declarations: [AppIndexComponent, AppHomeComponent, AppHomePage, AppInfoComponent, AppInfoPage],
})
export class AppClientDiagnosticsModule {}
