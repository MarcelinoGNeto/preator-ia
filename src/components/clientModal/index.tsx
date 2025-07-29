"use client";

import { Button } from "@/components/ui/button";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClientFormData, clientSchema } from "@/schemas/clientSchemas";
import { v4 as uuid } from "uuid";
import { useAuth } from "@/context/AuthContext";
import { saveClient, updateClient } from "@/utils/localStorageData";
import { toast } from "sonner";
import { useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../ui/dialog";
import ClientFormFields from "../clientForm/fields/ClientFormFields";

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientData?: ClientFormData; // Se fornecido, estamos em modo de edição
}

export default function ClientModal({ isOpen, onClose, clientData }: ClientModalProps) {
  const { user } = useAuth(); // Pegando o usuário autenticado

  const methods = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      id: clientData?.id || uuid(),
      name: clientData?.name || "",
      cpf: clientData?.cpf || "",
      address: clientData?.address || "",
      contact_info: clientData?.contact_info || "",
      user_id: user?.id || "",
    },
  });

  const { register, handleSubmit, reset, formState, setValue } = methods;
  const { isValid } = formState;

  useEffect(() => {
    if (user?.id) {
      setValue("user_id", String(user.id)); // Preenchendo user_id ao carregar o formulário
    }
  }, [user, setValue]);

  const onSubmit = (data: ClientFormData) => {
    if (!isValid) {
      toast.error("Por favor, preencha todos os campos corretamente.");
      return;
    }

    // Se já existe clientData, estamos atualizando, senão estamos criando
    if (clientData) {
      updateClient(data); // Função para atualizar o cliente
      toast.success("Cliente atualizado com sucesso!", {
        description: `Nome: ${data.name}`,
      });
    } else {
      saveClient(data); // Função para salvar o novo cliente
      toast.success("Cliente salvo com sucesso!", {
        description: `Nome: ${data.name}`,
      });
    }

    reset();
    onClose(); // Fecha a modal após salvar
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button className="hidden">Abrir Modal</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{clientData ? "Editar Cliente" : "Cadastro de Cliente"}</DialogTitle>
        <DialogDescription>
          Preencha os campos abaixo para {clientData ? "editar" : "criar"} o cliente.
        </DialogDescription>

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 p-6 max-w-2xl mx-auto"
          >
            {/* Campos do formulário */}
            <ClientFormFields register={register} errors={formState.errors} defaultValues={clientData} />

            <div className="flex gap-4 mt-6">
              <Button
                type="submit"
                variant="default"
                className="px-4 py-2 rounded hover:bg-gray-600 cursor-pointer"
                disabled={!isValid}
              >
                {clientData ? "Atualizar Cliente" : "Salvar Cliente"}
              </Button>
              <Button
                variant="secondary"
                onClick={onClose}
                className="px-4 py-2 rounded hover:bg-gray-200 cursor-pointer"
              >
                Cancelar
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
