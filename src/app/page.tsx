import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from '@/lib/nextauth';
import { BorderBeam } from '@/components/ui/border-beam';
import { ModeToggle } from '@/components/ModeToggle';

export default function Home() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('google', { redirectTo: '/dashboard' });
      }}
      className="flex justify-center items-center w-full min-h-screen z-50"
    >
      <Card className="w-[350px] relative">
        <CardHeader>
          <CardTitle className="text-lg">QuizzyAI</CardTitle>
          <CardDescription className="text-sm">Signin to your google account</CardDescription>
        </CardHeader>
        <CardContent>
          <Button type="submit" className="text-xs">
            Signin with google <FcGoogle />
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
