"use client";

import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { v4 as uuid } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getClientById,
  saveClient,
  updateClient,
} from "@/utils/localStorageData";
import { useParams, useRouter } from "next/navigation";
import { clientSchema, ClientFormData } from "@/schemas/clientSchemas";
import { useAuth } from "@/context/AuthContext";
import { dataNavigation } from "@/utils/navigationRoutes";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ClientForm() {
  const { user } = useAuth();
  const router = useRouter();

  const { id } = useParams();
  const [clientData, setClientData] = useState<ClientFormData | null>(null);

  const methods = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      client_id: uuid(),
      name: "",
      contact_info: "",
      address: "",
      cpf: "",
      user_id: Number(user?.id) || 0,
    },
  });

  const { register, handleSubmit, reset, formState } = methods;
  const { isValid } = formState;
  const { url } = dataNavigation.navMain[1];

  useEffect(() => {
    if (id) {
      const clientId = Array.isArray(id) ? id[0] : id;
      const fetchedClientData = getClientById(clientId);

      if (fetchedClientData) {
        setClientData(fetchedClientData);
        reset(fetchedClientData);
      }
    }
  }, [id, user, reset]);

  const onSubmit = (data: ClientFormData) => {
    if (!isValid) {
      toast.error("Por favor, preencha todos os campos corretamente.");
      return;
    }

    const formatedData = {
      ...data,
      user_id: Number(user?.id),
    };

    if (clientData && clientData.client_id) {
      updateClient(formatedData);
      toast.success("Cliente atualizado com sucesso!", {
        description: `Nome: ${data.name}`,
      });
      router.push(url);
      return;
    }
    
    saveClient(formatedData);
    toast.success("Cliente salvo com sucesso!", {
      description: `Nome: ${data.name}`,
    });

    reset();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 p-6 max-w-2xl mx-auto"
      >
        <h2 className="text-xl font-bold">
          {clientData?.client_id ? "Editar Cliente" : "Cadastro de Cliente"}
        </h2>
        <div>
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            {...register("name")}
            placeholder="Digite o nome completo"
            className="w-full mt-1"
          />
        </div>
        <div>
          <Label htmlFor="cpf">CPF</Label>
          <Input
            id="cpf"
            {...register("cpf")}
            placeholder="Digite o número do CPF"
            className="w-full mt-1"
          />
        </div>
        <div>
          <Label htmlFor="address">Endereço</Label>
          <Input
            id="address"
            {...register("address")}
            placeholder="Digite o endereço completo"
            className="w-full mt-1"
          />
        </div>
        <div>
          <Label htmlFor="contact_info">Contato</Label>
          <Input
            id="contact_info"
            {...register("contact_info")}
            placeholder="Digite o contato do cliente"
            className="w-full mt-1"
          />
        </div>
        <div className="flex gap-4 mt-6">
          <Button
            type="submit"
            variant="default"
            className="px-4 py-2 rounded hover:bg-gray-600 cursor-pointer"
          >
            {clientData?.client_id ? "Atualizar Cliente" : "Salvar Cliente"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.push(url)}
            className="px-4 py-2 rounded hover:bg-gray-200 cursor-pointer"
          >
            Voltar
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
