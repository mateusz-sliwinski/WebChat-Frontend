import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  readonly api_url: string = 'http://localhost:8000/';
  readonly chat_url: string = 'ws://localhost:8000/ws/chat/';

  constructor() { }
}