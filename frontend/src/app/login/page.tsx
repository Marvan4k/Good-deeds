"use client"

import { login } from "@/shared/api/auth";
import { setToken } from "@/shared/store/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/navigation';

export default function LoginPage(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const router = useRouter();
    
    const handleLogin = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await login(email, password);
            
            if (data.access_token) {
                dispatch(setToken(data.access_token));

                localStorage.setItem(
                    'token',
                    data.access_token
                );

                router.push('/dashboard');
            }
        } catch (err) {
            if(err instanceof Error){
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
        <h1>Login</h1>

        <input
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />

        <input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>{loading ? "Loading..." : "Login"}</button>

        {error && (
            <p>{error}</p>
        )}
        </div>
    );
}