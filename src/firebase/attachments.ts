import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { storage, db } from "./config";

/**
 * Uploads a File object to Firebase Storage under boards/{boardId}/attachments/{unique}
 * Saves a metadata doc in Firestore under boards/{boardId}/tasks/{taskId}/attachments
 */
export async function uploadAttachment(
  boardId: string,
  taskId: string,
  file: File,
  uploadedBy: string
) {
  const path = `boards/${boardId}/attachments/${Date.now()}_${file.name}`;
  const sRef = storageRef(storage, path);
  const uploadTask = await uploadBytesResumable(sRef, file);

  const url = await getDownloadURL(sRef);

  // Save metadata to Firestore
  const attRef = await addDoc(
    collection(db, `boards/${boardId}/tasks/${taskId}/attachments`),
    {
      name: file.name,
      url,
      size: file.size,
      contentType: file.type,
      uploadedBy,
      createdAt: serverTimestamp(),
    }
  );

  return { id: attRef.id, url };
}
