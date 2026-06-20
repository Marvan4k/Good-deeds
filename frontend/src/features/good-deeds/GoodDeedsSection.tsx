"use client";

import { createGoodDeed, deleteGoodDeed, getMyGoodDeeds, updateGoodDeed } from "./goodDeedsApi";
import { getMe } from "@/shared/api/auth";
import { RootState } from "@/shared/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type GoodDeed = {
  id: number;
  title: string;
  description: string;
};

export default function GoodDeedsSection() {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);
  const [deeds, setDeeds] = useState<GoodDeed[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        await getMe();
        if (!token) {
          return;
        }

        const deesData = await getMyGoodDeeds(token);
        setDeeds(deesData);
      } catch {
        router.push("/login");
      }
    };

    loadData();
  }, [router, token]);

  const handleDelete = async (id: number) => {
    try {
      if (!token) {
        return;
      }

      await deleteGoodDeed(id, token);
      setDeeds(deeds.filter((deed) => deed.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = async () => {
    try {
      if (!token) {
        return;
      }

      const newDeed = await createGoodDeed(token, title, description);
      setDeeds([...deeds, newDeed]);
      setTitle("");
      setDescription("");
      setShowCreateForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  const startEditing = (deed: GoodDeed) => {
    setEditingId(deed.id);
    setEditTitle(deed.title);
    setEditDescription(deed.description);
  };

  const handleUpdate = async () => {
    try {
      if (!token || editingId === null) {
        return;
      }

      const updatedDeed = await updateGoodDeed(editingId, token, editTitle, editDescription);
      setDeeds(deeds.map((deed) => (deed.id === editingId ? updatedDeed : deed)));
      setEditingId(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="mx-auto w-full max-w-5xl rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-lg shadow-slate-200/40 ring-1 ring-slate-100 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-slate-950">My good deeds</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Add, edit and remove deeds from your personal list. Changes are saved to the backend.
          </p>
        </div>

        <button
          className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          onClick={() => setShowCreateForm((value) => !value)}
        >
          {showCreateForm ? "Cancel" : "Add deed"}
        </button>
      </div>

      {showCreateForm && (
        <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button
            className="mt-4 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            onClick={handleCreate}
          >
            Create deed
          </button>
        </div>
      )}

      <div className="mt-8 grid gap-5">
        {deeds.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-600">
            No deeds yet. Create one to get started.
          </div>
        ) : (
          deeds.map((deed) => (
            <article key={deed.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              {editingId === deed.id ? (
                <div className="grid gap-4">
                  <input
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <input
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                  <div className="flex flex-wrap gap-3">
                    <button
                      className="inline-flex rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-500"
                      onClick={handleUpdate}
                    >
                      Save
                    </button>
                    <button
                      className="inline-flex rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-950">{deed.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{deed.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button
                        className="inline-flex rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                        onClick={() => startEditing(deed)}
                      >
                        Edit
                      </button>
                      <button
                        className="inline-flex rounded-full bg-rose-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-500"
                        onClick={() => handleDelete(deed.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              )}
            </article>
          ))
        )}
      </div>
    </section>
  );
}
