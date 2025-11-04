import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "./config";
import { serverTimestamp } from "firebase/firestore";

/**
 * Add or update a member in /boards/{boardId}/members/{uid}
 * role: 'owner' | 'editor' | 'viewer'
 */
export async function addOrUpdateMember(
  boardId: string,
  uid: string,
  role: "owner" | "editor" | "viewer" = "editor"
) {
  const ref = doc(db, `boards/${boardId}/members/${uid}`);
  await setDoc(ref, { role, joinedAt: serverTimestamp() }, { merge: true });
}

/** Remove member */
export async function removeMember(boardId: string, uid: string) {
  const ref = doc(db, `boards/${boardId}/members/${uid}`);
  await deleteDoc(ref);
}

/** Check role for a specific member */
export async function getMember(boardId: string, uid: string) {
  const ref = doc(db, `boards/${boardId}/members/${uid}`);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}
