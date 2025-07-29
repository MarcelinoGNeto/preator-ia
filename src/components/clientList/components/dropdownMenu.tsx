"use client";

import ClientModal from "@/components/clientModal";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ClientFormData } from "@/schemas/clientSchemas";
import { getClientById } from "@/utils/localStorageData";
import { IconDotsVertical } from "@tabler/icons-react";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";

interface DropdownMenuClientProps {
  clientId: string;
  onDelete?: () => void;
}

export function DropdownMenuClient({ clientId, onDelete }: DropdownMenuClientProps) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientData, setClientData] = useState<ClientFormData | null>(null)

  const handleOpenModal = (clientId?: string) => {
    if (clientId) {
      // Se houver um clientId, estamos editando
      const client = getClientById(clientId); // Pega os dados do cliente
      if (client) {
        setClientData(client); // Define os dados do cliente para edição
      }
    }
    setIsModalOpen(true); // Abre o modal
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 cursor-pointer">
          <IconDotsVertical size={20} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuItem onClick={() => handleOpenModal(clientId)}>
          <Edit className="mr-2 h-4 w-4" />
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete}>
          <Trash className="mr-2 h-4 w-4 text-red-500" />
          <span className="text-red-500">Remover</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
      <ClientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Fecha o modal
        clientData={clientData ?? undefined} // Passa os dados do cliente para edição
      />
    </DropdownMenu>
  );
}
