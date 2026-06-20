const API_URL = "http://localhost:3000";

export async function getMyGoodDeeds(
    token: string,
) {
    const res = await fetch(`${API_URL}/good-deeds/my`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if(!res.ok){
        throw new Error(
            "Cannot load deeds",
        );
    }

    return res.json();
}

export async function deleteGoodDeed(
    id: number,
    token: string,
) {
    const res = await fetch(`${API_URL}/good-deeds/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

    if(!res.ok){
        throw new Error(
            "Cannot delete deed",
        );
    }

    return res.json();
}

export async function createGoodDeed(
    token: string,
    title: string,
    description: string,
) {
    const res = await fetch(`${API_URL}/good-deeds`,{
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });
    if (!res.ok) {
        throw new Error(
        "Cannot create deed"
        );
    }

    return res.json();
}

export async function updateGoodDeed(
    id: number,
    token: string,
    title: string,
    description: string,
) {
    const res = await fetch(
        `${API_URL}/good-deeds/${id}`,
        {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                description,
            }),
        }
    );

    if (!res.ok) {
        throw new Error(
            "Cannot update deed",
        );
    }

    return res.json();
}