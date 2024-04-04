import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

// Listen to inserts
export const getTimerEvent = supabase
  .channel("schema-db-changes")
  .on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
    },
    (payload) => {
      console.log(payload);
      return payload;
    }
  )
  .subscribe();
