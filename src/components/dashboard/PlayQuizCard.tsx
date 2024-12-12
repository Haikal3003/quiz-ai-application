'use client';

import React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Play } from 'lucide-react';
import { BorderBeam } from '../ui/border-beam';
import { useRouter } from 'next/navigation';

function PlayQuizCard() {
  const router = useRouter();
  return (
    <Card className="relative w-full overflow-hidden cursor-pointer group" onClick={() => router.push('/quiz')}>
      <CardHeader>
        <CardTitle className="text-base">Play Quiz!</CardTitle>
        <CardDescription className="text-xs">Challenge yourself and test your knowledge</CardDescription>
        <Play className="absolute right-6 top-[40%] -translate-y-[40%] group-hover:text-red-400" width={20} height={20} />
      </CardHeader>
      <BorderBeam />
    </Card>
  );
}

export default PlayQuizCard;
