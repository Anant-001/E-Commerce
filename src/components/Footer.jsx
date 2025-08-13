const Footer = () => {
    return (
        <footer className="bg-black text-white py-10 px-4">
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
                {/* Column 1 - Logo and Description */}
                <div>
                    <h1 className="text-2xl font-bold mb-3">SHOPME</h1>
                    <p className="text-sm text-gray-400">
                        Discover the best deals on your favorite products. Shop smart with us!
                    </p>
                </div>

                {/* Column 2 - Company Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Company</h3>
                    <ul className="text-sm space-y-1 text-gray-400">
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>

                {/* Column 3 - Support Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Support</h3>
                    <ul className="text-sm space-y-1 text-gray-400">
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms of Use</a></li>
                        <li><a href="#">Returns</a></li>
                    </ul>
                </div>

                {/* Column 4 - Download App */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Get Our App</h3>
                    <div className="flex flex-col gap-3">
                        <a href="#">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                                alt="Google Play"
                                className="h-10"
                            />
                        </a>
                        <a href="#">
                            <img
                                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                                alt="App Store"
                                className="h-10"
                            />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-700 pt-4">
                &copy; {new Date().getFullYear()} SHOPME. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
