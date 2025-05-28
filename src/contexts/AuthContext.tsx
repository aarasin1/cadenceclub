// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { User as FirebaseUser } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { getMember } from "../services/MemberService";
import type { Member } from "../models/Member";

interface AuthContextType {
  firebaseUser: FirebaseUser | null;
  member: Member | null;
  loading: boolean; // true while auth or member is loading
}

const AuthContext = createContext<AuthContextType>({
  firebaseUser: null,
  member: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to auth state
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      if (user) {
        try {
          // Fetch your domain Member record
          const m = await getMember(user.uid);
          setMember(m);
        } catch {
          // if they don’t exist in your members collection,
          // you can choose to redirect them to a signup flow,
          // or just clear member so NavBar shows “Login”
          setMember(null);
        }
      } else {
        setMember(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ firebaseUser, member, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
