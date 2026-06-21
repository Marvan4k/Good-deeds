const API_URL = "http://localhost:3000";

export async function getProfile(
    token: string,
) {
    const res = await fetch(`${API_URL}/auth/me`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!res.ok) {
        throw new Error(
            "Cannot load profile",
        );
    }

    return res.json();
}

export async function updateProfile(
    token: string,
    username: string,
    email: string,
) {
    const res = await fetch(`${API_URL}/users/me`,
        {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                email,
            }),
        }
    );

    if (!res.ok) {
        throw new Error(
            "Cannot update profile",
        );
    }

    return res.json();
}

export async function deleteProfile(
    token: string,
) {
    const res = await fetch(`${API_URL}/users/me`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!res.ok) {
        throw new Error(
            "Cannot delete profile",
        );
    }

    return res.json();
}