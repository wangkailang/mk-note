import { z } from "zod";

import { createTRPCContext, createTRPCRouter, protectedProcedure } from "../trpc";

export const noteRouter = createTRPCRouter({
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.note.findMany({
        where: {
          id: input.id,
        }
      });
    }),

    
  create: protectedProcedure
    .input(z.object({ title: z.string(), content: z.string(), topicId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.note.create({
        data: {
          title: input.title,
          content: input.content,
          topicId: input.topicId
        }
      })
    }),

    getAll: protectedProcedure
      .input(z.object({ topicId: z.string() }))
      .query(({ ctx, input }) => {
        return ctx.prisma.note.findMany({
          where: { topicId: input.topicId }
        })
      })

})