'use client';
import React from 'react';
import { Card } from './ui/card';
import { Dot } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { GamesProps } from '@/types/types';

export default function HistoryPageCard({ games }: GamesProps) {
  const [showDropdownMenu, setShowDropdownMenu] = React.useState<string | null>(null);

  const sortedGames = [...games].sort((a, b) => new Date(b.timeStarted).getTime() - new Date(a.timeStarted).getTime());

  const router = useRouter();

  const handleView = (gameId: string) => {
    router.push(`/result/${gameId}`);
  };

  const handleDelete = async (gameId: string) => {
    try {
      const res = await axios.delete(`/api/game?id=${gameId}`);

      if (res) {
        console.log(res.data.message);
        window.location.reload();
      } else {
        console.log('Failed to delete game');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="py-10">
      <h1 className="text-center text-xl font-semibold mb-5">History</h1>
      <div className="grid grid-cols-4 gap-4">
        {sortedGames.map((quiz: any, idx: number) => {
          return (
            <Card key={idx} className="relative p-4">
              <div>
                <div className="space-y-2">
                  <h1 className="text-sm font-semibold">{quiz.topic}</h1>
                  <h2 className="text-xs text-gray-600">Type: {quiz.gameType === 'mcq' ? 'Multiple Choice' : 'True or False'}</h2>
                  <p className="text-xs text-gray-500">{new Date(quiz.timeStarted).toLocaleString()}</p>
                </div>
                <div
                  className="w-[30px] h-[30px] rounded-full border border-slate-800 flex justify-center items-center absolute right-2 top-2 cursor-pointer hover:bg-white hover:text-black"
                  onClick={() => setShowDropdownMenu(showDropdownMenu === quiz.id ? null : quiz.id)}
                >
                  <Dot />
                </div>
                {showDropdownMenu === quiz.id && (
                  <Card className="absolute right-2 top-10   rounded-md w-28 p-1 space-y-1 z-30">
                    <button onClick={() => handleView(quiz.id)} className="block w-full text-left text-xs p-2 border border-slate-800 rounded-md">
                      View
                    </button>
                    <button onClick={() => handleDelete(quiz.id)} className="block w-full text-left text-xs p-2  bg-red-500 text-white hover:bg-red-600 rounded-md">
                      Delete
                    </button>
                  </Card>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
