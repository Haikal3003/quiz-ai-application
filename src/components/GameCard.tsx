'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { BorderBeam } from './ui/border-beam';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { GameProps } from '@/types/types';

export default function Game({ game }: GameProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [selectedOptions, setSelectedOptions] = React.useState<(string | null)[]>(Array(game.questions.length).fill(null));

  const router = useRouter();

  const currentQuestion = game.questions[currentQuestionIndex];
  const options: string[] = currentQuestion.options || [];
  const isLastQuestion = currentQuestionIndex === game.questions.length - 1;

  const selectOption = async (option: string) => {
    setSelectedOptions((prev) => {
      const updatedOptions = [...prev];
      updatedOptions[currentQuestionIndex] = option;
      return updatedOptions;
    });

    try {
      await axios.post('/api/checkAnswer', {
        questionId: currentQuestion.id,
        userInput: option,
      });
    } catch (error) {
      console.error('Error checking answer:', error);
    }
  };

  const nextQuestion = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const submitQuiz = async () => {
    try {
      const response = await axios.post('/api/endQuiz', { gameId: game.id });

      if (response.data?.gameId) {
        router.push(`/result/${response.data.gameId}`);
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  return (
    <Card className="w-[400px] relative overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xs">
          Question {currentQuestionIndex + 1} of {game.questions.length}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-base">{currentQuestion.question}</p>

        <div className="flex flex-col gap-2 mb-4">
          {options.map((option, index) => (
            <button key={index} onClick={() => selectOption(option)} className={`p-2 rounded-md flex text-start text-sm border space-x-2 ${selectedOptions[currentQuestionIndex] === option ? 'bg-white text-black' : 'border-slate-800'}`}>
              <span>{String.fromCharCode(97 + index)}.</span>
              <p>{option}</p>
            </button>
          ))}
        </div>

        <div className="flex justify-between text-xs">
          {currentQuestionIndex > 0 && (
            <Button onClick={previousQuestion} className="text-xs">
              Previous
            </Button>
          )}

          {isLastQuestion ? (
            <Button onClick={submitQuiz} className="text-xs">
              Submit
            </Button>
          ) : (
            <Button onClick={nextQuestion} className="text-xs">
              Next
            </Button>
          )}
        </div>
      </CardContent>
      <BorderBeam />
    </Card>
  );
}
