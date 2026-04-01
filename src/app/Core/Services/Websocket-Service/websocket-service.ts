import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
 
import { BehaviorSubject } from 'rxjs';
import SockJS from 'sockjs-client';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private client!: Client;

  private dashboardSubject = new BehaviorSubject<any>(null);
  dashboard$ = this.dashboardSubject.asObservable();

  connect() {
    if (this.client?.active) return; // prevent multiple connections

    this.client = new Client({
      webSocketFactory: () => new SockJS(''),

      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,

      debug: (msg) => console.log('STOMP:', msg)
    });

    this.client.onConnect = () => {
      console.log('✅ Connected');

      this.client.subscribe('/topic/dashboard', (message: IMessage) => {
        const data = JSON.parse(message.body);
        this.dashboardSubject.next(data);
      });
    };

    this.client.onStompError = (frame) => {
      console.error('❌ STOMP Error', frame);
    };

    this.client.activate();
  }

  disconnect() {
    this.client?.deactivate();
  }
}