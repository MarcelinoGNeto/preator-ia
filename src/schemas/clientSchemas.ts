import { z } from "zod";

export const documentSchema = z.object({
  id: z.string().optional(),
  created_at: z.string().optional(),
  filename: z.string().min(1, "Nome do arquivo é obrigatório"),
  url: z.string().url("URL inválida"),
});

export const clientSchema = z.object({
  user_id: z.string().uuid("ID de usuário inválido"),
  id: z.string().uuid("ID inválido"),
  name: z.string().min(1, "Nome é obrigatório"),
  cpf: z.string().min(11, "CPF inválido").max(14, "CPF inválido"),
  contact_info: z.string().min(1, "Informações de contato são obrigatórias"),
  address: z.string().min(1, "Endereço é obrigatório"),
});
export type ClientFormData = z.infer<typeof clientSchema>;

export const processFormSchema = z.object({
  number: z.string().min(5, 'Número obrigatório'),
  area: z.string().min(2),
  subject: z.string().min(2),
  court: z.string().min(2),
  jurisdiction: z.string().min(2),
  phase: z.string().min(2),
  opposing_party: z.string().min(2),
  lawyer_name: z.string().optional(),
  status: z.enum(['Ativo', 'Arquivado', 'Suspenso']),
  deadline: z.string().optional(),
  client_id: z.string().uuid(),
});

export const processData = processFormSchema.extend({
  id: z.number(),
  created_at: z.string(),
});

export type ProcessData = z.infer<typeof processData>;
export type ProcessFormData = z.infer<typeof processFormSchema>;
