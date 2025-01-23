'use client';
import { BorderBeam } from '@/components/ui/border-beam';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import React from 'react';
import CircleResult from './CircleResult';
import { useRouter } from 'next/navigation';
import { GameResultProps } from '@/types/types';

export default function Result({ game }: GameResultProps) {
  if (!game) {
    return <div className="text-center text-red-500">Game not found</div>;
  }

  const totalCorrect = game.questions.filter((q) => q.isCorrect).length;
  const totalQuestions = game.questions.length;

  const [showQuestions, setShowQuestions] = React.useState(false);

  const toggleQuestions = () => {
    setShowQuestions((prevState) => !prevState);
  };

  const router = useRouter();

  return (
    <div className="w-auto min-h-screen flex flex-col justify-center items-center py-10">
      <Card className="relative overflow-hidden w-[300px]">
        <CardHeader>
          <div className="text-center">
            <h1 className="text-lg font-bold">{game.topic}</h1>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <CircleResult score={totalCorrect} total={totalQuestions} />
          </div>
          <div className="flex justify-between items-center">
            <Button onClick={toggleQuestions}>{showQuestions ? 'Hide' : 'View'}</Button>

            <Button onClick={() => router.push('/dashboard')}>Back</Button>
          </div>
        </CardContent>
        <BorderBeam />
      </Card>

      {showQuestions && (
        <div className="space-y-4 mt-8 w-full max-w-lg">
          {game.questions.map((question, index) => {
            let options: string[] = question.options;

            return (
              <Card key={question.id} className="p-4 relative overflow-hidden">
                <CardHeader>
                  <h2 className="text-base font-semibold mb-2">
                    {index + 1}. {question.question}
                  </h2>
                </CardHeader>
                <CardContent>
                  <ul className="mb-2 space-y-1">
                    {options.map((option, idx) => {
                      const isUserAnswer = option === question.userAnswer;
                      const isCorrectAnswer = option === question.answer;

                      let optionClass = 'p-2 rounded-md text-sm';
                      if (isCorrectAnswer) {
                        optionClass += ' bg-green-500';
                      } else if (isUserAnswer) {
                        optionClass += ' bg-red-500';
                      } else {
                        optionClass += ' bg-black/50';
                      }

                      return (
                        <li key={idx} className={optionClass}>
                          {String.fromCharCode(97 + idx)}. {option}
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
                <BorderBeam />
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
