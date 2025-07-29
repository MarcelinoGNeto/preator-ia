'use client';

import { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function ChatPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const hasMessages = messages.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userMessage = input.trim();
    if (!userMessage) return;

    setMessages((prev) => [
      ...prev,
      { role: 'user', content: userMessage },
      { role: 'assistant', content: '' },
    ]);
    setInput('');
    setLoading(true);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: 'Você é um assistente útil.' },
          ...messages,
          { role: 'user', content: userMessage },
        ],
      }),
    });

    const reader = res.body?.getReader();
    const decoder = new TextDecoder();
    let assistantMessage = '';

    while (reader) {
      const { value, done } = await reader.read();
      if (done) break;

      assistantMessage += decoder.decode(value);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: 'assistant', content: assistantMessage };
        return updated;
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {hasMessages ? (
        <>
          {/* Mensagens */}
          <div className="flex-1 w-full max-w-2xl mx-auto px-4 pt-4">
            <ScrollArea className="h-full">
              <div className="space-y-4 text-sm pb-32">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'text-right text-blue-600'
                        : 'text-left text-gray-800'
                    }`}
                  >
                    <span className="block font-semibold">
                      {msg.role === 'user' ? 'Você' : 'IA'}:
                    </span>
                    {msg.content}
                  </div>
                ))}
                {loading && (
                  <div className="text-left text-gray-500 animate-pulse">
                    IA está digitando...
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
            </ScrollArea>
          </div>

          {/* Input + Aviso */}
          <div className="w-full border-t bg-white dark:bg-zinc-900">
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto flex gap-2 p-4">
              <Input
                placeholder="Digite sua mensagem..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
              />
              <Button type="submit" disabled={loading}>
                Enviar
              </Button>
            </form>
            <div className="text-center text-xs text-muted-foreground pb-4">
              O chat pode conter erros, considere verificar as informações importantes.
            </div>
          </div>
        </>
      ) : (
        // Tela inicial: título e input centralizados verticalmente
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-2xl font-semibold text-muted-foreground mb-6">
            Por onde começamos?
          </h1>
          <form onSubmit={handleSubmit} className="w-full max-w-md flex gap-2">
            <Input
              placeholder="Digite sua mensagem..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <Button type="submit" disabled={loading}>
              Enviar
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
