// Chat-related types

export interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
  messageType: 'text' | 'image' | 'location';
  imageUrl?: string;
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
  quickReplies?: string[];
}
