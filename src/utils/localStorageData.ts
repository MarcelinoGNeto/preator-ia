import { ClientFormData, ProcessData } from "@/schemas/clientSchemas";
import { ProcessFormData } from "@/schemas/clientSchemas";

export function saveClient(client: ClientFormData) {
  const current = getClients();
  localStorage.setItem('clients', JSON.stringify([...current, client]));
}

export function updateClient(updatedClientData: ClientFormData) {
  const clients  = getClients();
  const updatedClients = clients.map((client: ClientFormData) =>
    client.id === updatedClientData.id ? updatedClientData : client
  );
  localStorage.setItem('clients', JSON.stringify(updatedClients));
}

export function getClients(): ClientFormData[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem('clients');
  return data ? JSON.parse(data) : [];
}

export function getClientById(clientId: string): ClientFormData | undefined {
  const clients = getClients();
  return clients.find((client) => client.id === clientId);
}


export function saveProcess(process: ProcessFormData) {
  const existing = getProcesses();
  const numberId = existing.length > 0 ? Math.max(...existing.map(p => p.id), 0) + 1 : 1;
 
  const newProcess = {
    ...process,
    id: numberId,
    created_at: new Date().toISOString(),
  };
  localStorage.setItem("processes", JSON.stringify([...existing, newProcess]));
}

export function getProcesses(): ProcessData[] & { id: string; created_at: string }[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem("processes");
  return data ? JSON.parse(data) : [];
}

export function getProcessesByClientId(clientId: string) {
  return getProcesses().filter((process) => process.client_id === clientId);
}
