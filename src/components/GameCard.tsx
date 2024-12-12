'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { BorderBeam } from './ui/border-beam';

export default function Game({ game }: any) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);

  const next = () => {
    if (currentQuestionIndex < game.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const currentQuestion = game.questions[currentQuestionIndex];
  const options = JSON.parse(currentQuestion.options || '[]');
  const lastQuestion = currentQuestionIndex === game.questions.length - 1;

  return (
    <Card className="w-[400px] relative">
      <CardHeader>
        <CardTitle>Question {currentQuestionIndex + 1}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-lg">{currentQuestion.question}</p>

        <div className="flex flex-col gap-2 mb-4">
          {options.map((option: string, index: number) => (
            <Button key={index} variant="outline">
              {option}
            </Button>
          ))}
        </div>

        <div className="flex justify-between">
          <Button onClick={prev} disabled={currentQuestionIndex === 0}>
            Previous
          </Button>
          <Button onClick={next} disabled={lastQuestion}>
            {lastQuestion ? 'Submit' : 'Next'}
          </Button>
        </div>
      </CardContent>
      <BorderBeam />
    </Card>
  );
}
