"use client";

import { onActiveEventAndActivityChange } from "@/services/firebaseService";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

function EventQueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = onActiveEventAndActivityChange(() => {
      queryClient.refetchQueries();
    });
    return () => unsubscribe();
  }, [queryClient]);

  return <>{children}</>;
}

export default EventQueryProvider;
