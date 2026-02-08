import React from 'react';
import { ChatInterface } from '@/components/features/chat-interface';
import { Bot } from 'lucide-react';
import Link from 'next/link';

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-600 rounded-xl text-white">
              <Bot size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">AI Task Assistant</h1>
              <p className="text-sm text-zinc-500">Manage your todos with natural language</p>
            </div>
          </div>
          <Link 
            href="/"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            Back to List
          </Link>
        </header>

        <main>
          <ChatInterface />
        </main>

        <footer className="text-center text-xs text-zinc-400 py-4">
          <p>Phase III – Todo AI Chatbot MVP</p>
          <p>Powered by Google Gemini</p>
        </footer>
      </div>
    </div>
  );
}
