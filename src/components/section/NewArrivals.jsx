import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NewArrivals = () => {
    const [products, setProducts] = useState([]);
    const sectionRef = useRef(null);

    useEffect(() => {
        fetch("https://dummyjson.com/products?limit=4&skip=10")
            .then((res) => res.json())
            .then((data) => setProducts(data.products));
    }, []);

    useEffect(() => {
        if (products.length > 0) {
            const cards = sectionRef.current.querySelectorAll(".gsap-card");

            gsap.fromTo(
                cards,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    },
                }
            );

            const images = sectionRef.current.querySelectorAll(".parallax-img");
            images.forEach((img) => {
                gsap.to(img, {
                    y: -30,
                    ease: "none",
                    scrollTrigger: {
                        trigger: img,
                        start: "top bottom",
                        scrub: true,
                    },
                });
            });
        }
    }, [products]);

    if (products.length === 0) return <div className="text-center py-10">Loading New Arrivals...</div>;

    return (
        <section className="bg-white text-black px-4 py-16" ref={sectionRef}>
            <div className="max-w-screen-xl mx-auto">
                <h2 className="text-red-500 font-semibold text-sm mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>
                    Featured
                </h2>
                <h2 className="text-2xl font-bold mb-6">New Arrivals</h2>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Left Large Card */}
                    <div className="bg-black text-white rounded-lg overflow-hidden relative group gsap-card">
                        <div className="overflow-hidden">
                            <img
                                src={products[0].thumbnail}
                                alt={products[0].title}
                                className="parallax-img w-full h-72 object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="absolute bottom-6 left-6">
                            <h3 className="text-xl font-bold">{products[0].title}</h3>
                            <p className="text-sm text-gray-300">{products[0].description.slice(0, 50)}...</p>
                            <div className="mt-2 flex gap-4 text-sm text-gray-300">
                                <span>${products[0].price}</span>
                                <span>⭐ {products[0].rating}</span>
                            </div>
                            <a href="#" className="text-white underline font-medium mt-1 inline-block">
                                Shop Now
                            </a>
                        </div>
                    </div>

                    {/* Right Grid of Cards */}
                    <div className="grid sm:grid-cols-2 gap-6">
                        {products.slice(1).map((item, i) => (
                            <div key={i} className="bg-black text-white rounded-lg overflow-hidden relative group gsap-card">
                                <div className="overflow-hidden">
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className="parallax-img w-full h-48 object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="absolute bottom-4 left-4 right-4">
                                    <h4 className="text-lg font-semibold">{item.title}</h4>
                                    <p className="text-sm text-gray-300">{item.description.slice(0, 40)}...</p>
                                    <div className="mt-2 flex gap-4 text-sm text-gray-300">
                                        <span>${item.price}</span>
                                        <span>⭐ {item.rating}</span>
                                    </div>
                                    <a href="#" className="text-white underline text-sm mt-1 inline-block">
                                        Shop Now
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewArrivals;
