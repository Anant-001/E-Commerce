import { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import {
    collection,
    onSnapshot,
    deleteDoc,
    doc,
    addDoc,
    getDocs,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Wishlist = () => {
    const [user] = useAuthState(auth);
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch wishlist from Firestore
    useEffect(() => {
        if (!user) return;
        const ref = collection(db, "wishlists", user.uid, "items");
        const unsub = onSnapshot(ref, (snapshot) => {
            const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setWishlist(items);
            setLoading(false);
        });

        return () => unsub();
    }, [user]);

    const handleRemove = async (id) => {
        await deleteDoc(doc(db, "wishlists", user.uid, "items", id));
        toast.success("Removed from wishlist");
    };

    const handleAddToCart = async (item) => {
        const cartRef = collection(db, "carts", user.uid, "items");
        const cartItems = await getDocs(cartRef);
        const exists = cartItems.docs.find((doc) => doc.data().id === item.id);

        if (exists) {
            // Update quantity logic could go here
            return;
        }

        await addDoc(cartRef, {
            ...item,
            quantity: 1,
        });

        await handleRemove(item.id); // Remove from wishlist after adding to cart
    };

    const moveAllToCart = async () => {
        const cartRef = collection(db, "carts", user.uid, "items");
        const batch = wishlist.map(async (item) => {
            await addDoc(cartRef, {
                ...item,
                quantity: 1,
            });
            await deleteDoc(doc(db, "wishlists", user.uid, "items", item.id));
        });
        await Promise.all(batch);
        toast.success("Moved all items to cart");
    };

    if (!user) return <div className="p-6 text-center">Please login to view wishlist.</div>;

    return (
        <div className="max-w-screen-xl mx-auto px-4 py-10">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Wishlist ({wishlist.length})</h2>
                {wishlist.length > 0 && (
                    <button
                        onClick={moveAllToCart}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Move All To Bag
                    </button>
                )}
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : wishlist.length === 0 ? (
                <p className="text-gray-500">Your wishlist is empty.</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {wishlist.map((item) => (
                        <div key={item.id} className="border p-4 rounded shadow-sm relative">
                            <button
                                onClick={() => handleRemove(item.id)}
                                className="absolute top-2 right-2 text-red-500 text-xl"
                            >
                                🗑
                            </button>
                            <img
                                src={item.thumbnail}
                                alt={item.title}
                                className="w-full h-40 object-contain mb-3 cursor-pointer"
                                onClick={() => navigate(`/product/${item.id}`)}
                            />
                            <h3 className="text-sm font-semibold truncate">{item.title}</h3>
                            <div className="text-red-600 font-bold text-sm">
                                ₹{item.price * 100}
                            </div>
                            <div className="text-gray-500 line-through text-xs">
                                ₹{item.price * 110}
                            </div>
                            <button
                                onClick={() => handleAddToCart(item)}
                                className="mt-3 w-full bg-black text-white py-1 text-sm rounded hover:bg-gray-800"
                            >
                                Add To Cart
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
