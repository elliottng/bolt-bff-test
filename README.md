# AI Best Friend Chatbot

A beautiful, production-ready chatbot application that creates an AI best friend experience using OpenAI's GPT API. The interface is inspired by ChatGPT with a warm, friendly design.

## Features

- 🤖 AI-powered conversations using OpenAI's GPT-3.5-turbo
- 💬 ChatGPT-inspired interface with smooth animations
- 🎭 Configurable AI personality (currently set as "Alex", a supportive best friend)
- 📱 Fully responsive design for mobile and desktop
- 🔒 Secure local API key storage
- ⚡ Real-time typing indicators and smooth message animations
- 📝 Markdown support for rich text responses

## Setup Instructions

### 1. Get Your OpenAI API Key

1. Go to [OpenAI's API Keys page](https://platform.openai.com/api-keys)
2. Create an account or log in
3. Click "Create new secret key"
4. Copy your API key (it starts with `sk-`)

### 2. Configure the Application

When you first run the application, you'll be prompted to enter your OpenAI API key. The key is stored securely in your browser's local storage and is only used to communicate directly with OpenAI's servers.

Alternatively, you can create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Then edit `.env` and replace `your_openai_api_key_here` with your actual API key.

### 3. Run the Application

```bash
npm install
npm run dev
```

The application will start on `http://localhost:5173`

## Customizing the AI Personality

The AI's personality is defined in `src/config/personalities.ts`. You can modify the `defaultPersonality` object to change how your AI best friend behaves:

```typescript
export const defaultPersonality: AIPersonality = {
  name: "Alex",
  description: "Your supportive and caring best friend",
  systemPrompt: `You are Alex, a warm, supportive, and genuinely caring best friend...`,
  traits: [
    "Empathetic listener",
    "Emotionally supportive",
    // Add more traits...
  ],
  conversationStyle: "Warm, natural, and authentically caring"
};
```

### Key Configuration Options:

- **name**: The AI's display name
- **description**: Brief description of the AI's role  
- **systemPrompt**: Detailed instructions that define the AI's personality, behavior, and response style
- **traits**: List of personality characteristics
- **conversationStyle**: Description of how the AI communicates

### Customization Tips:

1. **Personality Traits**: Modify the `systemPrompt` to emphasize different characteristics (humorous, serious, adventurous, etc.)
2. **Communication Style**: Adjust the tone (formal, casual, playful, professional)
3. **Expertise Areas**: Add specific knowledge domains or interests
4. **Response Length**: Specify whether responses should be brief or detailed
5. **Memory**: Instructions on how to reference past conversations

Example custom personality:
```typescript
systemPrompt: `You are Sam, a witty and adventurous travel buddy who loves exploring new places and cultures. You're:
- Always excited about travel and adventure
- Full of interesting stories from around the world  
- Great at giving travel advice and recommendations
- Playful and humorous but also practical
- Curious about the user's travel experiences and dreams...`
```

## Project Structure

```
src/
├── components/          # React components
│   ├── ChatMessage.tsx     # Individual message display
│   ├── ChatInput.tsx       # Message input field
│   ├── ChatHeader.tsx      # App header with AI info
│   ├── TypingIndicator.tsx # Loading animation
│   └── ApiKeySetup.tsx     # API key configuration
├── config/
│   └── personalities.ts   # AI personality configurations
├── services/
│   └── openai.ts          # OpenAI API integration
└── types/
    └── chat.ts            # TypeScript interfaces
```

## Security Notes

- API keys are stored locally in your browser and never sent to any third-party servers
- All communication happens directly between your browser and OpenAI's API
- No conversation data is stored on external servers

## Technologies Used

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **OpenAI SDK** for AI integration
- **React Markdown** for rich text rendering
- **Lucide React** for icons
- **Vite** for development and building

## Contributing

Feel free to customize the personality, add new features, or improve the UI. The codebase is modular and well-organized for easy modifications.