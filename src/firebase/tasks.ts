import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";

/** Create a new task under /boards/{boardId}/tasks */
export async function createTask(
  boardId: string,
  task: {
    title: string;
    description?: string;
    status?: string;
    assigneeUid?: string | null;
    priority?: string;
    tags?: string[];
    dueDate?: string | null;
  }
) {
  const ref = await addDoc(collection(db, `boards/${boardId}/tasks`), {
    ...task,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

/** Update a task */
export async function updateTask(
  boardId: string,
  taskId: string,
  updates: any
) {
  const ref = doc(db, `boards/${boardId}/tasks/${taskId}`);
  await updateDoc(ref, { ...updates, updatedAt: serverTimestamp() } as any);
}

/** Delete a task */
export async function deleteTask(boardId: string, taskId: string) {
  await deleteDoc(doc(db, `boards/${boardId}/tasks/${taskId}`));
}
