import { Controller, Get } from '@nestjs/common';
import { Message } from '@upgraded-enigma/backend-interfaces';

import { BackendDiagnosticsService } from '../service/diagnostics.service';

@Controller('app-diag')
export class BackendDiagnosticsController {
  constructor(private readonly diagnosticsService: BackendDiagnosticsService) {}

  @Get('ping')
  public ping(): Message {
    return this.diagnosticsService.ping();
  }

  @Get('static')
  public static() {
    return this.diagnosticsService.static();
  }
}
