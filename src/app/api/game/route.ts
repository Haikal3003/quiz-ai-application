import { prisma } from '@/lib/db';
import { auth } from '@/lib/nextauth';
import { createQuizSchema } from '@/schemas/createQuizSchema';
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
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

    await prisma.topicCount.upsert({
      where: {
        topic,
      },
      create: {
        topic,
        count: 1,
      },
      update: {
        count: {
          increment: 1,
        },
      },
    });

    const response = await axios.post(`${process.env.NEXT_API_URL}/api/questions`, {
      topic,
      type,
      amount,
    });

    const manyData = response.data.questions.map((question: any) => {
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
  } catch (error: any) {
    if (error) {
      console.error('Validation Error:', error.message);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.error('Unexpected Error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get('id');

  if (!id) {
    return new Response('ID parameter is missing', { status: 400 });
  }

  try {
    await prisma.game.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: 'Delete game successfully!' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
