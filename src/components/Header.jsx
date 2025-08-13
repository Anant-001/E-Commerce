import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import {
    ChevronDown,
    LogOut,
    User,
    ShoppingBag,
    X,
    Star,
    Menu,
} from "lucide-react";
import {
    collection,
    onSnapshot,
} from "firebase/firestore";
import axios from "axios";

const Header = () => {
    const [user] = useAuthState(auth);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [mobileMenu, setMobileMenu] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setDropdownOpen(false);
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    // Fetch cart count
    useEffect(() => {
        let unsubscribe;

        if (user) {
            const cartRef = collection(db, "carts", user.uid, "items");
            unsubscribe = onSnapshot(cartRef, (snapshot) => {
                const totalItems = snapshot.docs.reduce(
                    (acc, doc) => acc + (doc.data().quantity || 0),
                    0
                );
                setCartCount(totalItems);
            });
        } else {
            const updateLocalCart = () => {
                const localCart = JSON.parse(localStorage.getItem("cart")) || [];
                const total = localCart.reduce((sum, item) => sum + item.quantity, 0);
                setCartCount(total);
            };

            updateLocalCart();
            window.addEventListener("storage", updateLocalCart);
            return () => window.removeEventListener("storage", updateLocalCart);
        }

        return () => unsubscribe?.();
    }, [user]);

    const handleCartClick = () => {
        if (!user) {
            navigate("/login");
        } else {
            navigate("/cart");
        }
    };

    // Handle search input
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (searchTerm.length > 1) {
                axios
                    .get(`https://dummyjson.com/products/search?q=${searchTerm}`)
                    .then((res) => setSearchResults(res.data.products || []))
                    .catch(console.error);
            } else {
                setSearchResults([]);
            }
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [searchTerm]);

    return (
        <header className="border-b px-4 md:px-6 py-4 flex flex-wrap md:flex-nowrap items-center justify-between relative z-50 bg-white">
            <h1 className="text-2xl font-bold text-black">Exclusive</h1>

            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden ml-auto text-black">
                <Menu />
            </button>

            <nav
                className={`${
                    mobileMenu ? "flex" : "hidden"
                } md:flex flex-col md:flex-row gap-4 md:items-center md:ml-10 mt-4 md:mt-0 w-full md:w-auto`}
            >
                <Link to="/">Home</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/about">About</Link>

                {!user && (
                    <>
                        <Link to="/signup" className="font-semibold underline">
                            Sign Up
                        </Link>
                        <Link to="/login" className="font-semibold">
                            Login
                        </Link>
                    </>
                )}

                {user && (
                    <div className="relative">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center gap-2"
                        >
                            {user.photoURL && (
                                <img
                                    src={user.photoURL}
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full"
                                />
                            )}
                            <span className="text-sm">
                                {user.displayName || "User"}
                            </span>
                            <ChevronDown className="w-4 h-4" />
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-56 bg-gradient-to-br from-gray-800 to-purple-700 text-white rounded-lg shadow-lg py-3 z-50">
                                <Link to="/account" className="flex items-center px-4 py-2 hover:bg-white/10">
                                    <User className="w-5 h-5 mr-3" /> Manage My Account
                                </Link>
                                <Link to="/orders" className="flex items-center px-4 py-2 hover:bg-white/10">
                                    <ShoppingBag className="w-5 h-5 mr-3" /> My Order
                                </Link>
                                <Link to="/cancellations" className="flex items-center px-4 py-2 hover:bg-white/10">
                                    <X className="w-5 h-5 mr-3" /> My Cancellations
                                </Link>
                                <Link to="/reviews" className="flex items-center px-4 py-2 hover:bg-white/10">
                                    <Star className="w-5 h-5 mr-3" /> My Reviews
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left flex items-center px-4 py-2 hover:bg-white/10"
                                >
                                    <LogOut className="w-5 h-5 mr-3" /> Logout
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </nav>

            {/* Search & Icons */}
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mt-4 md:mt-0 w-full md:w-auto relative">
                <div className="relative w-full md:w-64">
                    <input
                        type="text"
                        placeholder="Search for products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                    />
                    {searchResults.length > 0 && (
                        <div className="absolute top-full left-0 w-full bg-white border rounded shadow-md z-50 max-h-64 overflow-y-auto">
                            {searchResults.map((product) => (
                                <Link
                                    key={product.id}
                                    to={`/product/${product.id}`}
                                    onClick={() => {
                                        setSearchTerm("");
                                        setSearchResults([]);
                                    }}
                                    className="block px-4 py-2 hover:bg-gray-100 text-sm"
                                >
                                    {product.title}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                <button onClick={() => navigate("/wishlist")}>❤️</button>


                <button onClick={handleCartClick} className="relative text-xl">
                    🛒
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                            {cartCount}
                        </span>
                    )}
                </button>
            </div>
        </header>
    );
};

export default Header;
