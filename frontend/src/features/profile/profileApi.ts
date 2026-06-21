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

export async function changePassword(
    token: string,
    oldPassword: string,
    newPassword: string,
) {
    const res = await fetch(`${API_URL}/users/me/password`,
        {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                oldPassword,
                newPassword,
            }),
        }
    );

    if (!res.ok) {
        const data = await res.json();

        throw new Error(
            data.message || "Cannot change password"
        );
    }

    return res.json();
}