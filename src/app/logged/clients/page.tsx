'use client';

import ClientList from '@/components/clientList';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

export default function ClientsPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user, router]);

  if (loading || !user) return <p>Carregando...</p>;

  return (
    <div className="p-6">
      <ClientList />
    </div>
  );
}
