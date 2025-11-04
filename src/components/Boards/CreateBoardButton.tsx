import React from "react";
import { createBoard } from "../../firebase/boards";
import { useAuth } from "../auth/useAuth"; // your auth hook

export function CreateBoardButton() {
  const user = useAuth(); // returns current firebase user
  const create = async () => {
    if (!user) return;
    const id = await createBoard(user.uid, "New Study Board");
    // navigate to /board/{id} or open board
    console.log("created board", id);
  };
  return <button onClick={create}>Create Board</button>;
}
