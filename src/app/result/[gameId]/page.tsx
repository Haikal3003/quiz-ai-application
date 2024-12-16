import Result from '@/components/Result';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/nextauth';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function ResultPage({ params }: any) {
  const session = await auth();

  if (!session?.user) {
    return redirect('/');
  }

  const { gameId } = await params;

  const game = await prisma.game.findUnique({
    where: { id: gameId },
    include: {
      questions: true,
    },
  });

  if (!game) {
    return <div className="text-center text-red-500">Game not found</div>;
  }

  return <Result game={game} />;
}
