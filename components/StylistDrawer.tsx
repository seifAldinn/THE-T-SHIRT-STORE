
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, User, Bot, Loader2 } from 'lucide-react';
import { getStylingAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';

interface StylistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const StylistDrawer: React.FC<StylistDrawerProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I'm your T-Shirt Store Personal Stylist. Looking for styling tips or trying to decide which of our classics fits your look? Just ask!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    const advice = await getStylingAdvice(userMessage, messages);
    
    setMessages(prev => [...prev, { role: 'model', text: advice }]);
    setIsLoading(false);
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div 
        className={`fixed left-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-black z-[101] transform transition-transform duration-500 ease-in-out border-r dark:border-white/10 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b dark:border-white/10 flex justify-between items-center bg-indigo-50 dark:bg-indigo-900/10">
            <div className="flex items-center space-x-2 text-black dark:text-white">
              <div className="w-8 h-8 bg-indigo-600 dark:bg-indigo-500 rounded-full flex items-center justify-center text-white">
                <Sparkles size={16} />
              </div>
              <div>
                <h2 className="text-sm font-bold tracking-widest uppercase">Personal Stylist</h2>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold tracking-tighter">Powered by Gemini</span>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors text-black dark:text-white">
              <X size={24} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50 dark:bg-black/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                <div className={`flex max-w-[85%] space-x-3 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-black dark:bg-white text-white dark:text-black' : 'bg-white dark:bg-neutral-800 border dark:border-white/10 text-indigo-600 dark:text-indigo-400 shadow-sm'}`}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-black dark:bg-neutral-800 text-white rounded-tr-none' : 'bg-white dark:bg-neutral-900 text-gray-800 dark:text-gray-200 rounded-tl-none shadow-sm border dark:border-white/5'}`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-pulse">
                <div className="flex space-x-3">
                  <div className="w-8 h-8 rounded-full bg-white dark:bg-neutral-800 border dark:border-white/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <Bot size={16} />
                  </div>
                  <div className="p-4 bg-white dark:bg-neutral-900 rounded-2xl rounded-tl-none shadow-sm flex items-center border dark:border-white/5">
                    <Loader2 className="animate-spin mr-2 dark:text-indigo-400" size={16} />
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium italic">Stylist is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t dark:border-white/10 bg-white dark:bg-black">
            <form onSubmit={handleSend} className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about outfit ideas or sizes..."
                className="w-full bg-gray-100 dark:bg-neutral-900 dark:text-white rounded-full px-6 py-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-500 transition-all border-none"
              />
              <button 
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-indigo-600 dark:bg-indigo-500 text-white disabled:bg-gray-300 dark:disabled:bg-neutral-800 disabled:cursor-not-allowed hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default StylistDrawer;
