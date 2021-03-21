import { Injectable } from '@nestjs/common';
import { Message } from '@upgraded-enigma/backend-interfaces';
import { execSync } from 'child_process';
import * as dotenv from 'dotenv';
import * as os from 'os';

@Injectable()
export class BackendDiagnosticsService {
  constructor() {
    dotenv.config();
  }

  private npmVersion() {
    if (Boolean(process.env.ELECTRON)) {
      return 'N/A';
    }
    let version;
    try {
      version = execSync('npm --version').toString().replace(os.EOL, '');
    } catch (e) {
      version = 'N/A';
    }
    return version;
  }

  public ping(): Message {
    return new Message({
      message: 'Diagnostics service is online. REST routes: static. Websocket routes: dynamic.',
    });
  }

  public static() {
    return [
      {
        name: 'Node.js Version',
        value: process.version.replace('v', ''),
      },
      {
        name: 'NPM Version',
        value: this.npmVersion(),
      },
      {
        name: 'OS Type',
        value: os.type(),
      },
      {
        name: 'OS Platform',
        value: os.platform(),
      },
      {
        name: 'OS Architecture',
        value: os.arch(),
      },
      {
        name: 'OS Release',
        value: os.release(),
      },
      {
        name: 'CPU Cores',
        value: os.cpus().length,
      },
    ];
  }

  public dynamic() {
    const divider = 1048576;
    return [
      {
        name: 'Free Memory',
        value: `${Math.round(os.freemem() / divider)}MB`,
      },
      {
        name: 'Uptime',
        value: `${os.uptime()}s`,
      },
    ];
  }
}