import OpenAI from 'openai';
import { defaultPersonality } from '../config/personalities';

let openaiClient: OpenAI | null = null;

export const initializeOpenAI = (apiKey: string) => {
  if (!apiKey || apiKey.trim() === '') {
    throw new Error('OpenAI API key is required');
  }
  
  openaiClient = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
  });
};

export const sendMessage = async (messages: Array<{role: 'user' | 'assistant' | 'system', content: string}>) => {
  if (!openaiClient) {
    throw new Error('OpenAI client not initialized. Please set your API key.');
  }

  try {
    const systemMessage = {
      role: 'system' as const,
      content: defaultPersonality.systemPrompt
    };

    const completion = await openaiClient.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [systemMessage, ...messages],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return completion.choices[0]?.message?.content || 'Sorry, I couldn\'t generate a response.';
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to get response from AI. Please check your API key and try again.');
  }
};

export const isOpenAIInitialized = () => {
  return openaiClient !== null;
};