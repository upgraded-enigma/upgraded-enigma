import { APP_BASE_HREF, DOCUMENT, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Provider } from '@angular/core';
import { documentFactory, NAVIGATOR, navigatorFactory, WINDOW, windowFactory } from '@app/client-util';

/**
 * Shared core module providers.
 */
export const appClientCoreModuleProviders: Provider[] = [
  {
    provide: LocationStrategy,
    useClass: PathLocationStrategy,
  },
  { provide: APP_BASE_HREF, useValue: '/' },
  { provide: WINDOW, useFactory: windowFactory },
  { provide: DOCUMENT, useFactory: documentFactory },
  { provide: NAVIGATOR, useFactory: navigatorFactory },
];
