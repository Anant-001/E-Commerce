import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        axios
            .get(`https://dummyjson.com/products/${id}`)
            .then((res) => {
                setProduct(res.data);
                setSelectedImage(res.data.thumbnail);
            })
            .catch(console.error);
    }, [id]);

    const handleAddToCart = () => {
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
        const index = existingCart.findIndex((item) => item.id === product.id);

        if (index !== -1) {
            existingCart[index].quantity += quantity;
        } else {
            existingCart.push({ ...product, quantity });
        }

        localStorage.setItem("cart", JSON.stringify(existingCart));
        toast.success("Product added to cart!");
    };

    if (!product) return <div className="p-6">Loading...</div>;

    return (
        <div className="max-w-7xl mx-auto p-6 md:flex gap-10">
            {/* Left: Gallery */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex md:flex-col gap-3">
                    {[product.thumbnail, ...product.images.slice(0, 4)].map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            alt={`thumb-${i}`}
                            className={`w-16 h-16 object-contain border rounded cursor-pointer ${
                                selectedImage === img ? "border-red-500" : ""
                            }`}
                            onClick={() => setSelectedImage(img)}
                        />
                    ))}
                </div>
                <img
                    src={selectedImage || product.thumbnail}
                    alt={product.title}
                    className="w-full max-w-md object-contain border rounded"
                />
            </div>

            {/* Right: Product Info */}
            <div className="flex-1 mt-6 md:mt-0 space-y-4">
                <h2 className="text-2xl font-semibold">{product.title}</h2>
                <p className="text-yellow-500 text-sm">
                    ⭐ {product.rating} ({product.stock} in stock)
                </p>
                <p className="text-red-500 text-xl font-bold">
                    ₹{(product.price * 100).toFixed(0)}
                </p>
                <p className="text-gray-700">{product.description}</p>

                {/* Color (fake data) */}
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm">Colours:</span>
                    <div className="w-5 h-5 bg-red-500 rounded-full border"></div>
                    <div className="w-5 h-5 bg-gray-900 rounded-full border"></div>
                </div>

                {/* Sizes (fake data) */}
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm">Size:</span>
                    {["XS", "S", "M", "L", "XL"].map((size) => (
                        <button
                            key={size}
                            className="border rounded px-2 py-1 text-sm hover:bg-black hover:text-white"
                        >
                            {size}
                        </button>
                    ))}
                </div>

                {/* Quantity + Buy Buttons */}
                <div className="flex items-center gap-4 mt-4">
                    <div className="flex border rounded">
                        <button
                            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                            className="px-3 py-1 text-xl"
                        >
                            -
                        </button>
                        <span className="px-4 py-1 border-x">{quantity}</span>
                        <button
                            onClick={() => setQuantity((q) => q + 1)}
                            className="px-3 py-1 text-xl"
                        >
                            +
                        </button>
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
                    >
                        Buy Now
                    </button>
                    <button className="border px-4 py-2 rounded text-gray-700 hover:bg-gray-100">
                        ❤️
                    </button>
                </div>

                {/* Delivery / Returns */}
                <div className="mt-6 text-sm border-t pt-4 space-y-2">
                    <p>🚚 <strong>Free Delivery</strong> - Check postal code at checkout.</p>
                    <p>↩️ <strong>Return Delivery</strong> - 30 Days return policy</p>
                </div>

                {/* Return to Home */}
                <div className="mt-8">
                    <button
                        onClick={() => navigate("/")}
                        className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700"
                    >
                        ← Return to Home Page
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
