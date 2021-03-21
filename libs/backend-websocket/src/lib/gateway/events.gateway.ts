import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { BackendDiagnosticsService } from '@upgraded-enigma/backend-diagnostics';
import { defaultWsPort } from '@upgraded-enigma/backend-interfaces';
import { Observable, timer } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import { Server } from 'ws';

@WebSocketGateway(defaultWsPort, {
  path: '/api/events',
  transports: ['websocket'],
})
export class BackendEventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  /**
   * Platform-specific server instance.
   */
  @WebSocketServer()
  protected server?: Server;

  constructor(private readonly diagnosticsService: BackendDiagnosticsService) {}

  private sendClientChangeEvent(): void {
    if (typeof this.server !== 'undefined') {
      const clients = this.server.clients.values();
      for (const client of clients) {
        client.send(JSON.stringify({ event: 'users', data: this.server.clients.size }));
      }
    }
  }

  public async handleConnection() {
    this.sendClientChangeEvent();
  }

  public async handleDisconnect() {
    this.sendClientChangeEvent();
  }

  @SubscribeMessage('events')
  public handleEvents(): Observable<WsResponse<number>> {
    const timeout = 1000;
    const eventsCount = 4;
    return timer(0, timeout).pipe(
      takeWhile(item => item < eventsCount),
      map(item => {
        const wsResponse: WsResponse<number> = { event: 'timer', data: item };
        return wsResponse;
      }),
    );
  }

  @SubscribeMessage('diag-dynamic')
  public handleDynamicDiagnosticEvents() {
    if (typeof this.server !== 'undefined') {
      const clients = this.server.clients.values();
      for (const client of clients) {
        const event: WsResponse<{ name: string; value: string }[]> = {
          event: 'dynamic',
          data: this.diagnosticsService.dynamic(),
        };
        client.send(JSON.stringify(event));
      }
    }
  }

  @SubscribeMessage('message')
  public handleMessageEvents(data: { sender: string; text: string }) {
    if (typeof this.server !== 'undefined') {
      const clients = this.server.clients.values();
      for (const client of clients) {
        const event: WsResponse<{ sender: string; text: string }> = {
          event: 'message',
          data,
        };
        client.send(JSON.stringify(event));
      }
    }
  }
}
