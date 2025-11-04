import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./config";

/** Log an activity for audit trail */
export async function logActivity(
  boardId: string,
  actorUid: string,
  action: string,
  payload: any = {}
) {
  const ref = await addDoc(collection(db, `boards/${boardId}/activity`), {
    actorUid,
    action,
    payload,
    ts: serverTimestamp(),
  });
  return ref.id;
}
