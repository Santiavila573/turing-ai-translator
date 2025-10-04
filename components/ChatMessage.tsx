
import React from 'react';
import { ChatMessage as ChatMessageType, Sender } from '../types';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onSpeak }) => {
  const isUser = message.sender === Sender.User;

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-slide-in-up`}>
      <div
        className={`max-w-xl px-4 py-3 rounded-2xl shadow-md message-bubble ${
          isUser
            ? 'bg-cyan-600 text-white rounded-br-none'
            : 'bg-gray-700 text-gray-200 rounded-bl-none'
        }`}
      >
        {isUser ? (
          <p>{message.text}</p>
        ) : (
          <div>
            <p className="font-bold text-lg mb-2">{message.translation}</p>
            <div className="border-t border-gray-600 pt-2 mt-2">
                <p className="text-xs text-gray-400">
                    Detected: {message.detectedLanguage}
                </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
