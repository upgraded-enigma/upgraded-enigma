import { NgModule } from '@angular/core';

import { AppChatbotModule } from './chatbot/chatbot.module';
import { AppDiagnosticsModule } from './diagnostics/diagnostics.module';
import { AppHttpApiModule } from './http-api/http-api.module';
import { AppHttpProgressModule } from './http-progress/http-progress.module';
import { AppSidebarModule } from './sidebar/sidebar.module';
import { AppThemeModule } from './theme/theme.module';
import { AppUserModule } from './user/user.module';
import { AppWebsocketModule } from './websocket/websocket.module';

@NgModule({
  imports: [
    AppHttpApiModule,
    AppHttpProgressModule.forRoot(),
    AppUserModule,
    AppSidebarModule,
    AppWebsocketModule,
    AppChatbotModule,
    AppThemeModule,
    AppDiagnosticsModule,
  ],
  exports: [
    AppHttpApiModule,
    AppHttpProgressModule,
    AppUserModule,
    AppSidebarModule,
    AppWebsocketModule,
    AppChatbotModule,
    AppThemeModule,
    AppDiagnosticsModule,
  ],
})
export class AppClientStoreModule {}
