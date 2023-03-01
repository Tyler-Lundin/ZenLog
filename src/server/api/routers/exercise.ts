import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const exerciseRouter = createTRPCRouter({
  search: publicProcedure
    .input(z.object({ 
      text: z.string(),
      muscleTarget: z.string(),
      
    }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
});
