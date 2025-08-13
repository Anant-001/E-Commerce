import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase.js";
import { onAuthStateChanged } from "firebase/auth";

const Cancellations = () => {
    const [cancellations, setCancellations] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserId(user.uid);

                const q = query(collection(db, "cancellations"), where("userId", "==", user.uid));
                const querySnapshot = await getDocs(q);

                const fetchedCancellations = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setCancellations(fetchedCancellations);
            }
        });

        return () => unsubscribe();
    }, []);

    if (!userId) return <p>Loading or not logged in...</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">My Cancellations</h2>
            {cancellations.length === 0 ? (
                <p>No cancellations found.</p>
            ) : (
                <ul className="space-y-4">
                    {cancellations.map(cancel => (
                        <li key={cancel.id} className="border p-4 rounded shadow-sm">
                            <p><strong>Product:</strong> {cancel.productName}</p>
                            <p><strong>Reason:</strong> {cancel.reason}</p>
                            <p><strong>Date:</strong> {cancel.date}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Cancellations;
