'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FcGoogle } from 'react-icons/fc';
import { BorderBeam } from '@/components/ui/border-beam';
import { ModeToggle } from '@/components/ModeToggle';
import { SignIn } from '@/lib/auth-action';

export default function Home() {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await SignIn();
    } catch (error) {
      console.error('Sign in failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center items-center w-full min-h-screen z-50">
      <Card className="w-[350px] relative">
        <CardHeader>
          <CardTitle className="text-lg">QuizzyAI</CardTitle>
          <CardDescription className="text-sm">Signin to your google account</CardDescription>
        </CardHeader>
        <CardContent>
          <Button type="submit" className="text-xs flex items-center gap-2">
            Sign in with Google <FcGoogle />
          </Button>
          <div className="absolute top-4 right-4">
            <ModeToggle />
          </div>
        </CardContent>
        <BorderBeam size={150} duration={12} delay={9} />
      </Card>
    </form>
  );
}
