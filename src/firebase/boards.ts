import {
  collection,
  doc,
  setDoc,
  getDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";

/**
 * Create a new board and add the owner to members subcollection.
 * Returns boardId
 */
export async function createBoard(
  ownerUid: string,
  title: string,
  visibility: "private" | "team" | "public" = "private"
) {
  const boardRef = doc(collection(db, "boards")); // creates a new doc ref with random id
  const boardId = boardRef.id;
  await setDoc(boardRef, {
    title,
    ownerId: ownerUid,
    visibility,
    createdAt: serverTimestamp(),
  });

  // add owner as member
  await setDoc(doc(db, `boards/${boardId}/members/${ownerUid}`), {
    role: "owner",
    joinedAt: serverTimestamp(),
  });

  return boardId;
}

/** get board doc data */
export async function getBoard(boardId: string) {
  const ref = doc(db, "boards", boardId);
  const snap = await getDoc(ref);
  return snap.exists() ? { id: snap.id, ...(snap.data() as any) } : null;
}
