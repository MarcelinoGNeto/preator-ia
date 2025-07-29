// app/api/openai/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  const docType = formData.get('docType') as string;
  const actions = JSON.parse(formData.get('actions') as string) as string[];

  if (!file || !docType || actions.length === 0) {
    return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 });
  }

  // Lê o conteúdo do arquivo (apenas texto simples no MVP)
  const buffer = await file.arrayBuffer();
  const text = Buffer.from(buffer).toString('utf-8');

  const prompt = `
Você é um assistente jurídico. Analise o seguinte documento do tipo "${docType}".

Texto:
"${text.slice(0, 4000)}"  ← (limitando no MVP)

Ações solicitadas:
${actions.includes('resumir') ? '- Resumir o documento\n' : ''}
${actions.includes('prazos') ? '- Extrair prazos relevantes\n' : ''}
${actions.includes('minuta') ? '- Sugerir uma minuta de petição\n' : ''}
`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
    });

    return NextResponse.json({ result: completion.choices[0].message.content });
  } catch (error) {
    console.error('[OPENAI ERROR]', error);
    return NextResponse.json({ error: 'Erro ao processar IA' }, { status: 500 });
  }
}
