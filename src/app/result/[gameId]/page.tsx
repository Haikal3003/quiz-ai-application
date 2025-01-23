import Result from '@/components/Result';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/nextauth';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function ResultPage({ params }: { params: Promise<{ gameId: string }> }) {
  const session = await auth();
  const gameId = (await params).gameId;

  if (!session?.user) {
    return redirect('/');
  }

  const game = await prisma.game.findUnique({
    where: { id: gameId },
    include: {
      questions: true,
    },
  });

  if (!game) {
    return <div>Game not found</div>;
  }

  const formattedGame = {
    ...game,
    questions: game.questions.map((q) => ({
      ...q,
      options: Array.isArray(q.options) ? q.options : JSON.parse((q.options as string) || '[]'),
      isCorrect: q.isCorrect ?? false,
      userAnswer: q.userAnswer ?? '',
    })),
  };

  return <Result game={formattedGame} />;
}
