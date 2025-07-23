"use client";
import React, { createContext, useContext, useState } from "react";
import { IUser } from "../cautrucdata";

interface AuthContextType {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- DEMO MODE --- //
const mockUser: IUser = {
  _id: "user_demo_123",
  username: "demouser",
  email: "demo.user@example.com",
  account_status: 1,
  role: 0,
  fullname: "Người Dùng Demo",
  avatar: null,
  addresses: [
    {
      _id: "addr_demo_1",
      user_id: "user_demo_123",
      receiver_name: "Người Dùng Demo",
      phone: 123456789,
      address: "123 Đường Demo, Phường ABC, Quận XYZ, Thành phố HCM",
      updated_at: new Date(),
      created_at: new Date(),
    },
    {
      _id: "addr_demo_2",
      user_id: "user_demo_123",
      receiver_name: "Văn Phòng Demo",
      phone: 987654321,
      address: "456 Tòa nhà Demo, Đường DEF, Quận UVW, Thành phố Hà Nội",
      updated_at: new Date(),
      created_at: new Date(),
    },
  ],
  created_at: new Date(),
  updated_at: new Date(),
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(mockUser);

  const logout = () => {
    console.log("Logout disabled in demo mode.");
    // In demo mode, logout does nothing to keep the user logged in.
  };

  const refreshUser = async () => {
    console.log("User refresh disabled in demo mode.");
    // No need to refresh user data in demo mode
    return Promise.resolve();
  };

  // All useEffects related to localStorage are disabled for demo mode.

  return (
    <AuthContext.Provider value={{ user, setUser, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
