// src/services/AuthService.ts
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from "firebase/auth";
import type { User } from "firebase/auth";
import { app } from "../firebaseConfig";

const auth = getAuth(app);

export const AuthService = {
  signIn: (email: string, password: string): Promise<User> =>
    signInWithEmailAndPassword(auth, email, password).then((cred) => cred.user),

  signUp: (email: string, password: string): Promise<User> =>
    createUserWithEmailAndPassword(auth, email, password).then(
      (cred) => cred.user
    ),

  signOut: (): Promise<void> => firebaseSignOut(auth),

  onAuthStateChanged: (callback: (user: User | null) => void) =>
    onAuthStateChanged(auth, callback),
};
