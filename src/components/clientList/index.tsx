"use client";

import { useState } from "react";
import ClientSearchHeader from "../clientSearchHeader";
import { ClientFormData } from "@/schemas/clientSchemas";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenuClient } from "./components/dropdownMenu";
import { getInitials } from "@/utils/getInitials";

export default function ClientList() {
  const router = useRouter();
  const [filteredClients, setFilteredClients] = useState<ClientFormData[]>([]);

  return (
    <div className="p-6">
      <ClientSearchHeader onFilter={setFilteredClients} />

      {filteredClients.length === 0 ? (
        <p className="text-gray-600 mt-4">Nenhum cliente encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {filteredClients.map((client) => (
            <Card key={client.id} className="relative p-4">
            <DropdownMenuClient
              clientId={client.id || ""}
              onDelete={() => {
                console.log("Remover cliente:", client.name);
              }}
            />
          
            <div 
              className="flex flex-col items-center gap-4 cursor-pointer"
              onClick={() => router.push(`/logged/clients/${client.id}/client`)}
            >
              <Avatar className="w-20 h-20">
                <AvatarFallback className="text-2xl font-medium">
                  {getInitials(client.name)}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <p className="font-medium text-gray-800">{client.name}</p>
                <p className="text-sm text-gray-500">CPF: {client.cpf}</p>
                <p className="text-sm text-gray-500">Contato: {client.contact_info}</p>
              </div>
            </div>
          </Card>
          
          ))}
        </div>
      )}
    </div>
  );
}
