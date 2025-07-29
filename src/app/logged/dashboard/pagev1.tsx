'use client';

import ClientList from '@/components/clientList';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user, router]);

  if (loading || !user) return <p>Carregando...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Bem-vindo, {user.name}</h1>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={logout}
        >
          Sair
        </button>
      </div>
      <p>Você está autenticado com o e-mail: {user.email}</p>
      <Link href="/clients" className="text-blue-500 hover:underline mt-4 bg-red-500 text-white px-4 py-2 rounded">
        Ir para Clientes
      </Link>
    </div>
  );
}
