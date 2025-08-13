import React, { useEffect, useState } from "react";

const Checkout = () => {
    const [cart, setCart] = useState([]);
    const [form, setForm] = useState({
        firstName: "",
        companyName: "",
        street: "",
        apartment: "",
        city: "",
        phone: "",
        email: "",
        paymentMethod: "cod",
    });

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Billing Details</h2>

            <div className="grid md:grid-cols-3 gap-10">
                {/* Form Section */}
                <div className="md:col-span-2 space-y-4">
                    <input name="firstName" placeholder="First Name*" className="border p-2 w-full rounded" onChange={handleChange} />
                    <input name="companyName" placeholder="Company Name" className="border p-2 w-full rounded" onChange={handleChange} />
                    <input name="street" placeholder="Street Address*" className="border p-2 w-full rounded" onChange={handleChange} />
                    <input name="apartment" placeholder="Apartment, floor, etc. (optional)" className="border p-2 w-full rounded" onChange={handleChange} />
                    <input name="city" placeholder="Town/City*" className="border p-2 w-full rounded" onChange={handleChange} />
                    <input name="phone" placeholder="Phone Number*" className="border p-2 w-full rounded" onChange={handleChange} />
                    <input name="email" placeholder="Email Address*" className="border p-2 w-full rounded" onChange={handleChange} />
                    <label className="flex items-center gap-2 mt-2">
                        <input type="checkbox" />
                        Save this information for next time
                    </label>
                </div>

                {/* Order Summary */}
                <div className="border rounded p-6 space-y-4 w-full">
                    {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center">
                            <div className="flex gap-2 items-center">
                                <img src={item.thumbnail} alt={item.title} className="w-12 h-12 object-contain" />
                                <span>{item.title}</span>
                            </div>
                            <span>${item.price * item.quantity}</span>
                        </div>
                    ))}

                    <hr />
                    <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>${subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Shipping:</span>
                        <span>Free</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>${subtotal}</span>
                    </div>

                    <div className="space-y-2">
                        <label className="flex gap-2 items-center">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="bank"
                                onChange={handleChange}
                            />
                            Bank
                        </label>
                        <label className="flex gap-2 items-center">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="cod"
                                checked={form.paymentMethod === "cod"}
                                onChange={handleChange}
                            />
                            Cash on delivery
                        </label>
                    </div>

                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Coupon Code"
                            className="border flex-grow px-2 py-1 rounded"
                        />
                        <button className="bg-red-500 text-white px-4 rounded">Apply Coupon</button>
                    </div>

                    <button className="w-full bg-red-500 text-white py-2 rounded mt-4">
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
