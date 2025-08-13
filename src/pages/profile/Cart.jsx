import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Cart = () => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    // Load cart items from localStorage on mount
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    // Handle quantity change
    const handleQuantityChange = (index, newQuantity) => {
        const updatedCart = [...cart];
        updatedCart[index].quantity = Number(newQuantity);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    // Remove item from cart
    const handleRemoveFromCart = (id) => {
        const updatedCart = cart.filter((item) => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        toast.success("Item removed from cart");
    };

    // Calculate subtotal
    const calculateSubtotal = () => {
        return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    };

    return (
        <div className="p-4 md:p-10 max-w-7xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Cart</h2>

            {/* Cart Table */}
            <div className="overflow-x-auto">
                <table className="w-full border text-sm text-left">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3">Product</th>
                        <th className="p-3">Price</th>
                        <th className="p-3">Quantity</th>
                        <th className="p-3">Subtotal</th>
                        <th className="p-3">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cart.map((item, index) => (
                        <tr key={index} className="border-t">
                            <td className="p-3">{item.title}</td>
                            <td className="p-3">${item.price}</td>
                            <td className="p-3">
                                <select
                                    className="border rounded p-1"
                                    value={item.quantity}
                                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                                >
                                    {[1, 2, 3, 4, 5].map((q) => (
                                        <option key={q} value={q}>
                                            {q < 10 ? `0${q}` : q}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td className="p-3">
                                ${(item.price * item.quantity).toFixed(2)}
                            </td>
                            <td className="p-3">
                                <button
                                    onClick={() => handleRemoveFromCart(item.id)}
                                    className="text-red-600 hover:underline text-sm"
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                    {cart.length === 0 && (
                        <tr>
                            <td colSpan="5" className="text-center p-4 text-gray-500">
                                Your cart is empty.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
                <button
                    className="border px-4 py-2 rounded hover:bg-gray-100"
                    onClick={() => navigate("/")}
                >
                    Return To Shop
                </button>
                <button
                    className="border px-4 py-2 rounded hover:bg-gray-100"
                    onClick={() => {
                        localStorage.setItem("cart", JSON.stringify(cart));
                        toast.success("Cart updated!");
                    }}
                >
                    Update Cart
                </button>
            </div>

            {/* Coupon and Total */}
            <div className="flex flex-col md:flex-row justify-between mt-10 gap-10">
                {/* Coupon Code */}
                <div className="flex gap-2 w-full md:w-1/2">
                    <input
                        type="text"
                        placeholder="Coupon Code"
                        className="border px-4 py-2 flex-grow rounded"
                    />
                    <button className="bg-red-500 text-white px-4 py-2 rounded">
                        Apply Coupon
                    </button>
                </div>

                {/* Cart Total */}
                <div className="border rounded p-6 w-full md:w-1/2 max-w-md">
                    <h3 className="text-lg font-medium mb-4">Cart Total</h3>
                    <div className="flex justify-between mb-2">
                        <span>Subtotal:</span>
                        <span>${calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Shipping:</span>
                        <span>Free</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg mb-4">
                        <span>Total:</span>
                        <span>${calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <button
                        onClick={() => navigate("/checkout")}
                        className="w-full bg-red-500 text-white py-2 rounded"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
