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
    <div className={clsx('flex gap-3 my-2.5', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser && (
        <div className="w-8 h-8 rounded-xl bg-[#C85A32] text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
          <Bot className="w-4 h-4" />
        </div>
      )}
      <div className={clsx('flex flex-col max-w-[88%] sm:max-w-[78%]', isUser ? 'items-end' : 'items-start')}>
        <div
          className={clsx(
            'px-4 py-3 rounded-2xl text-[13.5px] leading-relaxed shadow-xs',
            isUser
              ? 'bg-[#C85A32] text-white rounded-tr-xs font-medium'
              : 'bg-white text-gray-900 border border-[#EAE3D5] rounded-tl-xs'
          )}
        >
          <div className="whitespace-pre-wrap">{message.content}</div>

          {/* Grounded Citation Chips */}
          {!isUser && message.citedSources && message.citedSources.length > 0 && (
            <div className="mt-3 pt-2.5 border-t border-gray-100 flex flex-col gap-1.5">
              <span className="text-[10.5px] font-bold text-gray-500 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Grounded Resume Citations:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {message.citedSources.map((source, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FAF6F0] border border-[#EAE3D5] rounded-md text-[10.5px] text-gray-800 font-semibold"
                    title={source.snippet}
                  >
                    <FileText className="w-3 h-3 text-[#C85A32]" />
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
        <div className="w-8 h-8 rounded-xl bg-gray-200 text-gray-700 flex items-center justify-center shrink-0 shadow-xs mt-0.5">
          <User className="w-4 h-4" />
        </div>
      )}
    </div>
  );
};
