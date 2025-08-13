import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages/Sections
import HeroSlider from "./components/section/HeroSlider.jsx";
import FlashSales from "./components/section/FlashSales.jsx";
import Categories from "./components/section/Categories.jsx";
import BestSellers from "./components/section/BestSellers.jsx";
import ProductPromo from "./components/section/ProductPromo.jsx";
import ExploreProducts from "./components/section/ExploreProducts.jsx";
import NewArrivals from "./components/section/NewArrivals.jsx";
import WhyChooseUs from "./components/section/WhyChooseUs.jsx";

import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Orders from "./pages/profile/Orders.jsx";
import Reviews from "./pages/profile/Reviews.jsx";
import Cancellations from "./pages/profile/Cancellations.jsx";
import Account from "./pages/profile/Account.jsx";
import Cart from "./pages/profile/Cart.jsx"; // ✅ Import Cart
import Checkout from "./pages/profile/Checkout.jsx";
import ProductDetail from "./pages/profile/ProductDetail.jsx";
import Wishlist from "./pages/profile/Wishlist.jsx";

const Home = () => (
    <>
        <HeroSlider />
        <FlashSales />
        <Categories />
        <BestSellers />
        <ProductPromo />
        <ExploreProducts />
        <NewArrivals />
        <WhyChooseUs />
    </>
);

function App() {
    return (
        <Router>
            <div className="font-sans">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/reviews" element={<Reviews />} />
                    <Route path="/cancellations" element={<Cancellations />} />
                    <Route path="/cart" element={<Cart />} /> {/* ✅ Cart Route */}
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
