import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  Message,
  UserLoginCredentials,
  UserLogoutCredentials,
} from '@upgraded-enigma/backend-interfaces';

import { BackendAuthService } from '../service/auth.service';

@Controller()
export class BackendAuthController {
  constructor(private readonly authService: BackendAuthService) {}

  @Get('auth')
  public ping(): Message {
    return this.authService.ping();
  }

  @Post('auth/login')
  public login(@Body() credentials: UserLoginCredentials) {
    return this.authService.login(credentials);
  }

  @Post('auth/logout')
  public logout(@Body() credentials: UserLogoutCredentials): Message {
    return this.authService.logout(credentials);
  }
}
