
'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageSquare, X, Send, Loader2, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { chat } from '@/ai/flows/chat-flow';

type Message = {
  role: 'user' | 'model';
  content: string;
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'ready'>('connecting');
  const [peopleCount, setPeopleCount] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setConnectionStatus('connecting');
      setPeopleCount(Math.floor(Math.random() * 15) + 1);
      const timer1 = setTimeout(() => {
        setConnectionStatus('connected');
        const timer2 = setTimeout(() => {
          setConnectionStatus('ready');
          setMessages([
            {
              role: 'model',
              content: 'Olá! Sou a Carol, sua assistente virtual. Como posso te ajudar hoje? 😊',
            },
          ]);
        }, 1000);
        return () => clearTimeout(timer2);
      }, 3000);
      return () => clearTimeout(timer1);
    } else {
        // Reset state when closing
        setMessages([]);
        setInput('');
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
        const historyForApi = [...messages, userMessage].map(msg => ({
            role: msg.role,
            content: [{ text: msg.content }]
        }));
        
      const response = await chat({ history: historyForApi });
      
      const responseLength = response.message.length;
      const delay = responseLength > 100 ? 3000 : 2000;
      
      setTimeout(() => {
          const botMessage: Message = { role: 'model', content: response.message };
          setMessages((prev) => [...prev, botMessage]);
          setIsLoading(false);
      }, delay);

    } catch (error) {
      console.error('Error calling chat flow:', error);
      const errorMessage: Message = {
        role: 'model',
        content: 'Desculpe, estou com um problema para me conectar. Tente novamente em alguns instantes.',
      };
      setTimeout(() => {
        setMessages((prev) => [...prev, errorMessage]);
        setIsLoading(false);
      }, 2000);
    }
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full w-16 h-16 shadow-lg animate-pulse"
        >
          {isOpen ? <X className="h-8 w-8" /> : <MessageSquare className="h-8 w-8" />}
        </Button>
      </div>

      <div
        className={cn(
          'fixed bottom-24 right-4 z-50 w-[calc(100vw-2rem)] max-w-sm h-[600px] transition-transform duration-300 ease-in-out md:w-96',
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
        )}
      >
        <Card className="h-full flex flex-col shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between bg-primary text-primary-foreground">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src="https://i.imgur.com/1xnOhcc.png" alt="Carol" />
                <AvatarFallback>C</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">Carol</CardTitle>
                 <p className="text-xs text-primary-foreground/80">Respondendo a {peopleCount} pessoas</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {connectionStatus !== 'ready' ? (
                 <div className="flex flex-col items-center justify-center h-full">
                    {connectionStatus === 'connecting' && <>
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="mt-2 text-sm text-muted-foreground">Conectando com o servidor...</p>
                    </>}
                    {connectionStatus === 'connected' && <>
                        <CheckCircle className="h-8 w-8 text-green-500" />
                        <p className="mt-2 text-sm text-muted-foreground">Conectado com sucesso! ✓</p>
                    </>}
                </div>
            ) : (
                <>
                    {messages.map((message, index) => (
                    <div
                        key={index}
                        className={cn(
                        'flex items-end gap-2',
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                        )}
                    >
                        {message.role === 'model' && (
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="https://i.imgur.com/1xnOhcc.png" alt="Carol" />
                            <AvatarFallback>C</AvatarFallback>
                        </Avatar>
                        )}
                        <div
                        className={cn(
                            'rounded-lg px-4 py-2 max-w-[80%]',
                            message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        )}
                        >
                        <p className="text-sm">{message.content}</p>
                        </div>
                    </div>
                    ))}
                    {isLoading && (
                    <div className="flex items-end gap-2 justify-start">
                        <Avatar className="h-8 w-8">
                        <AvatarImage src="https://i.imgur.com/1xnOhcc.png" alt="Carol" />
                        <AvatarFallback>C</AvatarFallback>
                        </Avatar>
                        <div className="rounded-lg px-4 py-2 bg-muted flex items-center space-x-1">
                            <span className="h-2 w-2 bg-foreground/50 rounded-full animate-pulse delay-0"></span>
                            <span className="h-2 w-2 bg-foreground/50 rounded-full animate-pulse delay-150"></span>
                            <span className="h-2 w-2 bg-foreground/50 rounded-full animate-pulse delay-300"></span>
                        </div>
                    </div>
                    )}
                    <div ref={messagesEndRef} />
                </>
            )}
          </CardContent>
          <div className="p-4 border-t">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1"
                disabled={isLoading || connectionStatus !== 'ready'}
              />
              <Button type="submit" size="icon" disabled={isLoading || connectionStatus !== 'ready' || !input.trim()}>
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </>
  );
}
