import { ApiEnvironment, defaultWsPort } from '@upgraded-enigma/backend-interfaces';

/**
 * Production environment variables.
 */
export const environment: ApiEnvironment = {
  production: true,
  firebase: true,
  appName: 'Upgraded Enigma API',
  wsPort: defaultWsPort,
};
