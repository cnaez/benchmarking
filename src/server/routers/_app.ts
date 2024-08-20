import { z } from "zod";
import { procedure, router } from "../trpc";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const appRouter = router({
  getAllBenchmarks: procedure.query(async ({ input }) => {
    return await prisma.benchmark.findMany();
  }),
  getBenchmarks: procedure
    .input(z.object({ metric: z.string() }))
    .query(async ({ input }) => {
      return await prisma.benchmark.findMany({
        where: { metric: input.metric },
      });
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
