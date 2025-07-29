'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  id: number;
  name: string;
  email: string;
};

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/user', {
          method: 'GET',
          credentials: 'include', // necessário para enviar o cookie
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 text-center">
      {user ? (
        <>
          <h1 className="text-2xl font-bold">Olá, {user.name}!</h1>
          <p className="text-gray-600 mt-2">Seja bem-vindo à aplicação.</p>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">Você não está logado</h1>
          <button
            onClick={() => router.push('/login')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Fazer login
          </button>
        </>
      )}
    </div>
  );
}
