import { useState } from "react";
import { Menu, X, ShoppingCart, User, Search } from "lucide-react";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 bg-white shadow z-50">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3">
                {/* Logo */}
                <h1 className="text-2xl font-bold text-black">SHOPME</h1>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6 text-gray-700 text-sm">
                    <a href="#">Home</a>
                    <a href="#">Categories</a>
                    <a href="#">Flash Sale</a>
                    <a href="#">Best Sellers</a>
                    <a href="#">New Arrivals</a>
                </nav>

                {/* Right Icons */}
                <div className="flex items-center gap-4 text-gray-700">
                    <Search className="w-5 h-5 cursor-pointer" />
                    <ShoppingCart className="w-5 h-5 cursor-pointer" />
                    <User className="w-5 h-5 cursor-pointer" />
                    {/* Mobile Hamburger */}
                    <button className="md:hidden" onClick={() => setMenuOpen(true)}>
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden fixed top-0 left-0 w-full h-full bg-white z-50 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">SHOPME</h2>
                        <button onClick={() => setMenuOpen(false)}>
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    <nav className="flex flex-col gap-4 text-lg text-gray-700">
                        <a href="#" onClick={() => setMenuOpen(false)}>Home</a>
                        <a href="#" onClick={() => setMenuOpen(false)}>Categories</a>
                        <a href="#" onClick={() => setMenuOpen(false)}>Flash Sale</a>
                        <a href="#" onClick={() => setMenuOpen(false)}>Best Sellers</a>
                        <a href="#" onClick={() => setMenuOpen(false)}>New Arrivals</a>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Navbar;
