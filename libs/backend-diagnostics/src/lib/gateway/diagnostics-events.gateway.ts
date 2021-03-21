import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { defaultWsPort } from '@upgraded-enigma/backend-interfaces';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Server } from 'ws';

import { BackendDiagnosticsService } from '../service/diagnostics.service';

@WebSocketGateway(defaultWsPort, {
  path: '/api/app-diag/dynamic',
  transports: ['websocket'],
})
export class BackendDiagnosticEventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly sendData = new BehaviorSubject<boolean>(false);

  private readonly sendData$ = this.sendData.asObservable().pipe(
    tap(send => {
      if (send && typeof this.server !== 'undefined') {
        const clients = this.server.clients.values();
        for (const client of clients) {
          const dynamicDiagnosticData: WsResponse<{ name: string; value: string }[]> = {
            event: 'dynamic',
            data: this.diagnosticsService.dynamic(),
          };
          client.send(JSON.stringify(dynamicDiagnosticData));
        }
      }
    }),
  );

  constructor(private readonly diagnosticsService: BackendDiagnosticsService) {
    void this.sendData$.subscribe();
  }

  /**
   * Platform-specific server instance.
   */
  @WebSocketServer()
  protected server?: Server;

  /**
   * Currently connected users count.
   */
  private readonly users$ = new BehaviorSubject<number>(0);

  private sendClientChangeEvent(data: number): void {
    if (typeof this.server !== 'undefined') {
      const clients = this.server.clients.values();
      for (const client of clients) {
        client.send(JSON.stringify({ event: 'users', data }));
      }
      const sendData = this.server.clients.size > 0;
      this.sendData.next(sendData);
    }
  }

  public async handleConnection() {
    // client disconnected
    const usersCount = this.users$.value + 1;
    this.users$.next(usersCount);

    // notify connected clients of current users
    this.sendClientChangeEvent(usersCount);
  }

  public async handleDisconnect() {
    // client disconnected
    const usersCount = this.users$.value - 1;
    this.users$.next(usersCount);

    // notify connected clients of current users
    this.sendClientChangeEvent(usersCount);
  }
}
