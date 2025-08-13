import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // adjust path if needed
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import Header from "../components/Header.jsx";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Account created successfully!");
            navigate("/");
        } catch (err) {
            alert(err.message);
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            await signInWithPopup(auth, provider);
            alert("Signed in with Google!");
            navigate("/");
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-between">
            {/* Header Banner */}
            <div className="bg-black text-white text-sm text-center py-2">
                Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
                <a href="#" className="underline ml-1">
                    ShopNow
                </a>
            </div>

            {/* Main Section */}
            <main className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-12 gap-10">
                {/* Left Image */}
                <div className="w-full md:w-1/2">
                    <img
                        src="/public/Login-image.png"
                        alt="Cart and Phone"
                        className="w-full max-w-md mx-auto"
                    />
                </div>

                {/* Right Form */}
                <div className="w-full md:w-1/2 max-w-md">
                    <h2 className="text-2xl font-semibold mb-1">Create an account</h2>
                    <p className="text-gray-500 mb-6">Enter your details below</p>
                    <form onSubmit={handleSignUp} className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Email or Phone Number"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border-b border-gray-300 py-2 focus:outline-none"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border-b border-gray-300 py-2 focus:outline-none"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-red-600 text-white py-2 mt-2 rounded"
                        >
                            Create Account
                        </button>
                        <button
                            type="button"
                            onClick={handleGoogleSignUp}
                            className="border py-2 flex items-center justify-center gap-2"
                        >
                            <img
                                src="https://img.icons8.com/color/16/000000/google-logo.png"
                                alt="Google"
                            />
                            Sign up with Google
                        </button>
                        <p className="text-sm text-center text-gray-600 mt-2">
                            Already have account?{" "}
                            <Link to="/login" className="text-black underline">
                                Log in
                            </Link>
                        </p>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default SignUp;
