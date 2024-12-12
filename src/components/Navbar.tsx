import { auth } from '@/lib/nextauth';
import React from 'react';
import UserAccountMenu from './UserAccountMenu';
import { ModeToggle } from './ModeToggle';
import Link from 'next/link';

export default async function Navbar() {
  const session = await auth();

  return (
    <header className="w-full px-16 pt-8 ">
      <div className="flex justify-between items-center w-full">
        <div className="logo-text">
          <h1 className="font-bold text-lg">QuizzyAI</h1>
        </div>

        <div className="flex justify-center items-center gap-4">
          <ModeToggle />

          {session?.user && <UserAccountMenu user={session?.user} />}
        </div>
      </div>
    </header>
  );
}
