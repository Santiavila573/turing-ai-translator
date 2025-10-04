
export enum Sender {
  User = 'user',
  Bot = 'bot',
}

export interface ChatMessage {
  id: string;
  sender: Sender;
  text: string;
  detectedLanguage?: string;
  translation?: string;
}

export interface Language {
    code: string;
    name: string;
}
