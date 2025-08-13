import { motion } from "framer-motion";
import { Truck, Headphones, ShieldCheck } from "lucide-react";

const features = [
    {
        icon: <Truck className="text-white w-6 h-6" />,
        title: "FREE AND FAST DELIVERY",
        desc: "Free delivery for all orders over $140",
        direction: "left",
    },
    {
        icon: <Headphones className="text-white w-6 h-6" />,
        title: "24/7 CUSTOMER SERVICE",
        desc: "Friendly 24/7 customer support",
        direction: "bottom",
    },
    {
        icon: <ShieldCheck className="text-white w-6 h-6" />,
        title: "MONEY BACK GUARANTEE",
        desc: "We return money within 30 days",
        direction: "right",
    },
];

const fadeIn = {
    hidden: (direction) => {
        const map = {
            left: { x: -50, y: 0 },
            right: { x: 50, y: 0 },
            bottom: { x: 0, y: 50 },
        };
        return { opacity: 0, ...map[direction] };
    },
    visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
            duration: 0.7,
            ease: "easeOut",
        },
    },
};

const WhyChooseUs = () => {
    return (
        <section className="bg-white py-16 px-4">
            <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between gap-10 text-center">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        className="flex flex-col items-center transition-all duration-300 hover:scale-105"
                        custom={feature.direction}
                        variants={fadeIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4 hover:bg-green-500 transition-colors duration-300">
                            {feature.icon}
                        </div>
                        <h3 className="font-bold text-sm mb-2 uppercase tracking-wide">
                            {feature.title}
                        </h3>
                        <p className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-300">
                            {feature.desc}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default WhyChooseUs;
