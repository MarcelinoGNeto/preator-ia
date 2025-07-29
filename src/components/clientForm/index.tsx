"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuid } from "uuid";
import { saveClient } from "@/utils/localStorageData";
import { useRouter } from "next/navigation";
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

  const methods = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      id: uuid(),
      name: "",
      contact_info: "",
      address: "",
    },
  });

  const { register, handleSubmit, reset, formState } = methods;
  const { isValid } = formState;

  const { url } = dataNavigation.navMain[1];

  const onSubmit = (data: ClientFormData) => {
    if (!isValid) {
      toast.error("Por favor, preencha todos os campos corretamente.");
      return;
    }

    const clientData = {
      ...data,
      user_id: user?.id || "",
    }
    saveClient(clientData);

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
        <h2 className="text-xl font-bold">Cadastro de Cliente</h2>
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
            Salvar Cliente
          </Button>
          <Button
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
