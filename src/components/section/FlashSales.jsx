import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

const FlashSales = () => {
    const [products, setProducts] = useState([]);
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const navigate = useNavigate();
    const [user] = useAuthState(auth);

    useEffect(() => {
        axios
            .get("https://dummyjson.com/products?limit=4")
            .then((res) => setProducts(res.data.products))
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        const target = new Date().getTime() + 3600 * 1000;
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = target - now;
            const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((distance / (1000 * 60)) % 60);
            const seconds = Math.floor((distance / 1000) % 60);
            if (distance < 0) {
                clearInterval(interval);
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
            } else {
                setTimeLeft({ hours, minutes, seconds });
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleAddToCart = (product) => {
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
        const index = existingCart.findIndex((item) => item.id === product.id);
        if (index !== -1) {
            existingCart[index].quantity += 1;
        } else {
            existingCart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(existingCart));
        toast.success(`${product.title} added to cart!`);
    };

    const handleAddToWishlist = async (product) => {
        if (!user) return toast.error("Login to add to wishlist");
        try {
            await setDoc(doc(db, "wishlists", user.uid, "items", `${product.id}`), product);
            toast.success("Added to wishlist");
        } catch (err) {
            console.error("Error adding to wishlist", err);
            toast.error("Failed to add to wishlist");
        }
    };

    return (
        <section className="py-10 px-4 max-w-screen-xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">🔥 Flash Sales</h2>
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-red-600 font-semibold">Ends In:</span>
                    <span className="bg-black text-white px-2 py-1 rounded">
            {String(timeLeft.hours).padStart(2, "0")}
          </span>
                    :
                    <span className="bg-black text-white px-2 py-1 rounded">
            {String(timeLeft.minutes).padStart(2, "0")}
          </span>
                    :
                    <span className="bg-black text-white px-2 py-1 rounded">
            {String(timeLeft.seconds).padStart(2, "0")}
          </span>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {products.map((item) => (
                    <div key={item.id} className="bg-white shadow rounded-lg p-4 hover:shadow-lg transition relative">
                        <button
                            onClick={() => handleAddToWishlist(item)}
                            className="absolute right-3 top-3 text-xl"
                        >
                            ❤️
                        </button>
                        <img src={item.thumbnail} alt={item.title} className="w-full h-40 object-contain mb-4" />
                        <h3 className="text-sm font-medium truncate">{item.title}</h3>
                        <div className="flex gap-2 mt-2 text-sm">
                            <span className="text-red-600 font-semibold">₹{(item.price * 100).toFixed(0)}</span>
                            <span className="line-through text-gray-500">₹{(item.price * 110).toFixed(0)}</span>
                        </div>
                        <p className="text-yellow-500 mt-1">⭐ {item.rating}</p>
                        <button
                            onClick={() => handleAddToCart(item)}
                            className="mt-3 w-full bg-black text-white py-1 rounded hover:bg-gray-800 text-sm"
                        >
                            Add to Cart
                        </button>
                        <button
                            onClick={() => navigate(`/product/${item.id}`)}
                            className="mt-2 w-full border border-black text-black py-1 rounded text-sm hover:bg-black hover:text-white"
                        >
                            View Product
                        </button>
                    </div>
                ))}
            </div>

            <div className="text-center mt-6">
                <button
                    onClick={() => navigate("/products")}
                    className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
                >
                    View All Products
                </button>
            </div>
        </section>
    );
};

export default FlashSales;
