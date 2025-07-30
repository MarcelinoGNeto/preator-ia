'use client';
import ClientForm from "@/components/clientForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClientFormData, clientSchema } from "@/schemas/clientSchemas";
import { FormProvider, useForm } from "react-hook-form";

export default function EditPage() {
  const methods = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      user_id: 0,
      client_id: '',
      name: '',
      cpf: '',
      contact_info: '',
      address: '',
    },
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <FormProvider {...methods}>
        <ClientForm />
      </FormProvider>
    </main>
  );
}
