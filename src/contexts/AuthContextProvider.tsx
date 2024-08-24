import { createContext, useState, useEffect, PropsWithChildren } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, User, UserCredential } from "firebase/auth";
import { auth } from "../service/firebase";

interface AuthContextType {
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  currentUser: User | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = () => {
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout}}>
      {loading ? (
        <div id="initial-loading">
          <p>Loading...</p>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;