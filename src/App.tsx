import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { ChatHeader } from './components/ChatHeader';
import { TypingIndicator } from './components/TypingIndicator';
import { ApiKeySetup } from './components/ApiKeySetup';
import { initializeOpenAI, sendMessage, isOpenAIInitialized } from './services/openai';
import { Message } from './types/chat';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKeySet, setApiKeySet] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check if API key is already set (from localStorage)
  useEffect(() => {
    const savedApiKey = localStorage.getItem('openai_api_key');
    if (savedApiKey) {
      try {
        initializeOpenAI(savedApiKey);
        setApiKeySet(true);
      } catch (error) {
        console.error('Failed to initialize OpenAI:', error);
        localStorage.removeItem('openai_api_key');
      }
    }
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Add welcome message when API key is set
  useEffect(() => {
    if (apiKeySet && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        content: "Hey there! 👋 I'm Alex, your AI best friend. I'm here to chat, listen, and be the supportive friend you can always count on. What's on your mind today?",
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [apiKeySet, messages.length]);

  const handleApiKeySet = (apiKey: string) => {
    try {
      initializeOpenAI(apiKey);
      localStorage.setItem('openai_api_key', apiKey);
      setApiKeySet(true);
      setError(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to set API key');
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!isOpenAIInitialized()) {
      setError('OpenAI not initialized. Please set your API key.');
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      // Convert messages to OpenAI format
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Add the new user message
      conversationHistory.push({
        role: 'user',
        content: content
      });

      const response = await sendMessage(conversationHistory);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  if (!apiKeySet) {
    return <ApiKeySetup onApiKeySet={handleApiKeySet} />;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ChatHeader />
      
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            
            {isLoading && <TypingIndicator />}
            
            {error && (
              <div className="p-4 mx-4 my-2 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        <ChatInput 
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          disabled={!isOpenAIInitialized()}
        />
      </div>
    </div>
  );
}

export default App;