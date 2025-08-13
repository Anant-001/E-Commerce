import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// Product categories with their corresponding product IDs and custom titles
const sliderConfigs = [
    {
        id: 1, // Mobile
        brand: "Apple",
        subtitle: "Latest Smartphones",
        offer: "Up to 10% Off on iPhones",
        image: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-14-pro-model-unselect-gallery-2-202209?wid=5120&hei=2880&fmt=jpeg&qlt=80&.v=1660687081351",
    },
    {
        id: 25, // Headphones
        brand: "Beats",
        subtitle: "Premium Headphones",
        offer: "Crystal Clear Sound - 15% Off",
        image: "https://plus.unsplash.com/premium_photo-1679513691641-9aedddc94f96?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhlYWRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
        id: 59, // Shoes
        brand: "Nike",
        subtitle: "Stylish Footwear",
        offer: "Trendy Sneakers at ₹999",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80",
    },
    {
        id: 31, // Food
        brand: "Organic Mart",
        subtitle: "Food & Beverages",
        offer: "Flat 20% Off on Groceries",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVrxkR6E0Yjpby59S3jqKwOxMtVc2kvl8DKQ&s",
    },
    {
        id: 81, // Gadgets
        brand: "TechHub",
        subtitle: "Trending Gadgets",
        offer: "Smart Devices Starting at ₹499",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80",
    },
];
const brandLogos = {
    Apple: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    Beats: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAflBMVEX////VFSvUACLeYGjQAAD43N/UAB/VESnTABjTABDTABX99vfUBiTSAAnVDSf0z9Lzys777u/65+nwvcH44eP11NfpnqLaPkzomJ7XLDvnj5bid37jfILutrrsqK3YN0LhcHjZRkzliI3XIzXbVVveamvbSVbsrrPgaXLcXGBqrtMzAAAFRUlEQVR4nO2ba5eyKhSAQxEQkSwt7TJdnS7//w+enFNzETAFLNe7eD7PsB5hu9nCbjRyOBwOPaJ0+m6FGpN0R2Hwbos/BKutR/CQpKLUh4QDAIYjFW1yhMAXQ5GaFDlkAAxJKpof6bfSQKQ2OeQADEtqFzMAhible8BJOSkn5aSclJNyUu/GSTkpJ+WknJSTclJOykk5KSf1TCqaZkEwqwiyaAhSUbJcXfeLI/A8zvFxW36ui3GvZk+kJuN5DiFF7KZzhzMPhRCe5rPexBqlgvWehfU/uINCXhaTV0tFaQkJx3KlCsxCuEv6mC6lVHIiSC308CJemb5MKjlBJtUQpwsurGtJpTKfPZ+lbxi5Wo4tUSobLSFqCCUJCM17lko/w25KN3j4afNCVZDCXoeV+4GAWY9SujB+Hp4U4NBaYNmTApiuhicFQGzJyqoUCNcDlAKhlbiyLIXhx8ukuEfgg5iwhuTKj9lrpBBZ+IdzMo1uZMlmXR6pOsGirflG+FSKU+intacPzidIVNNl4RV8IoXpdil98ul6QRT/QoxLmWYpBJfKjTbw/zY0fOPlfUrh0G/c+9OtfLLgsj8pDpdPCvDJGsoiC5u+gWopb9HiW/kDyZbQdBNUSjE0bvP/H7K5wrFZWlBJMdDyTGEsK53DQx9SGCVtRzhD8d+5WQZVSMHWTqPRRmIVG23McqluJUgpZgZmlKukUt6p08f49CiGFWz1mnSR6rJ4FZKwoiahLpMil66j5ELVwPYGJx8SKcw6T31ChUGAwfpJpFDniRpF4jDxxqpU14iq2MQWHq1BigONYSIh1LWGUUqFhc44pRDqUD+pS6Q0Vq/amG1EgUoKL7SKoRmoJ1CDT0BBipVaCWayrxdWRD99ClJo9+aBZGMRzQJ7VY90z7cnpZv01vVSgVmUgpoHcgdB6mpRSvOEQiKlvSX3KaXrNMyYutZvO+gA3j5BCml+SF6EPKVfJghjaT5gVApPp3/+KYQC32pdaGQLi3tfEdbGwp5WHZvWxwFQ/5gqFUqOWCt77oRvP4N6KhOkUKkzDq2vHibaTqOReD4BNQqqxNKz3fGFOpZovDZCltKsqu+chQjVOIgLhLoTUJPjWLGOBWHnpL4TPka5XlV9R8x6AMOO+3sgniUYbDIVS+Epu0ZVdBEvIHTLsjuSx8SkU/0yF8ISYGrY2XESv9wZ65D5xpLbeZ03+A/i+3fLMqfWVtlW7PXocGSqQPxku0HbBupkIbnR8kwy5/8UkpNUEO5aRcVUPC8DRpvxgyiXNduQvMUKBrJ5ui2+sdMtqsSs8GX1tCkj5dLD5W4vr4LoJO1L8si8cQknByK9XEP63zG/EauqL3B8bZispIylt6MYWmp7EWu0+2TFO3k/YDT2VW1f1KQ++E0G5Lect/hA/lyI+EnhK5vjvNxam14qX4pqNTwK8/Msm0RfTLOqy5J6qj/nyEIPwIO1cL772ytG29O1osyPYdjUmGCnh+PBRbLb/J4Bzr5oarK8Edvpdnkw3Wu1mP2F+Jb7PqfS7NwJar7n1Rkf2/V2KkF7i0H+IABGc0UttLlIGJusIPV7mKeKbN/8DjYQG9wQPWHqd289reDhus+++SXSaD4jR3tdnlICRV+NGkzLntrlf4gK2CXeMYEGt6DtmZUNDW41EPFf9auWD1/d4PZ7lhC89NC6ryRYYXm1+wMjzDdpitBhduDqn15gTuG2eLVSRZSs9oAIjZ3YI+S4P/T3w5mnXuPNOq96TsOQ3gjDGMLwdPh4n9G3WZbOi+XhcFgWxWY8ebuPw+H4x/gPHmtMkqYLAyAAAAAASUVORK5CYII=",
    Nike: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
    "Organic Mart": "https://cdn-icons-png.flaticon.com/128/562/562678.png", // fallback organic icon
    TechHub: "https://encrypted-tbn0.gstatic.com/faviconV2?url=https://www.croma.com&client=SHOPPING&size=32&type=FAVICON&fallback_opts=TYPE,SIZE,URL", // generic tech icon
};


