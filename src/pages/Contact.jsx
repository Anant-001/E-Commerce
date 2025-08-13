import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
    const formRef = useRef();
    const [isSent, setIsSent] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                'your_service_id',      // e.g. service_xxx
                'your_template_id',     // e.g. template_xxx
                formRef.current,
                'your_public_key'       // e.g. m3Hx5a9A4mH...
            )
            .then(() => {
                setIsSent(true);
                formRef.current.reset();
            })
            .catch((error) => {
                console.error("EmailJS Error:", error.text);
            });
    };

    return (
        <section className="max-w-7xl mx-auto px-4 py-10">
            <div className="text-sm text-gray-600 mb-6">
                Home / <span className="text-black font-semibold">Contact</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 flex flex-col gap-6">
                    <div className="p-6 border rounded-lg shadow-sm">
                        <div className="flex items-center gap-4 mb-2">
                            <span className="text-red-500 text-2xl">📞</span>
                            <h4 className="font-semibold text-lg">Call To Us</h4>
                        </div>
                        <p className="text-sm text-gray-600">We are available 24/7, 7 days a week.</p>
                        <p className="text-sm text-gray-800 font-medium mt-2">Phone: +880611122222</p>
                    </div>

                    <div className="p-6 border rounded-lg shadow-sm">
                        <div className="flex items-center gap-4 mb-2">
                            <span className="text-red-500 text-2xl">✉️</span>
                            <h4 className="font-semibold text-lg">Write To Us</h4>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Fill out our form and we will contact you within 24 hours.</p>
                        <p className="text-sm text-gray-800 font-medium">customer@exclusive.com</p>
                        <p className="text-sm text-gray-800 font-medium">support@exclusive.com</p>
                    </div>
                </div>

                <form
                    ref={formRef}
                    onSubmit={sendEmail}
                    className="md:col-span-2 bg-white p-6 rounded-lg border shadow-sm space-y-4"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            type="text"
                            name="user_name"
                            required
                            placeholder="Your Name *"
                            className="border rounded px-4 py-2 w-full"
                        />
                        <input
                            type="email"
                            name="user_email"
                            required
                            placeholder="Your Email *"
                            className="border rounded px-4 py-2 w-full"
                        />
                        <input
                            type="tel"
                            name="user_phone"
                            required
                            placeholder="Your Phone *"
                            className="border rounded px-4 py-2 w-full"
                        />
                    </div>
                    <textarea
                        name="message"
                        rows="5"
                        required
                        placeholder="Your Message"
                        className="border rounded px-4 py-2 w-full"
                    ></textarea>
                    <button
                        type="submit"
                        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
                    >
                        Send Message
                    </button>
                    {isSent && (
                        <p className="text-green-600 text-sm mt-2">
                            ✅ Message sent successfully!
                        </p>
                    )}
                </form>
            </div>
        </section>
    );
};

export default Contact;
