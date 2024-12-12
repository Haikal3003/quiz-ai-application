import { User } from 'next-auth';
import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { signOut } from '@/lib/nextauth';

interface UserAccountMenuProps {
  user: Pick<User, 'name' | 'email' | 'image'>;
}

export default function UserAccountMenu({ user }: UserAccountMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image src={user.image || ''} alt="user" width={44} height={44} className="rounded-full  cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <div className="flex flex-col justify-center p-2">
          <h1 className="text-sm">{user.name}</h1>
          <h3 className="text-xs text-slate-500">{user.email}</h3>
        </div>

        <DropdownMenuSeparator />
        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
          }}
        >
          <DropdownMenuItem asChild>
            <button type="submit" className=" w-full text-xs text-red-500">
              Signout
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
