import React from 'react';
import { clsx } from 'clsx';
import { Bot, User, FileText, CheckCircle2 } from 'lucide-react';

export interface CitedSource {
  sectionTitle: string;
  snippet: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  citedSources?: CitedSource[];
  timestamp?: string;
}

interface ChatBubbleProps {
  message: ChatMessage;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={clsx('flex gap-3 my-3', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-[#4F46E5] text-white flex items-center justify-center shrink-0 shadow-xs">
          <Bot className="w-4 h-4" />
        </div>
      )}
      <div className={clsx('flex flex-col max-w-[82%]', isUser ? 'items-end' : 'items-start')}>
        <div
          className={clsx(
            'px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-xs',
            isUser
              ? 'bg-[#4F46E5] text-white rounded-tr-xs'
              : 'bg-white text-gray-900 border border-gray-200/90 rounded-tl-xs'
          )}
        >
          <div className="whitespace-pre-wrap">{message.content}</div>

          {/* Grounded Citation Chips */}
          {!isUser && message.citedSources && message.citedSources.length > 0 && (
            <div className="mt-3 pt-2.5 border-t border-gray-100 flex flex-col gap-1.5">
              <span className="text-[11px] font-semibold text-gray-500 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Grounded Resume Citations:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {message.citedSources.map((source, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-2 py-1 bg-indigo-50/80 border border-indigo-100 rounded-md text-[11px] text-indigo-700 font-medium"
                    title={source.snippet}
                  >
                    <FileText className="w-3 h-3 text-indigo-500" />
                    <span>{source.sectionTitle}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {message.timestamp && (
          <span className="text-[10px] text-gray-400 mt-1 px-1">{message.timestamp}</span>
        )}
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center shrink-0">
          <User className="w-4 h-4" />
        </div>
      )}
    </div>
  );
};
