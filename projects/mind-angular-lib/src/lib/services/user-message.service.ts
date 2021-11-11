import { Subject } from 'rxjs';

export enum MessageType {
  Insert,
  Update,
  Delete,
  Error,
  Info,
  Warning,
}
export interface InfoMessageData {
  message: string;
  messageType: MessageType;
  element?: any;
  error?: any;
}

// @Injectable({
//   providedIn: 'root',
// })
export class InfoMessageService {
  private messageSubj = new Subject<InfoMessageData>();

  get onMessage() {
    return this.messageSubj.asObservable();
  }

  message(messageData: InfoMessageData) {
    this.messageSubj.next(messageData);
  }
}
