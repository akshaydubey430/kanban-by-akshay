
import { db } from "./config";
import { serverTimestamp } from "firebase/firestore";

/** small helper to create a timestamp when writing docs */
export const now = () => serverTimestamp();
