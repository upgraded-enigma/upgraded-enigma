import { upgradedenigma } from '@app/proto';
import { Controller, Get, Inject, OnModuleInit, Param } from '@nestjs/common';
import { ClientGrpc, GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { from, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { toArray } from 'rxjs/operators';

import { GRPC_CLIENT_PACKAGE } from '../grpc-client.options';

export interface IEntityService {
  findOne(data: upgradedenigma.IEntityById): Observable<upgradedenigma.IEntity>;
  findMany(upstream: Observable<upgradedenigma.IEntityById>): Observable<upgradedenigma.IEntity>;
}

@Controller('grpc')
export class BackendGrpcController implements OnModuleInit {
  private readonly items: upgradedenigma.IEntity[] = [
    {
      id: 'id1',
      num1: 1,
      num2: 3,
      boolean1: true,
      float1: 0.5,
      any1: null,
      subEntities: [],
    },
    {
      id: 'id2',
      num1: 2,
      num2: 4,
      boolean1: false,
      float1: 1.5,
      any1: null,
      subEntities: [{ id: 'subid1' }],
    },
  ];

  private sampleService?: IEntityService;

  constructor(@Inject(GRPC_CLIENT_PACKAGE) private readonly client: ClientGrpc) {}

  public onModuleInit() {
    this.sampleService = this.client.getService<IEntityService>('EntityService');
  }

  @Get()
  public getMany(): Observable<upgradedenigma.IEntity[]> {
    const idsSubject = new ReplaySubject<upgradedenigma.IEntityById>();
    idsSubject.next({ id: 'id1' });
    idsSubject.next({ id: 'id2' });
    idsSubject.complete();

    return typeof this.sampleService !== 'undefined' ? this.sampleService.findMany(idsSubject.asObservable()).pipe(toArray()) : of([]);
  }

  @Get(':id')
  public getById(@Param('id') id: string): Observable<upgradedenigma.IEntity> {
    return typeof this.sampleService !== 'undefined'
      ? from(this.sampleService.findOne({ id }))
      : of(
          upgradedenigma.Entity.toObject(new upgradedenigma.Entity(), {
            defaults: true,
          }),
        );
  }

  @GrpcMethod('EntityService', 'FindOne')
  public findOne(data: upgradedenigma.IEntityById, metadata: Record<string, unknown>): upgradedenigma.IEntity | undefined {
    return this.items.find(({ id }) => id === data.id);
  }

  @GrpcStreamMethod('EntityService', 'FindMany')
  public findMany(data$: Observable<upgradedenigma.IEntityById>, metadata: Record<string, unknown>): Observable<upgradedenigma.IEntity> {
    const entitySubject = new Subject<upgradedenigma.IEntity>();

    const onNext = (entityById: upgradedenigma.IEntityById) => {
      const item = this.items.find(({ id }) => id === entityById.id);
      if (typeof item !== 'undefined') {
        entitySubject.next(item);
      }
    };
    const onComplete = () => {
      entitySubject.complete();
    };
    void data$.subscribe(onNext, null, onComplete);

    return entitySubject.asObservable();
  }
}
