"use client";

import { RootState } from "@/shared/store/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { addFriend, getFriendGoodDeeds, getFriends, removeFriend } from "./friendsApi";

type Friend = {
  id: number;
  username: string;
  email: string;
};

type GoodDeed = {
  id: number;
  title: string;
  description: string;
};

export default function FriendsSection() {
  const token = useSelector((state: RootState) => state.auth.token);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [username, setUsername] = useState("");
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
  const [friendDeeds, setFriendDeeds] = useState<GoodDeed[]>([]);
  const [loadingFriends, setLoadingFriends] = useState(false);
  const [loadingDeeds, setLoadingDeeds] = useState(false);

  useEffect(() => {
    const loadFriends = async () => {
      try {
        if (!token) {
          return;
        }

        setLoadingFriends(true);
        const data = await getFriends(token);
        setFriends(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingFriends(false);
      }
    };

    loadFriends();
  }, [token]);

  const handleAddFriend = async () => {
    try {
      if (!token || !username.trim()) {
        return;
      }

      const updatedUser = await addFriend(token, username.trim());
      setFriends(updatedUser.friends);
      setUsername("");
    } catch (error) {
      console.error(error);
    }
};

  const handleRemoveFriend = async (username: string) => {
    try {
      if (!token) {
        return;
      }

      await removeFriend(token, username);
      setFriends((prevFriends) => prevFriends.filter((friend) => friend.username !== username));

      if (selectedFriend === username) {
        setSelectedFriend(null);
        setFriendDeeds([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewDeeds = async (username: string) => {
    try {
      if (!token) {
        return;
      }

      setLoadingDeeds(true);
      const deeds = await getFriendGoodDeeds(token, username);
      setSelectedFriend(username);
      setFriendDeeds(deeds);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingDeeds(false);
    }
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-lg shadow-slate-200/40 ring-1 ring-slate-100 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-slate-950">Friends</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Добавляй друзей и смотри их добрые дела в одном стиле со своими.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            className="w-full max-w-sm rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            placeholder="Friend username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            onClick={handleAddFriend}
          >
            Add friend
          </button>
        </div>
      </div>

      <div className="mt-7 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-xl font-semibold text-slate-950">Friends list</h3>
            <p className="mt-1 text-sm text-slate-600">
              Твои друзья. Нажми «View deeds», чтобы увидеть их список добрых дел.
            </p>
          </div>

          <div className="grid gap-4">
            {loadingFriends ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-6 text-center text-slate-500">
                Loading friends...
              </div>
            ) : friends.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-6 text-center text-slate-500">
                No friends yet. Add someone to follow.
              </div>
            ) : (
              friends.map((friend) => (
                <div key={friend.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-base font-semibold text-slate-950">{friend.username}</p>
                      <p className="text-sm text-slate-500">{friend.email}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                        onClick={() => handleViewDeeds(friend.username)}
                      >
                        View deeds
                      </button>
                      <button
                        className="rounded-full border border-rose-300 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-100"
                        onClick={() => handleRemoveFriend(friend.username)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-xl font-semibold text-slate-950">Friend's deeds</h3>
            <p className="mt-1 text-sm text-slate-600">
              Просмотр списка добрых дел выбранного друга.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            {selectedFriend ? (
              <>
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{selectedFriend}</p>
                    <h4 className="text-2xl font-semibold text-slate-950">Their good deeds</h4>
                  </div>
                  <button
                    className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                    onClick={() => {
                      setSelectedFriend(null);
                      setFriendDeeds([]);
                    }}
                  >
                    Clear view
                  </button>
                </div>

                {loadingDeeds ? (
                  <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-slate-500">
                    Loading deeds...
                  </div>
                ) : friendDeeds.length === 0 ? (
                  <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-slate-500">
                    No deeds found for this friend.
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {friendDeeds.map((deed) => (
                      <div key={deed.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                        <h5 className="text-lg font-semibold text-slate-950">{deed.title}</h5>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{deed.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500">
                Select a friend to view their deeds.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
