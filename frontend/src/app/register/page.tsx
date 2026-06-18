"use client";

import { useState } from "react";
import { register } from "@/shared/api/auth";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const data = await register(email, password);
    console.log(data);
  };

  return (
    <div>
      <h1>Register</h1>

      <input
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
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