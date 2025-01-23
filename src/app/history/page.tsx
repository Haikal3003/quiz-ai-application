import HistoryPageCard from '@/components/HistoryPageCard';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/nextauth';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function page() {
  const session = await auth();

  if (!session?.user) {
    return redirect('/');
  }

  const user = await prisma.user.findUnique({
    where: { id: session?.user.id },
    include: {
      games: true,
    },
  });

  return <HistoryPageCard games={user?.games ?? []} />;
}
