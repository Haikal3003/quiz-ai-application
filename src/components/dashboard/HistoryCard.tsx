import React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { History } from 'lucide-react';
import { BorderBeam } from '@/components/ui/border-beam';

function HistoryCard() {
  return (
    <Card className="relative w-full overflow-hidden cursor-pointer group">
      <CardHeader>
        <CardTitle className="text-base">History</CardTitle>
        <CardDescription className="text-xs">Challenge yourself and test your knowledge</CardDescription>
        <History className="absolute right-6 top-[40%] -translate-y-[40%] group-hover:text-red-400" width={20} height={20} />
      </CardHeader>
      <BorderBeam />
    </Card>
  );
}

export default HistoryCard;
