import { z } from "zod";


// Quiz chapter data structure based on the API response
export const quizSessionSchema = z.object({
  id: z.string(),
  ipAddress: z.string(),
  date: z.string(), // YYYY-MM-DD format
  questionsAsked: z.array(z.number()), // chapter IDs
  currentQuestion: z.number().default(0),
  score: z.number().default(0),
  completed: z.boolean().default(false),
});

export const chapterSchema = z.object({
  id: z.number(),
  revelation_place: z.enum(["makkah", "madinah"]),
  revelation_order: z.number(),
  bismillah_pre: z.boolean(),
  name_simple: z.string(),
  name_complex: z.string(),
  name_arabic: z.string(),
  verses_count: z.number(),
  pages: z.array(z.number()).length(2),
  translated_name: z.object({
    language_name: z.string(),
    name: z.string(),
  }),
});

export const chaptersResponseSchema = z.object({
  chapters: z.array(chapterSchema),
});


export type Chapter = z.infer<typeof chapterSchema>;
export type ChaptersResponse = z.infer<typeof chaptersResponseSchema>;
export type QuizSession = z.infer<typeof quizSessionSchema>;