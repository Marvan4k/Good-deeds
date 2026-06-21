import { RootState } from "@/shared/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, deleteProfile, getProfile, updateProfile } from "./profileApi";
import { logout } from "@/shared/store/authSlice";

type Profile = {
    id: number;
    username: string;
    email: string;
};

export default function ProfileSection(){
    const token = useSelector((state: RootState) =>state.auth.token);
    const dispatch = useDispatch();
    const router = useRouter();

    const [profile, setProfile] = useState<Profile | null>(null,);
    const [editing, setEditing] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");

    useEffect(() => {
        const loadProfile = async () => {
            try {
                if (!token) {
                    return;
                }
            const data = await getProfile(token);

            console.log(data);
            setProfile(data);

            setUsername(data.username);

            setEmail(data.email);

            } catch (error) {
                console.error(error);
            }
        };

        loadProfile();
    }, [token]);
    
    const handleSave = async () => {
        try {
            if (!token) {
                return;
            }

            const updated = await updateProfile(
                token,
                username,
                email,
            );

            setProfile(updated);
            setEditing(false);

        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Delete account?")) {
            return;
        }

        try {
            if (!token) {
                return;
            }

            await deleteProfile(
                token,
            );

            localStorage.removeItem(
                "token",
            );

            dispatch(logout());

            router.push(
                "/register",
            );

        } catch (error) {
            console.error(error);
        }
    };

    const handleChangePassword = async () => {
        try {
            if (!token) {
                return;
            }

            await changePassword(
                token,
                oldPassword,
                newPassword,
            );

            setPasswordMessage("Password updated");
            setOldPassword("");
            setNewPassword("");

        } catch (error) {
            if (
                error instanceof Error
            ) {
                setPasswordMessage(
                    error.message,
                );
            }
        }
    };

    return (
        <section className="mx-auto w-full max-w-5xl rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-lg shadow-slate-200/40 ring-1 ring-slate-100 sm:p-8">
            <div className="space-y-3">
                <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Profile</p>
                    <h2 className="text-3xl font-semibold text-slate-950">Account details</h2>
                </div>

                {profile ? (
                    <div className="space-y-6">
                        {editing ? (
                            <div className="grid gap-4 sm:grid-cols-2">
                                <input
                                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />

                                <input
                                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <div className="flex flex-wrap gap-3 sm:col-span-2">
                                    <button
                                        className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                                        onClick={handleSave}
                                    >
                                        Save
                                    </button>
                                    <button
                                        className="inline-flex rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                                        onClick={() => setEditing(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                                    <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Username</p>
                                    <p className="mt-2 text-lg font-medium text-slate-950">{profile.username}</p>
                                </div>
                                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                                    <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Email</p>
                                    <p className="mt-2 text-lg font-medium text-slate-950">{profile.email}</p>
                                </div>

                                <div className="flex flex-wrap gap-3 sm:col-span-2">
                                    <button
                                        className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                                        onClick={() => setEditing(true)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="inline-flex rounded-full bg-rose-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-rose-500"
                                        onClick={handleDelete}
                                    >
                                        Delete account
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
                            <div className="mb-6">
                                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Change password</p>
                                <h3 className="mt-2 text-xl font-semibold text-slate-950">Password settings</h3>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <input
                                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                                    type="password"
                                    placeholder="Current password"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />

                                <input
                                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                                    type="password"
                                    placeholder="New password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>

                            <div className="mt-6 flex flex-wrap items-center gap-3">
                                <button
                                    className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                                    onClick={handleChangePassword}
                                >
                                    Change password
                                </button>

                                {passwordMessage && (
                                    <p className="text-sm text-slate-600">{passwordMessage}</p>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-slate-500">
                        Loading profile...
                    </div>
                )}
            </div>
        </section>
    );
}