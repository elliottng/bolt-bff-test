export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface AIPersonality {
  name: string;
  description: string;
  systemPrompt: string;
  traits: string[];
  conversationStyle: string;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}