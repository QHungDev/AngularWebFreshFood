import {Component, OnInit} from '@angular/core';
import Pusher from 'pusher-js';
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  username = localStorage.getItem('Username');
  message = '';
  messages: any[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    Pusher.logToConsole = true;

    const pusher = new Pusher('61ab5bb3fc79d84ff0e6', {
      cluster: 'ap1'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', (data: any) => {
      this.messages.push(data);
    });
  }

  submit(): void {
    this.http.post('https://localhost:7265/api/messages', {
      username: this.username,
      message: this.message
    }).subscribe(() => this.message = '');
  }
  updateMessage(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
        this.message = target.value || '';
    }
}
}
