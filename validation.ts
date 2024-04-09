import { z } from "zod";

const ActivitySchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  host: z.string(),
  started: z.string().optional().nullable(),
  stopped: z.string().optional().nullable(),
  duration: z.string(),
  image: z.string().optional().nullable(),
  active: z.boolean().optional().default(false),
  isPaused: z.boolean().optional().default(true),
  isReset: z.boolean().optional().default(false),
  currentTime: z.string(),
  done: z.boolean().optional().default(false),
  eventId: z.number().int(),
});

export default ActivitySchema;
