import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChatMessage as ChatMessageType, Sender } from './types';
import { SUPPORTED_LANGUAGES } from './constants';
import { detectLanguageAndTranslateWithOpenAI } from './services/openaiService';
import { ChatMessage } from './components/ChatMessage';
import { LanguageSelector } from './components/LanguageSelector';
import { SendIcon, SpinnerIcon } from './components/icons';


const App: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessageType[]>([
        {
            id: 'initial-welcome',
            sender: Sender.Bot,
            text: 'Welcome!',
            translation: 'Welcome to Turing-Translator!',
            detectedLanguage: 'English',
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('es');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const apiKey = process.env.VITE_OPENAI_API_KEY || '';
    const chatEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        console.log('API Key loaded from env:', apiKey ? 'Present' : 'Missing');
        if (!apiKey.trim()) {
            setError('OpenAI API key not found in .env.local. Please set VITE_OPENAI_API_KEY.');
        }
    }, [apiKey]);
    
    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [inputValue]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);
    


    const handleSendMessage = useCallback(async (text: string) => {
        const messageText = text.trim();
        if (!messageText) return;

        if (!apiKey.trim()) {
            setError('Please set your OpenAI API Key in .env.local.');
            return;
        }

        const newUserMessage: ChatMessageType = {
            id: Date.now().toString(),
            sender: Sender.User,
            text: messageText,
        };
        setMessages(prev => [...prev, newUserMessage]);
        setInputValue('');
        setIsLoading(true);
        setError(null);

        try {
            const { detectedLanguage, translation } = await detectLanguageAndTranslateWithOpenAI(messageText, targetLanguage, apiKey);
            const modifiedTranslation = translation.slice(0, -1);
            const newBotMessage: ChatMessageType = {
                id: (Date.now() + 1).toString(),
                sender: Sender.Bot,
                text: '',
                detectedLanguage,
                translation: modifiedTranslation,
            };
            setMessages(prev => [...prev, newBotMessage]);
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [targetLanguage, apiKey]);
    
    const handleSendMessageRef = useRef(handleSendMessage);
    useEffect(() => {
      handleSendMessageRef.current = handleSendMessage;
    }, [handleSendMessage]);


    const handleTextSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSendMessage(inputValue);
    };


    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white font-sans">
            <header className="bg-gray-800 shadow-lg p-4 flex flex-col sm:flex-row justify-between items-center z-10 gap-4">
                <h1 className="text-xl font-bold text-cyan-400">Turing-Translator</h1>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-300">Translate to:</span>
                    <LanguageSelector
                        languages={SUPPORTED_LANGUAGES}
                        selectedLanguage={targetLanguage}
                        onChange={setTargetLanguage}
                    />
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-6">
                <div className="max-w-4xl mx-auto">
                    {messages.map(msg => (
                        <ChatMessage key={msg.id} message={msg} />
                    ))}
                    {isLoading && (
                        <div className="flex justify-start mb-4 animate-fade-in">
                            <div className="max-w-md px-4 py-3 rounded-lg bg-gray-700 flex items-center space-x-2">
                                <SpinnerIcon className="w-5 h-5 spinner-enhanced text-cyan-400" />
                                <span className="text-gray-300 text-sm">Translating...</span>
                            </div>
                        </div>
                    )}
                    {error && (
                        <div className="flex justify-center mb-4 animate-fade-in">
                             <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg text-sm relative">
                                <strong>Error:</strong> {error}
                                <button onClick={() => setError(null)} className="absolute top-0.5 right-1 text-red-300 hover:text-red-100 p-1" aria-label="Dismiss error">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </button>
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>
            </main>

            <footer className="bg-gray-800 p-4">
                <form onSubmit={handleTextSubmit} className="max-w-4xl mx-auto flex items-center space-x-3">
                    <textarea
                        ref={textareaRef}
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        onKeyDown={e => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage(inputValue);
                            }
                        }}
                        placeholder={!apiKey.trim() ? "Please set your OpenAI API key in .env.local to begin." : "Type a message..."}
                        className="flex-1 p-3 bg-gray-700 rounded-lg border-2 border-transparent focus:border-cyan-500 focus:ring-0 resize-none placeholder-gray-400 max-h-32 overflow-y-auto"
                        rows={1}
                        disabled={isLoading || !apiKey.trim()}
                    />
                    <button
                        type="submit"
                        className="p-3 rounded-full bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-200 btn-hover"
                        aria-label="Send message"
                        disabled={isLoading || !inputValue.trim() || !apiKey.trim()}
                    >
                        <SendIcon className="w-6 h-6 text-white" />
                    </button>
                </form>
            </footer>
            <div
                className="cursor"
                style={{
                    left: mousePosition.x - 10,
                    top: mousePosition.y - 10,
                }}
            />
        </div>
    );
};

export default App;