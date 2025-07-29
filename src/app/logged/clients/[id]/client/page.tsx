
'use client';

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "../../../../../components/data-table";
import { useParams, useRouter } from "next/navigation";
import { getProcesses } from "@/utils/localStorageData";

export default function ClientPage() {
  const router = useRouter();
  const { id } = useParams();
  const processData = getProcesses();
  console.log("Processos: ", processData);
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 px-4 lg:px-6">
      <Card 
        className="@container/card cursor-pointer" 
        onClick={() => router.push(`/logged/clients/${id}/analyze`)}
      >
        <CardHeader>
          <CardDescription>Analyze IA </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            Análise de Documento
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2">
            Carregue um arquivo e receba sugestões automatizadas com base no
            documento.
          </div>
        </CardFooter>
      </Card>
      <Card 
        className="@container/card cursor-pointer" 
        onClick={() => router.push(`/logged/clients/${id}/smart-draft`)}
      >
        <CardHeader>
          <CardDescription>Smart draft IA</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            Criação de documento
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2">
            Em poucos cliques, crie documentos
          </div>
        </CardFooter>
      </Card>
      <div className="col-span-1 md:col-span-2">
        <DataTable data={processData} />
      </div>
    </div>
  );
}
