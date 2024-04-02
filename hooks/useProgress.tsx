// Custom hook to calculate progress width class
export const useProgress = () => {
  const calculateProgressPercentage = () => {
    // Replace the following with your actual logic to calculate the progress percentage
    const progressPercentage = 50; // Example: 50%
    return progressPercentage;
  };

  const getProgressWidthClass = (percentage: number) => {
    if (percentage <= 0) return "w-0";
    if (percentage <= 10) return "w-1/12";
    if (percentage <= 20) return "w-1/6";
    if (percentage <= 25) return "w-1/4";
    if (percentage <= 30) return "w-1/3";
    if (percentage <= 40) return "w-5/12";
    if (percentage <= 50) return "w-1/2";
    if (percentage <= 60) return "w-7/12";
    if (percentage <= 70) return "w-2/3";
    if (percentage <= 75) return "w-3/4";
    if (percentage <= 80) return "w-5/6";
    if (percentage <= 90) return "w-11/12";
    return "w-full";
  };

  const progressPercentage = calculateProgressPercentage();
  return getProgressWidthClass(progressPercentage);
};
