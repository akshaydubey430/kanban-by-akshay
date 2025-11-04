import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./config";
import { now } from "./helpers";

/**
 * Create or update user profile in /users/{uid}
 */
export async function createOrUpdateUserProfile(user: {
  uid: string;
  email?: string | null;
  displayName?: string | null;
  photoURL?: string | null;
}) {
  const ref = doc(db, "users", user.uid);
  await setDoc(
    ref,
    {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || null,
      photoURL: user.photoURL || null,
      updatedAt: now(),
    },
    { merge: true }
  );
}

/**
 * Read user profile
 */
export async function getUserProfile(uid: string) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}
