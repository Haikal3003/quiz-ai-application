import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { BorderBeam } from '../ui/border-beam';
import { GamesProps } from '@/types/types';

function RecentActivityCard({ games }: GamesProps) {
  const sortedGames = [...games].sort((a, b) => new Date(b.timeStarted).getTime() - new Date(a.timeStarted).getTime());

  return (
    <Card className="w-full flex-grow relative overflow-hidden">
      <CardHeader>
        <CardTitle className="text-base">Recent Activity</CardTitle>
        <CardDescription className="text-xs">Your activities</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 divide-y divide-gray-200">
        <div>
          {sortedGames.map((quiz: any, idx: number) => {
            return (
              <div key={idx} className="flex justify-between items-center py-4">
                <div>
                  <h1 className="text-sm font-semibold">{quiz.topic}</h1>
                  <h2 className="text-xs text-gray-600">Type: {quiz.gameType === 'mcq' ? 'Multiple Choice' : 'True or False'}</h2>
                </div>
                <div>
                  <p className="text-xs text-gray-500">{new Date(quiz.timeStarted).toLocaleString()}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
      <BorderBeam />
    </Card>
  );
}

export default RecentActivityCard;
