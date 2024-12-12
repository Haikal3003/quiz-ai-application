import { z } from 'zod';

export const createQuizSchema = z.object({
  topic: z
    .string()
    .min(4, {
      message: 'Topic must be at least 4 characters long',
    })
    .max(50, {
      message: 'Topic must be at most 50 characters long',
    }),
  type: z.enum(['mcq', 'true_false']),
  amount: z.union([z.number().min(1).max(10), z.undefined()]).transform((val) => (val === undefined ? 0 : val)),
});
