"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { ProcessFormData, processFormSchema } from "@/schemas/clientSchemas";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { saveProcess } from "@/utils/localStorageData";

export default function ProcessForm() {
  const { id } = useParams();
  const clientId = id as string;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<ProcessFormData>({
    resolver: zodResolver(processFormSchema),
    defaultValues: {
      status: "Ativo",
      client_id: clientId,
    },
  });

  const router = useRouter();

  const onSubmit = (data: ProcessFormData) => {
    const processData = {
    ...data,
    process_id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
  };
    saveProcess(processData);

    toast.success("Processo salvo com sucesso!", {
      description: `Número: ${data.number}`,
    });

    reset();

    setTimeout(() => {
      router.push(`/logged/clients/${clientId}/client`);
    }, 500);
  };

  useEffect(() => {
    setValue("client_id", clientId);
  }, [clientId, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6">
      <h2 className="text-xl font-bold mb-2">Cadastro de Processo</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Número do Processo</Label>
          <Input {...register("number")} />
          {errors.number && (
            <p className="text-red-500 text-sm">{errors.number.message}</p>
          )}
        </div>

        <div>
          <Label>Área</Label>
          <Input {...register("area")} />
        </div>

        <div>
          <Label>Assunto</Label>
          <Input {...register("subject")} />
        </div>

        <div>
          <Label>Vara / Tribunal</Label>
          <Input {...register("court")} />
        </div>

        <div>
          <Label>Comarca / Foro</Label>
          <Input {...register("jurisdiction")} />
        </div>

        <div>
          <Label>Fase Processual</Label>
          <Input {...register("phase")} />
        </div>

        <div>
          <Label>Parte Contrária</Label>
          <Input {...register("opposing_party")} />
        </div>

        <div>
          <Label>Advogado da Parte Contrária</Label>
          <Input {...register("lawyer_name")} />
        </div>

        <div>
          <Label>Status</Label>
          <Select
            defaultValue="Ativo"
            onValueChange={(value) =>
              setValue("status", value as ProcessFormData["status"])
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione um status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Ativo">Ativo</SelectItem>
              <SelectItem value="Arquivado">Arquivado</SelectItem>
              <SelectItem value="Suspenso">Suspenso</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Prazo</Label>
          <Controller
            control={control}
            name="deadline"
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value
                      ? format(new Date(field.value), "dd/MM/yyyy")
                      : "Selecione uma data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) =>
                      field.onChange(date?.toISOString() ?? "")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            )}
          />
        </div>
      </div>

      <input type="hidden" {...register("client_id")} />

      <div className="flex gap-4 justify-end mt-6">
        <Button
          type="submit"
          variant="default"
          className="px-4 py-2 rounded hover:bg-gray-600 cursor-pointer"
        >
          Salvar Processo
        </Button>
        <Button
          variant="secondary"
          onClick={() => router.push(`/logged/clients/${clientId}/client`)}
          className="px-4 py-2 rounded hover:bg-gray-200 cursor-pointer"
        >
          Voltar
        </Button>
      </div>
    </form>
  );
}
