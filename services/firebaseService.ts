import { get, onValue, ref, set, update } from "firebase/database";
import database from "@/firebase/firebaseConfig"; // Import your configured database instance

/**
 * Adds a timer document to Firebase Realtime Database and returns the reference.
 * @param activityId The ID of the activity for which the timer is created.
 * @param duration Duration of the timer in seconds.
 * @param paused Indicates whether the timer is initially paused.
 * @returns A promise resolving to the reference of the newly created timer.
 */
export async function addTimer(
  activityId: string,
  duration: number,
  paused: boolean
): Promise<void> {
  return set(ref(database, "timers/" + activityId), {
    startTime: Date.now(),
    duration,
    paused,
    pausedAt: null, // Initialize pausedAt as null when creating the timer
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
  const timerRef = ref(database, `timers/${activityId}`);

  if (paused) {
    // Set the pausedAt time to the current timestamp when pausing
    const now = Date.now();

    return update(timerRef, {
      paused: true,
      pausedAt: now,
    });
  } else {
    // Get the current timer data to calculate the new startTime based on pausedAt
    const snapshot = await get(timerRef);
    if (snapshot.exists()) {
      const timer = snapshot.val();

      if (timer.pausedAt) {
        const pausedDuration = Date.now() - timer.pausedAt;
        const newStartTime = timer.startTime + pausedDuration;

        // When resuming, update startTime and clear pausedAt
        return update(timerRef, {
          paused: false,
          startTime: newStartTime,
          pausedAt: null,
        });
      }
    }
  }
}

// get timer data from the Realtime Database.
/**
 * Retrieves timer data for a specific activity from Firebase Realtime Database.
 * @param activityId The ID of the activity for which the timer data is retrieved.
 * @returns A promise resolving to the timer data.
 */
export async function getTimerData(activityId: string): Promise<any> {
  const snapshot = await get(ref(database, `timers/${activityId}`));
  return snapshot.val();
}

// Create an active document called active that saves the eventId and the activityId
// in the Realtime Database.
/**
 * Sets the active event and activity in Firebase Realtime Database.
 * @param eventId The ID of the event.
 * @param activityId The ID of the activity.
 */
export async function setActiveEventAndActivity(
  eventId: string,
  activityId: string
): Promise<void> {
  // Before first checking if the active eventId exists then just update the activityId
  const activeRef = ref(database, "active");
  const activeSnapshot = await get(activeRef);

  if (activeSnapshot.exists()) {
    return update(activeRef, {
      eventId,
      activityId,
      newPoll: false,
    });
  }

  // If active eventId doesn't exist, set the eventId and activityId
  return set(ref(database, "active"), {
    eventId,
    activityId,
    newPoll: false,
  });
}

// Create a function that listens for changes to the active document in the Realtime Database.
/**
 * Listens for changes to the active event and activity in Firebase Realtime Database.
 * @param callback A function to be called when the active event or activity changes.
 */
export function onActiveEventAndActivityChange(callback: (data: any) => void) {
  const activeRef = ref(database, "active");

  return onValue(activeRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
}

// Create a function that deletes the timer document from the Realtime Database.
/**
 * Deletes a timer document from Firebase Realtime Database.
 * @param activityId The ID of the activity for which the timer is deleted.
 */
export async function deleteTimer(activityId: string): Promise<void> {
  return set(ref(database, `timers/${activityId}`), null);
}
