"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import { AuthUser, LoginCredentials } from "@/types/auth";
import { loginUser } from "@/services/authService";

interface AuthContextType {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (credentials: LoginCredentials) => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await loginUser(credentials);

      const user: AuthUser = {
        id: response.id,
        username: response.username,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName,
        gender: response.gender,
        image: response.image,
      };

      setUser(user);
      setAccessToken(response.accessToken);

      // Store authentication data for API requests and session protection
      localStorage.setItem(
        "auth_user",
        JSON.stringify(user)
      );

      localStorage.setItem(
        "auth_token",
        response.accessToken
      );

      // Cookie is used by the Next.js proxy for route protection
      document.cookie =
        `auth_token=${response.accessToken}; path=/; max-age=86400`;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);

    // Clear stored authentication data
    localStorage.removeItem("auth_user");
    localStorage.removeItem("auth_token");

    // Clear authentication cookie
    document.cookie =
      "auth_token=; path=/; max-age=0";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated: Boolean(user && accessToken),
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}