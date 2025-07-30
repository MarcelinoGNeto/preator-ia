"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { dataNavigation } from "@/utils/navigationRoutes";
import { IconDotsVertical } from "@tabler/icons-react";
import { Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

interface DropdownMenuClientProps {
  clientId: string;
  onDelete?: () => void;
}

export function DropdownMenuClient({ clientId, onDelete }: DropdownMenuClientProps) {

  const router = useRouter();
  const { url } = dataNavigation.navMain[1];

  const handlClick = () => {
    if (!clientId) {
      router.push(url);
    }
    if (clientId) {
      router.push(`${url}/${clientId}/client-edit`);
    }
  }


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 cursor-pointer">
          <IconDotsVertical size={20} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuItem onClick={handlClick}>
          <Edit className="mr-2 h-4 w-4" />
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete}>
          <Trash className="mr-2 h-4 w-4 text-red-500" />
          <span className="text-red-500">Remover</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