const HeroSlider = () => {
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        const fetchSlides = async () => {
            const results = await Promise.all(
                sliderConfigs.map(async (item) => {
                    const res = await fetch(`https://dummyjson.com/products/${item.id}`);
                    const data = await res.json();
                    return { ...item, product: data };
                })
            );
            setSlides(results);
        };

        fetchSlides();
    }, []);

    return (
        <section className="bg-white w-full overflow-hidden">
            <Swiper
                pagination={{ clickable: true }}
                autoplay={{ delay: 4500 }}
                loop={true}
                modules={[Pagination, Autoplay]}
                className="w-full h-[420px] md:h-[500px]"
            >
                {slides.map((slide, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="flex items-center justify-between h-full px-6 md:px-20 gap-8">
                            {/* Left Text Content */}
                            <div className="max-w-xl animate-slide-in-left">
                                <div className="flex items-center gap-2 mb-2">
                                    <img
                                        src={brandLogos[slide.brand] || "https://upload.wikimedia.org/wikipedia/commons/e/e6/Generic_electronics_icon.svg"}
                                        alt={slide.brand}
                                        className="w-5 h-5"
                                    />

                                    <span className="text-sm text-gray-600">{slide.subtitle}</span>
                                </div>
                                <h1 className="text-3xl md:text-5xl font-bold text-black mb-4">
                                    {slide.offer}
                                </h1>

                                <p className="text-gray-700 mb-4">
                                    Price: <span className="font-semibold">${slide.product.price}</span> &nbsp; | &nbsp;
                                    Rating: <span className="font-semibold">{slide.product.rating}⭐</span>
                                </p>

                                <a
                                    href="#"
                                    className="inline-flex items-center gap-2 text-black border-b border-black hover:gap-4 transition-all duration-300"
                                >
                                    Shop Now <span>→</span>
                                </a>
                            </div>

                            {/* Right Product Image */}
                            <div className="hidden md:block animate-slide-in-right">
                                <img
                                    src={slide.image}
                                    alt={slide.subtitle}
                                    className="h-[340px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default HeroSlider;
