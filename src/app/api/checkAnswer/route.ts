import { prisma } from '@/lib/db';
import { checkAnswerSchema } from '@/schemas/questions';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export async function POST(req: Request) {
  try {
    const { questionId, userInput } = checkAnswerSchema.parse(await req.json());
    const question = await prisma.question.findUnique({ where: { id: questionId } });

    if (!question) {
      return NextResponse.json({ message: 'Question not found' }, { status: 404 });
    }

    const isCorrect = question.answer.toLowerCase().trim() === userInput.toLowerCase().trim();
    await prisma.question.update({
      where: { id: questionId },
      data: { userAnswer: userInput, isCorrect },
    });

    return NextResponse.json({ isCorrect });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: error.issues }, { status: 400 });
    }
  }
}
