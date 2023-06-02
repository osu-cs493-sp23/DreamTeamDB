import React, { useEffect, useState } from "react";
import axios from "axios";
import { User } from '../types';

interface UserContextProps {
      user?: User | null;
      setUser?: React.Dispatch<React.SetStateAction<User | null>>;
      children?: React.ReactNode;
}


export const UserContext = React.createContext<UserContextProps>({
      user: null,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      setUser: () => {},
});

export const UserProvider: React.FC<UserContextProps> = ({ children }) => {
      const [user, setUser] = useState<User | null>(null);

      const fetchUserData = async (userId: string) => {

            if (!localStorage.getItem("token")) return;
            if (!userId) return;

            try {
                  const response = await axios.get<User>(`http://localhost:8000/api/users/${userId}`, {
                        headers: {
                              Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                  });
                  setUser(response.data);
            } catch (error) {
                  console.error("Error fetching user data:", error);
            }
      };

      useEffect(() => {
            const userId = localStorage.getItem("id");
            if (userId) fetchUserData(userId);
      }, []);

      return (
            <UserContext.Provider value={{ user, setUser }}>
                  {children}
            </UserContext.Provider>
      );
}
