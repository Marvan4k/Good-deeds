const API_URL = "http://localhost:3000";

export async function getFriends(
    token: string,
) {
    const res = await fetch(`${API_URL}/users/friends`, 
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!res.ok) {
        throw new Error(
            "Cannot load friends",
        );
    }

    return res.json();
}

export async function addFriend(
    token: string,
    username: string,
) {
    const res = await fetch(`${API_URL}/users/friends/${username}`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!res.ok) {
        throw new Error(
            "Cannot add friend",
        );
    }

    return res.json();
}

export async function removeFriend(
    token: string,
    username: string,
) {
    const res = await fetch(`${API_URL}/users/friends/${username}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!res.ok) {
        throw new Error(
            "Cannot remove friend",
        );
    }

    return res.json();
}