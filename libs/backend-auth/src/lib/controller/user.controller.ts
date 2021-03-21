import { Body, Controller, Get, Post } from '@nestjs/common';
import { IUser } from '@upgraded-enigma/backend-interfaces';

import { BackendUserService } from '../service/user.service';

@Controller()
export class BackendUserController {
  constructor(private readonly userService: BackendUserService) {}

  @Get('user')
  public user() {
    return this.userService.user();
  }

  @Post('user/config')
  public configureUser(@Body() config: Partial<IUser>) {
    return this.userService.config(config);
  }
}
