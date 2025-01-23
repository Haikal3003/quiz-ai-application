import { generateQuestion } from '@/lib/gemini';
import { getQuestionsSchema } from '@/schemas/questions';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { topic, type, amount } = getQuestionsSchema.parse(body);

    const geminiResponse = await generateQuestion({ topic, type, amount });

    return NextResponse.json(geminiResponse, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to generate questions' }, { status: 401 });
  }
}
