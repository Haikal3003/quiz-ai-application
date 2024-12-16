'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { BorderBeam } from './ui/border-beam';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Game({ game }: any) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState<number>(0);
  const [selectedOptions, setSelectedOptions] = React.useState<(string | null)[]>(() => Array(game.questions.length).fill(null));

  const router = useRouter();

  const currentQuestion = game.questions[currentQuestionIndex];
  const options = JSON.parse(currentQuestion.options || '[]');
  const lastQuestion = currentQuestionIndex === game.questions.length - 1;

  const selectOption = async (option: string) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[currentQuestionIndex] = option;
    setSelectedOptions(updatedOptions);

    try {
      const response = await axios.post('/api/checkAnswer', {
        questionId: currentQuestion.id,
        userInput: option,
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

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

  const submitQuiz = async () => {
    try {
      const response = await axios.post('/api/endQuiz', { gameId: game.id });

      if (response) {
        console.log(response.data);
        router.push(`/result/${response.data.gameId}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="w-[400px] relative overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xs ">
          <span>Question {currentQuestionIndex + 1}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-base">{currentQuestion.question}</p>

        <div className="flex flex-col gap-2 mb-4">
          {options.map((option: string, index: number) => (
            <button key={index} onClick={() => selectOption(option)} className={`p-2 rounded-md flex text-start text-sm border space-x-2 ${selectedOptions[currentQuestionIndex] === option ? 'bg-white text-black' : 'border-slate-800'}`}>
              <span>{String.fromCharCode(97 + index)}.</span>
              <p>{option}</p>
            </button>
          ))}
        </div>

        <div className="flex justify-between text-xs">
          {currentQuestionIndex === 0 ? (
            <div></div>
          ) : (
            <Button onClick={prev} className="text-xs">
              Previous
            </Button>
          )}

          {lastQuestion ? (
            <Button className="text-xs" onClick={submitQuiz}>
              Submit
            </Button>
          ) : (
            <Button onClick={next} className="text-xs">
              Next
            </Button>
          )}
        </div>
      </CardContent>
      <BorderBeam />
    </Card>
  );
}
