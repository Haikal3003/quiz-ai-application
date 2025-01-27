import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/nextauth';
import Game from '@/components/GameCard';

export default function Page({ gameData }: { gameData: any }) {
  if (!gameData) {
    return <div>Game not found</div>;
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Game game={gameData} />
    </div>
  );
}

export async function getServerSideProps({ params }: { params: { gameId: string } }) {
  const gameId = params.gameId;

  const session = await auth();
  if (!session?.user) {
    return redirect('/');
  }

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
    return { props: { gameData: null } };
  }

  const formattedGame = {
    ...game,
    questions: game.questions.map((q) => ({
      ...q,
      options: Array.isArray(q.options) ? q.options : JSON.parse((q.options as string) || '[]'),
    })),
  };

  return {
    props: {
      gameData: formattedGame,
    },
  };
}
