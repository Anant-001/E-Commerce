// src/hooks/useWishlist.js
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
    doc,
    collection,
    setDoc,
    deleteDoc,
    onSnapshot,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const useWishlist = () => {
    const [user] = useAuthState(auth);
    const [wishlist, setWishlist] = useState([]);

    // Real-time listener to wishlist
    useEffect(() => {
        if (!user) {
            setWishlist([]);
            return;
        }

        const unsubscribe = onSnapshot(
            collection(db, "wishlist", user.uid, "items"),
            (snapshot) => {
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setWishlist(data);
            }
        );

        return () => unsubscribe();
    }, [user]);

    // Check if a product is wishlisted
    const isWishlisted = (productId) => {
        return wishlist.some((item) => item.id === String(productId));
    };

    // Add product to wishlist
    const addToWishlist = async (product) => {
        if (!user) return;

        const ref = doc(db, "wishlist", user.uid, "items", String(product.id));
        await setDoc(ref, product);
    };

    // Remove product from wishlist
    const removeFromWishlist = async (productId) => {
        if (!user) return;

        const ref = doc(db, "wishlist", user.uid, "items", String(productId));
        await deleteDoc(ref);
    };

    // Toggle wishlist (used for ❤️ click)
    const toggleWishlist = (product) => {
        if (isWishlisted(product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    return {
        wishlist,
        isWishlisted,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
    };
};

export default useWishlist;
