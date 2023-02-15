import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const dayRouter = createTRPCRouter({
  day: protectedProcedure.input(
    z.object({
      year: z.number(),
      month: z.number(),
      day: z.number(),
    })
  ).query((input) => {

  })
});


  
