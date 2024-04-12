"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import useUserStore from "@/stores/user-store";

const AuthChangeListener: React.FC = () => {
  const { user } = useUser();
  const { setUser, clearUser } = useUserStore();

  useEffect(() => {
    if (user) {
      setUser(user);
    } else {
      clearUser();
    }
  }, [user, setUser, clearUser]);

  return null;
};

export default AuthChangeListener;
