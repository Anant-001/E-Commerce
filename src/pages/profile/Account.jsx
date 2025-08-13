import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

const Account = () => {
    const [user] = useAuthState(auth);
    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (user) {
            const fetchProfile = async () => {
                const userRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists()) {
                    setProfile(userSnap.data());
                }
                setLoading(false);
            };
            fetchProfile();
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        setSaving(true);
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, profile);
        setSaving(false);
        alert("Profile updated successfully!");
    };

    if (loading) return <div className="p-6">Loading...</div>;

    return (
        <div className="p-6 max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <aside className="w-full md:w-1/3">
                <div className="border rounded p-4 space-y-4 text-sm font-medium">
                    <div>
                        <h3 className="text-red-500 font-bold">Manage My Account</h3>
                        <ul className="ml-2 mt-2 space-y-2">
                            <li className="text-black">My Profile</li>
                            <li className="text-gray-500">Address Book</li>
                            <li className="text-gray-500">My Payment Options</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-black">My Orders</h3>
                        <ul className="ml-2 mt-2 space-y-2">
                            <li className="text-gray-500">My Returns</li>
                            <li className="text-gray-500">My Cancellations</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-black">My Wishlist</h3>
                    </div>
                </div>
            </aside>

            {/* Form Section */}
            <section className="w-full md:w-2/3">
                <div className="border rounded p-6">
                    <h2 className="text-lg font-bold text-red-500 mb-4">Edit Your Profile</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 text-sm">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={profile.firstName}
                                onChange={handleChange}
                                className="border w-full px-3 py-2 rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={profile.lastName}
                                onChange={handleChange}
                                className="border w-full px-3 py-2 rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={profile.email}
                                disabled
                                className="border w-full px-3 py-2 rounded bg-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={profile.address}
                                onChange={handleChange}
                                className="border w-full px-3 py-2 rounded"
                            />
                        </div>
                    </div>

                    {/* Password placeholders (optional static) */}
                    <div className="mt-6">
                        <h3 className="font-medium mb-2">Password Changes</h3>
                        <div className="space-y-3">
                            <input type="password" placeholder="Current Password" className="border w-full px-3 py-2 rounded" disabled />
                            <input type="password" placeholder="New Password" className="border w-full px-3 py-2 rounded" disabled />
                            <input type="password" placeholder="Confirm New Password" className="border w-full px-3 py-2 rounded" disabled />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-4 mt-6">
                        <button className="border px-4 py-2 rounded text-sm hover:bg-gray-100">
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
                        >
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Account;
