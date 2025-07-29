"use client";

import { useEffect, useState } from "react";
import { getClients } from "@/utils/localStorageData";
import { useAuth } from "@/context/AuthContext";
import { ClientFormData } from "@/schemas/clientSchemas";
import { useRouter } from "next/navigation";
import { dataNavigation } from "@/utils/navigationRoutes";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface Props {
  onFilter: (clients: ClientFormData[]) => void;
}

export default function ClientSearchHeader({ onFilter }: Props) {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const router = useRouter();
  const { url, title } = dataNavigation.clientRegister;

  useEffect(() => {
    const allClients = getClients();

    const filtered = allClients
    .filter((client) => client.user_id === user?.id)
    .filter((client) =>
      client.name.toLowerCase().includes(search.toLowerCase())
    );
    
    onFilter(filtered);
  }, [search, user, onFilter]);

  return (
    <div className="flex mb-4 gap-2">
      <Input
        type="text"
        placeholder="Buscar cliente pelo nome"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input w-4/5"
      />
      <Button
        variant="default"
        onClick={() => router.push(url)}
        className="w-1/5 px-4 py-2 rounded hover:bg-gray-600 cursor-pointer"
      >
        {title}
      </Button>
    </div>
  );
}
