import { IWebClientAppEnvironment } from '@app/client-util';
import { Capacitor } from '@capacitor/core';

const platform: string = Capacitor.getPlatform();

/**
 * Production environment variables.
 */
export const environment: IWebClientAppEnvironment = {
  production: true,
  platform,
  appName: 'Upgraded Enigma Elements',
  description: 'Nx Ng Starter Elements: wigdets based on Angular Elements',
  api:
    platform !== 'web'
      ? 'https://upgraded-enigma.web.app/api'
      : window.location.origin.includes('localhost')
      ? 'http://localhost:8080/api'
      : `${window.location.origin}/api`,
  envoyUrl: 'http://localhost:8082', // TODO
  sentryEnv: 'production',
};
