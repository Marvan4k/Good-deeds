"use client";

import { useState } from "react";
import { register } from "@/shared/api/auth";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setToken } from "@/shared/store/authSlice";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleRegister = async () => {
    const data = await register(email, password, userName);
    
    if (data.access_token) {
    dispatch(setToken(data.access_token));
    
    localStorage.setItem(
      'token',
      data.access_token
    );            
    router.push('/dashboard');
    }
  };

  return (
    <div>
      <h1>Register</h1>

      <input
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="username"
        onChange={(e) => setUserName(e.target.value)}
      />

      <input
        placeholder="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>Create account</button>
    </div>
  );
}