import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ExploreProducts = () => {
    const [products, setProducts] = useState([]);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("https://dummyjson.com/products?limit=8&skip=20")
            .then((res) => setProducts(res.data.products))
            .catch((err) => console.error(err));
    }, []);

    const handleAddToCart = (product) => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existing = cart.find((item) => item.id === product.id);

        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        toast.success(`${product.title} added to cart!`);
    };

    const handleAddToWishlist = async (product) => {
        if (!user) return toast.error("Please login to add to wishlist");

        try {
            const docRef = doc(db, "wishlists", user.uid, "items", product.id.toString());
            await setDoc(docRef, product);
            toast.success("Added to Wishlist");
        } catch (err) {
            console.error(err);
            toast.error("Failed to add to Wishlist");
        }
    };

    return (
        <section className="py-10 px-4 max-w-screen-xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">💼 Explore Our Products</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white border rounded-lg p-4 hover:shadow-lg transition relative"
                    >
                        {/* Wishlist button */}
                        <button
                            onClick={() => handleAddToWishlist(product)}
                            className="absolute top-2 right-2 text-xl"
                        >
                            ❤️
                        </button>

                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-full h-40 object-contain mb-3"
                        />

                        <h3 className="text-sm font-semibold mb-1 truncate">{product.title}</h3>
                        <p className="text-red-600 text-sm font-medium">₹{product.price * 100}</p>
                        <p className="text-yellow-500 text-xs mb-2">⭐ {product.rating}</p>

                        <button
                            className="w-full bg-black text-white text-sm py-1 rounded hover:bg-gray-800"
                            onClick={() => handleAddToCart(product)}
                        >
                            Add to Cart
                        </button>

                        <button
                            onClick={() => navigate(`/product/${product.id}`)}
                            className="mt-2 w-full border text-sm py-1 rounded hover:bg-gray-100"
                        >
                            View Product
                        </button>
                    </div>
                ))}
            </div>

            <div className="text-center mt-8">
                <button className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">
                    View All Products
                </button>
            </div>
        </section>
    );
};

export default ExploreProducts;
