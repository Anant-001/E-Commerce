import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase"; // adjust path if needed
import {
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import loginImage from "/public/login-image.png"; // ensure the image is in `public/`
import Footer from "../components/Footer";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Logged in successfully!");
            navigate("/");
        } catch (err) {
            alert(err.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, provider);
            alert("Signed in with Google!");
            navigate("/");
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="flex flex-col min-h-screen justify-between">
            <main className="flex flex-col md:flex-row items-center justify-center p-8 flex-1">
                {/* Left Image */}
                <div className="w-full md:w-1/2 mb-10 md:mb-0">
                    <img
                        src={loginImage}
                        alt="Login Visual"
                        className="w-full max-w-md mx-auto"
                    />
                </div>

                {/* Right Form */}
                <div className="w-full md:w-1/2 max-w-md mx-auto">
                    <h2 className="text-2xl font-semibold mb-2">Log in to Exclusive</h2>
                    <p className="text-gray-600 mb-6">Enter your details below</p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Email or Phone Number"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border-b border-gray-400 py-2 px-1 focus:outline-none"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border-b border-gray-400 py-2 px-1 focus:outline-none"
                            required
                        />
                        <div className="flex items-center justify-between pt-4">
                            <button
                                type="submit"
                                className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
                            >
                                Log In
                            </button>
                            <a href="#" className="text-sm text-red-500 hover:underline">
                                Forget Password?
                            </a>
                        </div>
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="w-full border mt-4 py-2 flex items-center justify-center gap-2"
                        >
                            <img
                                src="https://img.icons8.com/color/16/000000/google-logo.png"
                                alt="Google"
                            />
                            Continue with Google
                        </button>
                        <p className="text-sm text-center text-gray-600 mt-2">
                            Don't have an account?{" "}
                            <Link to="/signup" className="text-black underline">
                                Sign up
                            </Link>
                        </p>
                    </form>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Login;
