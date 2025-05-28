// src/contexts/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import type { User as FirebaseUser } from "firebase/auth";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { getMember } from "../services/MemberService";
import type { Member } from "../models/Member";

interface AuthContextType {
  firebaseUser: FirebaseUser | null;
  member: Member | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  firebaseUser: null,
  member: null,
  loading: true,
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

  // subscribe to auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      if (user) {
        try {
          const m = await getMember(user.uid);
          setMember(m);
        } catch {
          setMember(null);
        }
      } else {
        setMember(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // logout helper
  const logout = async () => {
    await signOut(auth);
    setMember(null);
    // firebaseUser will become null automatically via onAuthStateChanged
  };

  return (
    <AuthContext.Provider value={{ firebaseUser, member, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
