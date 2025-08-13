import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase.js";
import { onAuthStateChanged } from "firebase/auth";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserId(user.uid);

                const q = query(collection(db, "orders"), where("userId", "==", user.uid));
                const querySnapshot = await getDocs(q);

                const fetchedOrders = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setOrders(fetchedOrders);
            }
        });

        return () => unsubscribe();
    }, []);

    if (!userId) return <p>Loading or not logged in...</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">My Orders</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <ul className="space-y-4">
                    {orders.map(order => (
                        <li key={order.id} className="border p-4 rounded shadow-sm">
                            <p><strong>Product:</strong> {order.productName}</p>
                            <p><strong>Date:</strong> {order.date}</p>
                            <p><strong>Status:</strong> {order.status}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Orders;