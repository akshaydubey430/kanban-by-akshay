import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";

/** Add a column to a board */
export async function addColumn(boardId: string, title: string, order = 0) {
  const colRef = await addDoc(collection(db, `boards/${boardId}/columns`), {
    title,
    order,
    createdAt: serverTimestamp(),
  });
  return colRef.id;
}

/** Update column fields */
export async function updateColumn(
  boardId: string,
  colId: string,
  data: Partial<{ title: string; order: number }>
) {
  const ref = doc(db, `boards/${boardId}/columns/${colId}`);
  await updateDoc(ref, { ...data, updatedAt: serverTimestamp() } as any);
}

/** Delete column */
export async function deleteColumn(boardId: string, colId: string) {
  await deleteDoc(doc(db, `boards/${boardId}/columns/${colId}`));
}
