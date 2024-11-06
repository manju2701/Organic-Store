import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { CartProvider } from './components/CartContext';
import NavScrollExample from './components/Navbar';
import Products from './Pages/Products';
import Fruits from './Pages/Fruits';
import Juices from './Pages/Juices';
import Login from './components/Login';
import Signup from './components/Signup';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import About from './components/About';
import Contact from './components/Contact';
import Banner from './components/Banner';
import BestSelling from './components/BestSelling';
import Features from './components/Features';
import Organicshop from './components/Organicshop';
import OfferBanner from './components/OfferBanner';
import Trending from './components/Trending';
import Reviews from './components/Reviews';
import Hero from './components/Hero';
import Brands from './components/Brands';
import Footer from './components/Footer';
import { AuthProvider, useAuth } from './components/AuthContext'; // Import AuthContext for user state management
import Resetpassword from './components/Resetpassword';
import ProtectedRoute from './components/ProtectedRoute'; // ProtectedRoute for authentication guard
import Forgotpassword from './components/Forgotpassword';
import VerifyEmail from './components/VerifyEmail';
import Checkout from './components/Checkout';
import './styles/Navbar.css';

const App = () => {
  const location = useLocation();
  const noFooterPaths = ['/login', '/signup', '/resetpassword', '/forgotpassword', '/verify-email', '/cart', '/checkout', '/wishlist'];

  // Get user from context (if the user is logged in, it will be stored here)
  const { user, logout } = useAuth(); // Destructure the context values (user, logout)

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // You can also decode the token here and set the user data if you have JWT-based authentication
      // Assuming token has user info
      // For example, decode it and get the email info if you use JWT
    }
  }, [user]);

  return (
    <>
      <NavScrollExample user={user} logout={logout} /> {/* Pass user state and logout function to the navbar */}
      <Routes>
        {/* Main Routes */}
        <Route path="/categories/all" element={<Products />} />
        <Route path="/categories/fruits" element={<Fruits />} />
        <Route path="/categories/juices" element={<Juices />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Home Page */}
        <Route path="/" element={
          <>
            <Banner />
            <BestSelling />
            <Features />
            <Organicshop />
            <OfferBanner />
            <Trending />
            <Reviews />
            <Hero />
            <Brands />
          </>
        } />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route path="/resetpassword" element={<Resetpassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* Protected Routes (Only for logged-in users) */}
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
      </Routes>

      {/* Show Footer unless on certain pages */}
      {!noFooterPaths.includes(location.pathname) && <Footer />}
    </>
  );
};

const WrappedApp = () => (
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
);

export default WrappedApp;
