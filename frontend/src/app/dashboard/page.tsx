"use client";

import { createGoodDeed, deleteGoodDeed, getMyGoodDeeds, updateGoodDeed } from "@/features/good-deeds/goodDeedsApi";
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

export default function Dashboard() {
  const router = useRouter();
  const [deeds, setDeeds] = useState<GoodDeed[]>([]);
  const token = useSelector((state: RootState) =>state.auth.token);

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
        if(!token){
          return;
        }

        const deesData = await getMyGoodDeeds(token);

        setDeeds(deesData);
      } catch {
        router.push("/login");
      }
    }

    loadData();
  }, [router, token])
  
  const handleDelete = async (id: number) => {
    try {
      if(!token){
        return;
      }

      await deleteGoodDeed(id,token,)

      setDeeds(
        deeds.filter(
          (deed) => deed.id !== id,
        )
      ) 
    } catch (error) {
      console.error(error);
    }
  }

  const handleCreate = async () => {
    try{
      if (!token) {
        return;
      }

      const newDeed = await createGoodDeed(
        token,
        title,
        description
      )

      setDeeds([
        ...deeds,
        newDeed
      ])

      setTitle("");
      setDescription("");

      setShowCreateForm(false);
    } catch (error) {
      console.error(error);
    }
  }

  const startEditing = (deed: GoodDeed) => {
    setEditingId(deed.id);
    setEditTitle(deed.title);
    setEditDescription(deed.description,);
  };

  const handleUpdate = async () => {
    try {
      if (!token || !editingId) {
        return;
      }

      const updatedDeed =await updateGoodDeed(
        editingId,
        token,
        editTitle,
        editDescription,
      );

      setDeeds(deeds.map((deed) => deed.id === editingId ? updatedDeed : deed));
      setEditingId(null);
    } catch (error) {
        console.error(error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>My good deeds</h2>

      {showCreateForm && (
        <div>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <input
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
          />

          <button onClick={handleCreate}>
            Create
          </button>
        </div>
      )}

      <button onClick={() => setShowCreateForm(!showCreateForm)}>
        {showCreateForm ? "Cancel" : "Add deed"}
      </button>

      {deeds.map((deed: any) => (
        <div key={deed.id}>
          {editingId === deed.id ? (
            <div>
                <input
                    value={editTitle}
                    onChange={(e) =>
                      setEditTitle(
                        e.target.value
                      )
                    }
                />
                <input
                    value={editDescription}
                    onChange={(e) =>
                        setEditDescription(
                            e.target.value
                        )
                    }
                />
                <button onClick={handleUpdate}>
                  Save
                </button>

                <button onClick={() => setEditingId(null)}>
                  Cancel
                </button>
            </div>
        ) : (
          <>
              <h3>{deed.title}</h3>
              <p>{deed.description}</p>

              <button onClick={() => startEditing(deed)}>
                Edit
              </button>

              <button onClick={() => handleDelete(deed.id)}>
                Delete
              </button>
          </>
        )}
        </div>
      ))}
    </div>
  );
}