const API_URL = "http://localhost:3000";

export async function register(email : string, password : string, username: string){
    const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email, password, username}),
    })
    
    const data = await res.json();

    if(!res.ok){
        throw new Error(data.message || "Register failed");
    }

    return data;
} 

export async function login(email: string, password: string){
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email, password}),
    })

    const data = await res.json();

    if(!res.ok){
        throw new Error(data.message || "Login failed");
    }

    return data;
}

export async function getMe(){
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/auth/me`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (!res.ok) {
        throw new Error("Unauthorized");
    }

    return res.json();
}