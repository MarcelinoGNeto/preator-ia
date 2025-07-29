"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ClientFormData } from "@/schemas/clientSchemas";
import { FC } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface ClientFormFieldsProps {
  register: UseFormRegister<ClientFormData>;
  errors: FieldErrors<ClientFormData>;
  defaultValues?: {
    id: string;
    user_id: string;
    name: string;
    contact_info: string;
    address: string;
    cpf: string;
  };
}

const ClientFormFields: FC<ClientFormFieldsProps> = ({ register, errors, defaultValues }) => {
  console.log("Default Values:", defaultValues);
  return (
    <>
      <div>
        <Label htmlFor="name">Nome:</Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="Digite o nome completo"
          defaultValue="banada"
          className="w-full mt-1"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="cpf">CPF</Label>
        <Input
          id="cpf"
          {...register("cpf")}
          placeholder="Digite o número do CPF"
          defaultValue={defaultValues?.cpf || ""}
          className="w-full mt-1"
        />
        {errors.cpf && <p className="text-red-500 text-sm">{errors.cpf.message}</p>}
      </div>

      <div>
        <Label htmlFor="address">Endereço</Label>
        <Input
          id="address"
          {...register("address")}
          placeholder="Digite o endereço completo"
          defaultValue={defaultValues?.address || ""}
          className="w-full mt-1"
        />
        {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
      </div>

      <div>
        <Label htmlFor="contact_info">Contato</Label>
        <Input
          id="contact_info"
          {...register("contact_info")}
          placeholder="Digite o contato do cliente"
          defaultValue={defaultValues?.contact_info || ""}
          className="w-full mt-1"
        />
        {errors.contact_info && <p className="text-red-500 text-sm">{errors.contact_info.message}</p>}
      </div>
    </>
  );
};

export default ClientFormFields;
