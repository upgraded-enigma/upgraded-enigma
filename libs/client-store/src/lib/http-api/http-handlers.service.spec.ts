import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { AppClientTranslateModule } from '@app/client-translate';
import { AppLocalStorageMock, getTestBedConfig, newTestBedMetadata } from '@app/client-unit-testing';
import { HTTP_STATUS } from '@app/client-util';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AppHttpProgressStoreModule } from '../http-progress/http-progress.module';
import { AppToasterService, toasterServiceProvider } from '../http-progress/services/toaster/toaster.service';
import { AppHttpHandlersService } from './http-handlers.service';

describe('AppHttpHandlersService', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [AppClientTranslateModule.forRoot(), AppHttpProgressStoreModule.forRoot()],
    providers: [toasterServiceProvider],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let service: AppHttpHandlersService;
  let httpTestingController: HttpTestingController;
  let localStorage: AppLocalStorageMock;
  let toaster: AppToasterService;
  let store: Store;
  let spy: {
    store: {
      dispatch: jest.SpyInstance;
    };
    service: {
      checkErrorStatusAndRedirect: jest.SpyInstance;
    };
  };

  beforeEach(
    waitForAsync(() => {
      localStorage = window.localStorage;
      jest.spyOn(localStorage, 'setItem');

      void TestBed.configureTestingModule(testBedConfig)
        .compileComponents()
        .then(() => {
          service = TestBed.inject(AppHttpHandlersService);
          toaster = TestBed.inject(AppToasterService);
          httpTestingController = TestBed.inject(HttpTestingController);
          store = TestBed.inject(Store);
          spy = {
            store: {
              dispatch: jest.spyOn(store, 'dispatch'),
            },
            service: {
              checkErrorStatusAndRedirect: jest.spyOn(service, 'checkErrorStatusAndRedirect'),
            },
          };
        });
    }),
  );

  afterEach(() => {
    httpTestingController
      .match((req: HttpRequest<unknown>): boolean => true)
      .forEach((req: TestRequest) => (!req.cancelled ? req.flush({}) : null));
    httpTestingController.verify();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(toaster).toBeDefined();
  });

  it('should have variables and methods defined', () => {
    expect(service.defaultHttpTimeout).toEqual(expect.any(Number));
    expect(service.getEndpoint).toEqual(expect.any(Function));
    expect(service.checkErrorStatusAndRedirect).toEqual(expect.any(Function));
    expect(service.handleError).toEqual(expect.any(Function));
    expect(service.pipeHttpResponse).toEqual(expect.any(Function));
    expect(service.tapError).toEqual(expect.any(Function));
  });

  it('checkErrorStatusAndRedirect should reset user if error status is 401', () => {
    service.checkErrorStatusAndRedirect(HTTP_STATUS.BAD_REQUEST);
    expect(spy.store.dispatch).not.toHaveBeenCalled();
    service.checkErrorStatusAndRedirect(HTTP_STATUS.UNAUTHORIZED);
    expect(spy.store.dispatch).toHaveBeenCalled();
  });

  describe('handleError', () => {
    it(
      'should handle errors properly #1',
      waitForAsync(() => {
        const errRes = new HttpErrorResponse({
          status: 400,
          statusText: 'error status text',
        });
        void service
          .handleError(errRes)
          .pipe(
            catchError((error: Error) => {
              expect(error).toEqual(new Error(service.getErrorMessage(errRes)));
              return of(null);
            }),
          )
          .subscribe();
      }),
    );

    it(
      'should handle errors properly #2',
      waitForAsync(() => {
        const errRes = new HttpErrorResponse({});
        void service
          .handleError(errRes)
          .pipe(
            catchError((error: Error) => {
              expect(error).toEqual(new Error(service.getErrorMessage(errRes)));
              return of(null);
            }),
          )
          .subscribe();
      }),
    );
  });

  it('pipeHttpResponse should work correctly', () => {
    const observable = of({ data: {} });
    let pipedRequest = service.pipeHttpResponse(observable);
    expect(pipedRequest).toEqual(expect.any(Observable));
    pipedRequest = service.pipeHttpResponse(observable);
  });
});
