import React from "react";

// Custom hook to calculate progress width class
export const useVerticleProgress = () => {
  const calculateProgressPercentage = () => {
    // Replace the following with your actual logic to calculate the progress percentage
    const progressPercentage = 50; // Example: 50%
    return progressPercentage;
  };

  const getProgressBottomClass = (percentage: number) => {
    // Mapping progress percentage to Tailwind's bottom classes
    if (percentage <= 0) return "bottom-full";
    if (percentage <= 10) return "bottom-11/12";
    if (percentage <= 20) return "bottom-5/6";
    if (percentage <= 25) return "bottom-3/4";
    if (percentage <= 30) return "bottom-2/3";
    if (percentage <= 40) return "bottom-7/12";
    if (percentage <= 50) return "bottom-1/2";
    if (percentage <= 60) return "bottom-5/12";
    if (percentage <= 70) return "bottom-1/3";
    if (percentage <= 75) return "bottom-1/4";
    if (percentage <= 80) return "bottom-1/6";
    if (percentage <= 90) return "bottom-1/12";
    return "bottom-0";
  };

  const progressPercentage = calculateProgressPercentage();
  return getProgressBottomClass(progressPercentage);
};
