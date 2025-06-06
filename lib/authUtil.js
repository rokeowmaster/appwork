import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      unsubscribe(); // clean up the listener
      resolve(user);
    }, reject);
  });
};
