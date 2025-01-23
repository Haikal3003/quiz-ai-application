import HistoryCard from '@/components/dashboard/HistoryCard';
import PlayQuizCard from '@/components/dashboard/PlayQuizCard';
import RecentActivityCard from '@/components/dashboard/RecentActivityCard';
import Navbar from '@/components/Navbar';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/nextauth';
import React from 'react';

export default async function Dashboard() {
  const session = await auth();

  const user = await prisma.user.findUnique({
    where: { id: session?.user.id },
    include: {
      games: true,
    },
  });

  return (
    <div className="relative w-full">
      <Navbar />
      <div className="flex flex-col py-6 gap-4">
        <div className="flex justify-between items-center gap-4">
          <PlayQuizCard />
          <HistoryCard />
        </div>
        <div className="w-full h-full">
          <RecentActivityCard games={user?.games ?? []} />
        </div>
      </div>
    </div>
  );
}
