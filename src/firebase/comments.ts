import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./config";

/** Add a comment to a task */
export async function addComment(
  boardId: string,
  taskId: string,
  authorUid: string,
  text: string
) {
  const ref = await addDoc(
    collection(db, `boards/${boardId}/tasks/${taskId}/comments`),
    {
      authorUid,
      text,
      createdAt: serverTimestamp(),
    }
  );
  return ref.id;
}
