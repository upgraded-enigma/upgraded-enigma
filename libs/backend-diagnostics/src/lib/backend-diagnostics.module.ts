import { Module, Provider } from '@nestjs/common';

import { BackendDiagnosticsController } from './controller/diagnostics.controller';
import { BackendDiagnosticEventsGateway } from './gateway/diagnostics-events.gateway';
import { BackendDiagnosticsService } from './service/diagnostics.service';

export const diagnosticsModuleProviders: Provider[] = [
  BackendDiagnosticsService,
  BackendDiagnosticEventsGateway,
];

@Module({
  controllers: [BackendDiagnosticsController],
  providers: [...diagnosticsModuleProviders],
})
export class BackendDiagnosticsModule {}
