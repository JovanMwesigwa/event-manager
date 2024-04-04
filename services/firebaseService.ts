import { ref, set } from "firebase/database";
import database from "@/firebase/firebaseConfig"; // Import your configured database instance

interface TimerData {
  activityId: string;
  startTime: number;
  duration: number;
  paused: boolean;
}

/**
 * Adds a timer document to Firebase Realtime Database and returns the reference.
 * @param activityId The ID of the activity for which the timer is created.
 * @param duration Duration of the timer in seconds.
 * @param paused Indicates whether the timer is initially paused.
 * @returns A promise resolving to the reference of the newly created timer.
 */
export async function addTimer(
  activityId: number,
  duration: number,
  paused: boolean
): Promise<void> {
  // Use the imported database instance
  return set(ref(database, "timers/" + activityId), {
    startTime: Date.now(),
    duration,
    paused,
  });
}

// Create a pauseTimer function that updates the paused field of the timer document
// in the Realtime Database.
/**
 * Pauses or resumes a timer in Firebase Realtime Database.
 * @param activityId The ID of the activity for which the timer is paused or resumed.
 * @param paused Indicates whether the timer should be paused or resumed.
 */
export async function pauseTimer(
  activityId: string,
  paused: boolean
): Promise<void> {
  // Use the imported database instance
  return set(ref(database, `timers/${activityId}/paused`), paused);
}
