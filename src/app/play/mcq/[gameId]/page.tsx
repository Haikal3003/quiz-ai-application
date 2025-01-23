import { redirect } from 'next/navigation';
import React from 'react';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/nextauth';
import Game from '@/components/GameCard';
import { useParams } from 'next/navigation';

export default async function Page() {
  // Using useParams to retrieve dynamic route params
  const { gameId } = useParams<{ gameId: string }>();

  const session = await auth();
  if (!session?.user) {
    return redirect('/');
  }

  if (!gameId) {
    return <div>Game not found</div>;
  }

  // Fetch game data from Prisma
  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
    include: {
      questions: {
        select: {
          id: true,
          question: true,
          options: true,
          answer: true,
        },
      },
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
    })),
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Game game={formattedGame} />
    </div>
  );
}
