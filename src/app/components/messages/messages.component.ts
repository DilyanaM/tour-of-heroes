import { Component } from '@angular/core';

import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.less']
})
export class MessagesComponent {

  constructor(private messageService: MessageService) { }

  get messages() {
    return this.messageService.messages;
  }

  clearMessages() {
    this.messageService.clear();
  }

}
