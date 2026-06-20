"use client";

import { RootState } from "@/shared/store/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { addFriend, getFriends, removeFriend } from "./friendsApi";

type Friend = {
    id: number;
    username: string;
    email: string;
};

export default function FriendsSection() {
    const token = useSelector((state: RootState) => state.auth.token);
    const [friends, setFriends] = useState<Friend[]>([]);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const loadFriends = async () => {
        try {
            if (!token) {
                return;
            }
            
            const data =await getFriends(token);

            setFriends(data);

        } catch (error) {
            console.error(error);
        }
    };

    loadFriends();
    }, [token]);

    const handleAddFriend =
    async () => {
        try {
            if (!token) {
                return;
            }

            const updatedUser = await addFriend(token,username);
            setFriends(updatedUser.friends);
            setUsername("");

        } catch (error) {
            console.error(error);
        }
    };

    const handleRemoveFriend =
    async (
        username: string,
    ) => {
        try {
            if (!token) {
                return;
            }

            await removeFriend(token,username);

            setFriends(
                friends.filter((friend) => friend.username !== username)
            );

        } catch (error) {
            console.error(error);
        }
    };

    return (
    <div>
        <h2>Friends</h2>

        <input
            placeholder="username"
            value={username}
            onChange={(e) =>
                setUsername(
                    e.target.value,
                )
            }
        />

        <button onClick={handleAddFriend}>
            Add friend
        </button>

        {friends.map((friend) => (
            <div key={friend.id}>
                <p>
                    {friend.username}
                </p>

                <button onClick={() => handleRemoveFriend(friend.username)}>
                    Remove
                </button>
            </div>
        ))}
    </div>
);
}