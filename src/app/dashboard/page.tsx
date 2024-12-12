import HistoryCard from '@/components/dashboard/HistoryCard';
import PlayQuizCard from '@/components/dashboard/PlayQuizCard';
import RecentActivityCard from '@/components/dashboard/RecentActivityCard';
import Navbar from '@/components/Navbar';
import React from 'react';

export default async function Dashboard() {
  return (
    <div className="relative w-full">
      <Navbar />
      <div className="flex flex-col py-6 gap-4">
        <div className="flex justify-between items-center gap-4">
          <PlayQuizCard />
          <HistoryCard />
        </div>
        <div className="w-full h-full">
          <RecentActivityCard />
        </div>
      </div>
    </div>
  );
}
