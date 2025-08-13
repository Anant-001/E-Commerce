import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase.js";
import { onAuthStateChanged } from "firebase/auth";

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserId(user.uid);

                const q = query(collection(db, "reviews"), where("userId", "==", user.uid));
                const querySnapshot = await getDocs(q);

                const fetchedReviews = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setReviews(fetchedReviews);
            }
        });

        return () => unsubscribe();
    }, []);

    if (!userId) return <p>Loading or not logged in...</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">My Reviews</h2>
            {reviews.length === 0 ? (
                <p>No reviews found.</p>
            ) : (
                <ul className="space-y-4">
                    {reviews.map(review => (
                        <li key={review.id} className="border p-4 rounded shadow-sm">
                            <p><strong>Product:</strong> {review.productName}</p>
                            <p><strong>Review:</strong> {review.text}</p>
                            <p><strong>Rating:</strong> {review.rating}/5</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Reviews;