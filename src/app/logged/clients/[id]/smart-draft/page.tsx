'use client';

import { useState } from 'react';
import { Loader2, FileText, ClipboardCopy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useParams, useRouter } from 'next/navigation';

export default function SmartDraftPage() {
  const { id } = useParams();
  const router = useRouter();
  const [docType, setDocType] = useState('');
  const [formValues, setFormValues] = useState({
    cliente: '',
    parteContraria: '',
    assunto: '',
    descricao: '',
  });
  const [loading, setLoading] = useState(false);
  const [generatedDraft, setGeneratedDraft] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async () => {
    const { cliente, assunto, descricao } = formValues;

    if (!docType || !cliente || !assunto || !descricao) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    setLoading(true);
    setGeneratedDraft(null);

    try {
      const res = await fetch('/api/generate-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assunto: docType,
          descricao: `${formValues.cliente}, ${formValues.parteContraria}, ${formValues.descricao}`,
        }),
        
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Erro ao gerar minuta');

      setGeneratedDraft(data.text);
    } catch (err: any) {
      alert(err.message || 'Erro inesperado');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (generatedDraft) {
      await navigator.clipboard.writeText(generatedDraft);
      alert('Minuta copiada para a área de transferência.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <FileText className="w-6 h-6" />
        Geração de Minuta Inteligente
      </h1>

      {/* Tipo de Documento */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Tipo de Documento</label>
        <select
          value={docType}
          onChange={(e) => setDocType(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">Selecione...</option>
          <option value="notificacao">Notificação Extrajudicial</option>
          <option value="contrato">Contrato de Prestação de Serviços</option>
          <option value="peticao">Petição Inicial</option>
        </select>
      </div>

      {/* Assunto */}
      <div className="mb-4">
        <label className="block font-medium">Assunto</label>
        <input
          name="assunto"
          value={formValues.assunto}
          onChange={handleInputChange}
          placeholder="Ex: Cobrança de aluguéis em atraso"
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Nome do Cliente */}
      <div className="mb-4">
        <label className="block font-medium">Nome do Cliente</label>
        <input
          name="cliente"
          value={formValues.cliente}
          onChange={handleInputChange}
          placeholder="Ex: João da Silva"
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Parte Contrária (somente se não for contrato) */}
      {docType !== 'contrato' && (
        <div className="mb-4">
          <label className="block font-medium">Parte Contrária</label>
          <input
            name="parteContraria"
            value={formValues.parteContraria}
            onChange={handleInputChange}
            placeholder="Ex: Empresa XYZ"
            className="w-full border p-2 rounded"
          />
        </div>
      )}

      {/* Descrição */}
      <div className="mb-6">
        <label className="block font-medium">Descrição do Caso</label>
        <textarea
          name="descricao"
          value={formValues.descricao}
          onChange={handleInputChange}
          placeholder="Descreva brevemente a situação..."
          rows={5}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="flex gap-4 justify-end">
        <Button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-60 cursor-pointer"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin w-4 h-4" /> Gerando...
            </span>
          ) : (
            'Gerar Minuta'
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
      {generatedDraft && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <div className="flex justify-between items-center mb-2">
            <strong className="text-lg">Minuta Gerada</strong>
            <button onClick={copyToClipboard} className="text-sm text-blue-600 flex items-center gap-1 hover:underline">
              <ClipboardCopy className="w-4 h-4" />
              Copiar
            </button>
          </div>
          <pre className="whitespace-pre-wrap text-sm">{generatedDraft}</pre>
        </div>
      )}
    </div>
  );
}
