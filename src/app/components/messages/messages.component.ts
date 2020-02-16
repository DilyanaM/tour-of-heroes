import { Component, OnInit } from '@angular/core';

import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.less']
})
export class MessagesComponent implements OnInit {

  messagesLength: number;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messagesLength = this.messageService.messages.length;
  }

  get messages() {
    return this.messageService.messages;
  }

  clearMessages() {
    this.messageService.clear();
  }

}
