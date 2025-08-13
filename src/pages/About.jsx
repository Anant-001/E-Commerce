import React from "react";

const About = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 py-10">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-600 mb-6">
                Home / <span className="text-black font-semibold">About</span>
            </div>

            {/* Main Content */}
            <div className="flex flex-col md:flex-row items-center gap-10 mb-12">
                {/* Text */}
                <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-4">Our Story</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Launched in 2015, Exclusive is South Asia’s premier online shopping marketplace with an active presence in Bangladesh.
                        Supported by a wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sellers and 300 brands
                        and serves 3 million+ customers across the region.
                        <br /><br />
                        Exclusive has more than 1 million products to offer, growing at a very fast rate. Exclusive offers a diverse assortment
                        in categories ranging from consumer goods and apparel to electronics and more.
                    </p>
                </div>

                {/* Image */}
                <div className="flex-1">
                    <img
                        src="/public/Side%20Image.png"
                        alt="About Us"
                        className="rounded-lg shadow-lg"
                    />
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                {[
                    { label: "Sellers active on site", value: "10.5k", icon: "🛍️" },
                    { label: "Monthly Product Sale", value: "33k", icon: "💰", highlight: true },
                    { label: "Customer active on site", value: "45.5k", icon: "👥" },
                    { label: "Annual gross sale", value: "25k", icon: "📈" },
                ].map((item, index) => (
                    <div
                        key={index}
                        className={`text-center p-6 rounded-lg border ${item.highlight ? "bg-red-500 text-white" : "bg-white"}`}
                    >
                        <div className="text-2xl font-bold mb-2">{item.value}</div>
                        <p className="text-sm">{item.label}</p>
                    </div>
                ))}
            </div>

            {/* Team Section */}
            <div className="mb-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            name: "Tom Cruise",
                            title: "Founder & Chairman",
                            image: "./public/Profile/Tom.png",
                        },
                        {
                            name: "Emma Watson",
                            title: "Managing Director",
                            image: "./public/Profile/Emma.png",
                        },
                        {
                            name: "Will Smith",
                            title: "Product Designer",
                            image: "./public/Profile/Will.png",
                        },
                    ].map((member, index) => (
                        <div key={index} className="text-center">
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full rounded-xl object-cover shadow-md mb-4"
                            />
                            <h3 className="font-semibold">{member.name}</h3>
                            <p className="text-sm text-gray-500">{member.title}</p>
                            <div className="flex justify-center gap-4 mt-2 text-gray-600 text-xl">
                                <i className="fab fa-twitter"></i>
                                <i className="fab fa-instagram"></i>
                                <i className="fab fa-linkedin-in"></i>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {[
                    {
                        icon: "🚚",
                        title: "FREE AND FAST DELIVERY",
                        desc: "Free delivery for all orders over $140",
                    },
                    {
                        icon: "🎧",
                        title: "24/7 CUSTOMER SERVICE",
                        desc: "Friendly 24/7 customer support",
                    },
                    {
                        icon: "✅",
                        title: "MONEY BACK GUARANTEE",
                        desc: "We return money within 30 days",
                    },
                ].map((item, index) => (
                    <div key={index}>
                        <div className="text-3xl mb-4">{item.icon}</div>
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default About;
