'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FileSearch, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AnalyzeDocumentPage() {
  const { id } = useParams();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [docType, setDocType] = useState('');
  const [actions, setActions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };

  const handleCheckboxChange = (value: string) => {
    setActions(prev =>
      prev.includes(value) ? prev.filter(a => a !== value) : [...prev, value]
    );
  };

  const handleAnalyze = async () => {
    if (!file || !docType || actions.length === 0) {
      alert('Preencha todos os campos');
      return;
    }
  
    setLoading(true);
    setResult(null);
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('docType', docType);
    formData.append('actions', JSON.stringify(actions));
  
    try {
      const res = await fetch('/api/openai', {
        method: 'POST',
        body: formData,
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.error || 'Erro ao analisar documento');
      }
  
      setResult(data.result);
    } catch (err: any) {
      alert(err.message || 'Erro inesperado');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
        <FileSearch className="w-6 h-6" />
        Análise de Documentos
      </h1>
      <p className="text-sm text-gray-500 mb-6">Cliente ID: <strong>{id}</strong></p>

      {/* Upload */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Upload de Documento</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="block w-full border rounded p-2 text-sm"
        />
        {file && (
          <p className="text-sm text-gray-600 mt-1">📎 {file.name}</p>
        )}
      </div>

      {/* Tipo do documento */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Tipo do Documento</label>
        <select
          className="w-full border rounded p-2 text-sm"
          value={docType}
          onChange={(e) => setDocType(e.target.value)}
        >
          <option value="">Selecione...</option>
          <option value="Contrato">Contrato</option>
          <option value="Petição">Petição</option>
          <option value="Decisão Judicial">Decisão Judicial</option>
          <option value="Outro">Outro</option>
        </select>
      </div>

      {/* Ações de IA */}
      <div className="mb-6">
        <label className="block mb-1 font-medium">O que deseja que a IA faça?</label>
        <div className="flex flex-col gap-2 text-sm">
          <label>
            <input
              type="checkbox"
              checked={actions.includes('resumir')}
              onChange={() => handleCheckboxChange('resumir')}
              className="mr-2"
            />
            Resumir o documento
          </label>
          <label>
            <input
              type="checkbox"
              checked={actions.includes('prazos')}
              onChange={() => handleCheckboxChange('prazos')}
              className="mr-2"
            />
            Extrair prazos relevantes
          </label>
          <label>
            <input
              type="checkbox"
              checked={actions.includes('minuta')}
              onChange={() => handleCheckboxChange('minuta')}
              className="mr-2"
            />
            Sugerir uma minuta de peça
          </label>
        </div>
      </div>
        <div className="flex gap-4 justify-end">
        <Button
          onClick={handleAnalyze}
          disabled={loading}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-60 cursor-pointer"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin w-4 h-4" /> Analisando...
            </span>
          ) : (
            'Analisar Documento'
          )}
        </Button>
        <Button
          onClick={() => router.push(`/logged/clients/${id}/client`)}
          disabled={loading}
          className="bg-gray-100 hover:bg-gray-200 text-black px-4 py-2 rounded disabled:opacity-60 cursor-pointer"
        >
          Voltar
        </Button>
        </div>

      {/* Resultado */}
      {result && (
        <div className="mt-6 p-4 bg-gray-50 border rounded text-sm whitespace-pre-wrap">
          <strong>Resultado da IA:</strong>
          <p className="mt-2">{result}</p>
        </div>
      )}
    </div>
  );
}
