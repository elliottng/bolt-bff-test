import React from 'react';
import { Bot, Settings } from 'lucide-react';

interface ChatHeaderProps {
  onSettingsClick?: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ onSettingsClick }) => {
  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">
            <Bot size={20} />
          </div>
          <div>
            <h1 className="font-semibold text-gray-900">Alex</h1>
            <p className="text-sm text-gray-500">Your AI Best Friend</p>
          </div>
        </div>
        
        {onSettingsClick && (
          <button
            onClick={onSettingsClick}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <Settings size={20} />
          </button>
        )}
      </div>
    </div>
  );
};