import { redirect } from 'next/navigation';
import React from 'react';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/nextauth';
import Game from '@/components/GameCard';

export default async function page({ params }: any) {
  const session = await auth();
  if (!session?.user) {
    return redirect('/');
  }

  const { gameId } = await params;

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
    return redirect('/404');
  }

  return (
    <div>
      <Game game={game} />
    </div>
  );
}
