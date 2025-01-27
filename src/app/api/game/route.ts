import { prisma } from '@/lib/db';
import { auth } from '@/lib/nextauth';
import { createQuizSchema } from '@/schemas/createQuizSchema';
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

interface Question {
  question: string;
  answer: string;
  options: string[];
}
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'You must be logged in to start the quiz' }, { status: 401 });
    }

    const body = await req.json();
    const { topic, type, amount } = createQuizSchema.parse(body);

    const game = await prisma.game.create({
      data: {
        gameType: type,
        timeStarted: new Date(),
        userId: session.user.id,
        topic,
      },
    });

    await prisma.topic_count.upsert({
      where: {
        topic,
      },
      create: {
        id: crypto.randomUUID(),
        topic,
        count: 1,
      },
      update: {
        count: {
          increment: 1,
        },
      },
    });

    // Cek apakah API eksternal bisa diakses
    const response = await axios.post(`${process.env.NEXT_API_URL}/api/questions`, {
      topic,
      type,
      amount,
    });

    if (!response?.data?.questions) {
      return NextResponse.json({ error: 'No questions found from external API' }, { status: 400 });
    }

    const manyData = response.data.questions.map((question: Question) => {
      const options = [...question.options].sort(() => Math.random() - 0.5);

      return {
        question: question.question,
        answer: question.answer,
        options: JSON.stringify(options),
        gameId: game.id,
        questionType: type,
      };
    });

    await prisma.question.createMany({
      data: manyData,
    });

    return NextResponse.json({ gameId: game.id }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Validation Error:', error.message);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.error('Unexpected Error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
