import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { ApiEnvironment } from '@upgraded-enigma/backend-interfaces';

import { BackendGrpcController } from './controller/grpc.controller';
import { backendGrpcClientOptions, NXNGSTARTER_PACKAGE } from './grpc-client.options';

@Module({
  controllers: [BackendGrpcController],
})
export class BackendGrpcModule {
  public static forRoot(env: ApiEnvironment): DynamicModule {
    const grpcClientOptions = backendGrpcClientOptions(env);

    return {
      module: BackendGrpcModule,
      imports: [
        ClientsModule.register([
          {
            name: NXNGSTARTER_PACKAGE,
            ...grpcClientOptions,
          },
        ]),
      ],
    };
  }
}
