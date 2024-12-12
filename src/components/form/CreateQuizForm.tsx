'use client';
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import axios from 'axios';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { BorderBeam } from '../ui/border-beam';
import { createQuizSchema } from '@/schemas/createQuizSchema';
import { useRouter } from 'next/navigation';
import { FormInput } from 'lucide-react';
import LoadingQuestions from '../LoadingQuestions';

type FormInput = z.infer<typeof createQuizSchema>;

export default function CreateQuizForm() {
  const router = useRouter();
  const [finishedLoading, setFinishedLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const form = useForm<FormInput>({
    resolver: zodResolver(createQuizSchema),
    defaultValues: {
      topic: '',
      type: 'mcq',
      amount: 1,
    },
  });

  const onSubmit = async (data: FormInput) => {
    setFinishedLoading(true);
    setProgress(0);
    try {
      const response = await axios.post('/api/game', data, {
        onUploadProgress: (progressEvent) => {
          const total = progressEvent.total || 1;
          const current = progressEvent.loaded;
          const newProgress = Math.round((current / total) * 100);

          setProgress(newProgress);
        },
      });
      const gameId = response.data.gameId;

      console.log(response.data);

      if (form.getValues('type') === 'mcq') {
        router.push(`/play/mcq/${gameId}`);
      } else {
        router.push(`/play/true_false/${gameId}`);
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setFinishedLoading(false);
    }
  };

  if (finishedLoading) {
    return <LoadingQuestions progress={progress} />;
  }

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Card className="relative overflow-hidden max-w-4xl w-full">
        <CardHeader className="flex flex-col justify-center items-center ">
          <CardTitle className="text-sm">Generate AI-Powered Quiz</CardTitle>
          <CardDescription className="text-xs">Challenge yourself with quizzes crafted by AI</CardDescription>
        </CardHeader>
        <BorderBeam />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4">
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Topic</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter quiz topic" {...field} className="text-xs" />
                  </FormControl>
                  <FormDescription className="text-xs">Enter a topic for the quiz (4-50 characters).</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Type</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={(value) => field.onChange(value)}>
                      <SelectTrigger className="text-xs">
                        <SelectValue placeholder="Select quiz type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mcq" className="text-xs">
                          Multiple Choice
                        </SelectItem>
                        <SelectItem value="true_false" className="text-xs">
                          True or False
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Amount</FormLabel>
                  <FormControl>
                    <Input value={field.value} onChange={(e) => field.onChange(Number(e.target.value))} className="text-xs" />
                  </FormControl>
                  <FormDescription className="text-xs">Choose the number of questions (1-10).</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full text-xs">
              Generate
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}
