import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getUserData } from "../utils/getUserData";
import { supabase } from "../supabaseClient";

export type User = {
  id: any;
  first_name: any;
  last_name: any;
  display_name: any;
  created_at: any;
  avatar_url: string | null;
  email: string | null;
  level: string | null;
  points: number;
  streak: number;
} | null;

interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);

  const refreshUser = async () => {
    const userData = await getUserData();
    if (userData) {
      setUser({
        ...userData,
        points: userData.points ?? 0,
        streak: userData.streak ?? 0,
      });
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, refreshUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
