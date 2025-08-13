import { useEffect, useState } from "react";

const ProductPromo = () => {
    const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    // Static product data instead of API
    const product = {
        title: "Wireless Headphones",
        price: 59.99,
        rating: 4.5,
        thumbnail: "/public/BOOMBOX.png", // Make sure this image exists in your public/images folder
    };

    // Countdown timer logic
    useEffect(() => {
        const target = new Date().getTime() + 5 * 24 * 60 * 60 * 1000 + 23 * 3600 * 1000;

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = target - now;

            if (distance < 0) {
                clearInterval(interval);
                setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            setTime({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((distance / (1000 * 60)) % 60),
                seconds: Math.floor((distance / 1000) % 60),
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="bg-white text-black py-16 px-4">
            <div className="max-w-screen-xl mx-auto bg-black text-white rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-12 shadow-xl">
                {/* Left: Text and Countdown */}
                <div className="flex-1 text-center md:text-left">
                    <p className="text-green-400 text-sm font-semibold mb-2">Categories</p>
                    <h2 className="text-4xl font-bold leading-tight mb-4">
                        Enhance Your<br />Music Experience
                    </h2>

                    <div className="flex justify-center md:justify-start gap-4 mb-6">
                        {[
                            { label: "Days", value: time.days },
                            { label: "Hours", value: time.hours },
                            { label: "Minutes", value: time.minutes },
                            { label: "Seconds", value: time.seconds },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-white text-black rounded-full w-20 h-20 flex flex-col justify-center items-center"
                            >
                                <span className="text-xl font-bold">
                                    {String(item.value).padStart(2, "0")}
                                </span>
                                <span className="text-xs">{item.label}</span>
                            </div>
                        ))}
                    </div>

                    <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded text-sm font-semibold">
                        Buy Now!
                    </button>
                </div>

                {/* Right: Product Info */}
                <div className="flex-1 text-center">
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full max-w-xs mx-auto object-contain mb-4"
                    />
                    <h3 className="text-lg font-semibold">{product.title}</h3>
                    <p className="text-sm text-gray-300 mt-1">${product.price}</p>
                    <p className="text-sm text-gray-400">⭐ {product.rating}</p>
                </div>
            </div>
        </section>
    );
};

export default ProductPromo;
