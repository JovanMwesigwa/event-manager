"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  color?: "primary" | "paused" | "active";
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, color = "primary", ...props }, ref) => {
  const backgroundColor = {
    primary: "bg-green-500",
    paused: "bg-yellow-500",
    active: "bg-green-500",
  }[color];

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={`relative h-4 w-full overflow-hidden rounded-full bg-neutral-200 ${className}`}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={`h-full transition-all ${backgroundColor}`}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
