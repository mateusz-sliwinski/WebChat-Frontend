import { Injectable } from '@angular/core';
import ReconnectingWebSocket from 'reconnecting-websocket';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {

  callbacks: any = {};
  private chatSocket!: ReconnectingWebSocket;
  messages: any;
  public isConnected: boolean = false;
  user: any;

  constructor() {}

  connectWebSocket(roomName: string, username: string) {
    const url = 'ws://localhost:8000/ws/chat/' + roomName + '/';

    this.chatSocket = new ReconnectingWebSocket(url);
    this.user = username;

    this.chatSocket.addEventListener('open', () => {
      this.isConnected = true;
      this.fetchMessages(username, roomName);
    });

    this.chatSocket.addEventListener('message', (event: any) => {
      this.messages = JSON.parse(event.data);
      if (this.messages['command'] === 'messages') {
        for (let i = 0; i < this.messages['messages'].length; i++) {
          this.createMessage(this.messages['messages'][i]);
        }
      } else if (this.messages['command'] === 'new_message') {
        this.createMessage(this.messages['message']);
      }
    });
  }

  socketNewMessage(data: any) {
    const parsedData = JSON.parse(data);
    const command = parsedData.command;
    if (Object.keys(this.callbacks).length === 0) {
      return;
    }
    if (command === 'messages') {
      this.callbacks[command](parsedData.messages);
    }
    if (command === 'new_messages') {
      this.callbacks[command](parsedData.message);
    }
  }

  fetchMessages(username: string, chatId: string) {
    this.sendMessage({
      command: 'fetch_messages',
      usename: username,
      chatId: chatId,
    });
  }

  newChatMessages(content: string, username: string, chatId: string) {
    this.sendMessage({
      command: 'new_message',
      username: username,
      chatId: chatId,
      content: content,
    });
  }

  addCallbacks(messagesCallback: any, newMessageCallback: any) {
    this.callbacks['messages'] = messagesCallback;
    this.callbacks['new_message'] = newMessageCallback;
  }

  sendMessage(data: any) {
    try {
      this.chatSocket.send(JSON.stringify(data));
    } catch (err) {
      console.log(err);
    }
  }

  public subscribeToMessages() {
    return this.chatSocket;
  }

  createMessage(data: any) {
    const author = data['participant'];
    const msgListTag = document.createElement('li');
    msgListTag.className = 'clearfix';
    const divCardBody = document.createElement('div');

    const imgTag = document.createElement('img');

    const pMessage = document.createElement('p');

    if (author === this.user) {
      imgTag.src = 'https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/external-user-interface-kiranshastry-lineal-kiranshastry.png';
      pMessage.className = 'message other-message float-right';
      pMessage.textContent = data.content;
      imgTag.className = 'float-right';
      divCardBody.appendChild(pMessage);
      divCardBody.className = 'message-data text-right';
      msgListTag.appendChild(imgTag);
      msgListTag.appendChild(divCardBody);
    } else {
      imgTag.src = 'https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/external-user-interface-kiranshastry-lineal-kiranshastry.png';
      pMessage.className = 'message other-message';
      pMessage.textContent = data.content;
      divCardBody.className = 'message-data';
      divCardBody.appendChild(imgTag);
      divCardBody.appendChild(pMessage);
      msgListTag.appendChild(divCardBody);
    }

    const chatLog = document.querySelector('#chat-log');
    if (chatLog) {
      chatLog.appendChild(msgListTag);
    }
  }

  public closeWebSocket() {
    this.chatSocket.close();
  }

  public mess() {
    return this.messages;
  }
}
