import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { assunto, descricao } = body;

    if (!assunto || !descricao) {
      return NextResponse.json({ error: 'Campos obrigatórios não preenchidos.' }, { status: 400 });
    }

    const prompt = `
    Gere uma minuta jurídica com linguagem formal, baseada no seguinte contexto:

    Assunto: ${assunto}
    Descrição: ${descricao}

    A minuta deve conter cabeçalho, introdução, argumentos, conclusão e uma estrutura legal válida.
    `;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const result = completion.choices[0]?.message?.content;

    return NextResponse.json({ draft: result }, { status: 200 });

  } catch (err: any) {
    console.error('Erro ao gerar minuta:', err);

    // Tratar erros específicos da OpenAI
    if (err?.status === 401) {
      return NextResponse.json({ error: 'Não autorizado. Verifique sua API Key.' }, { status: 401 });
    }

    if (err?.status === 403) {
      return NextResponse.json({ error: 'Acesso proibido. Sua conta pode não ter permissão para usar este modelo.' }, { status: 403 });
    }

    if (err?.status === 404) {
      return NextResponse.json({ error: 'Modelo não encontrado. Verifique se o modelo está correto e disponível na sua conta.' }, { status: 404 });
    }

    if (err?.status === 429) {
      return NextResponse.json({ error: 'Limite de uso excedido. Aguarde ou revise sua cota e plano.' }, { status: 429 });
    }

    if (err?.status === 500) {
      return NextResponse.json({ error: 'Erro interno na OpenAI. Tente novamente mais tarde.' }, { status: 502 });
    }

    // Erro genérico (caso nenhum dos acima seja atendido)
    return NextResponse.json({ error: 'Erro inesperado ao gerar a minuta.' }, { status: 500 });
  }
}
