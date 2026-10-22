import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { getPresignedUploadUrl } from "@acme/storage";

import { createTRPCRouter, protectedProcedure } from "../trpc";

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "application/json",
  "text/plain",
] as const;

export const storageRouter = createTRPCRouter({
  getUploadUrl: protectedProcedure
    .input(
      z.object({
        filename: z
          .string()
          .trim()
          .min(1)
          .max(100),
        contentType: z.string().refine(
          (type) => (ALLOWED_MIME_TYPES as readonly string[]).includes(type),
          { message: "Unsupported file type" },
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { filename, contentType } = input;

      // Sanitize filename to prevent directory traversal and special chars
      const sanitizedFilename = filename
        .replace(/[^a-zA-Z0-9._-]/g, "_")
        .replace(/\.+/g, ".");

      if (!sanitizedFilename || sanitizedFilename === ".") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid filename",
        });
      }

      // Scope key by user ID and timestamp to guarantee collision and overwrite resistance
      const scopedKey = `uploads/${ctx.session.user.id}/${Date.now()}-${sanitizedFilename}`;
      const { url, key } = await getPresignedUploadUrl(scopedKey, contentType);
      return { url, key };
    }),
});
