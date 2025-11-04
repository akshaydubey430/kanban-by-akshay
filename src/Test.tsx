import React, { useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase/config";

export default function TestFirestore() {
  useEffect(() => {
    async function testWrite() {
      try {
        const docRef = await addDoc(collection(db, "test"), {
          message: "Hello Firestore from Akshay 🚀",
          createdAt: new Date(),
        });
        console.log("Document written with ID:", docRef.id);
      } catch (e) {
        console.error("Error adding document:", e);
      }
    }
    testWrite();
  }, []);

  return <h1>Testing Firestore...</h1>;
}
