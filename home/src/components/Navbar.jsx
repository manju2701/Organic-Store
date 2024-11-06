import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { Container, Navbar, Nav, Form, Button, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faHeart, faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import '../styles/Navbar.css';
import axios from 'axios';

function NavScrollExample() {
    const { user, logout } = useAuth();  // Retrieve user info from context
    const [cart, setCart] = useState({ itemCount: 0 });

    // Safely extract the user's email prefix for display
    const getEmailPrefix = (email) => {
        if (!email) return ''; // Return empty string if email is undefined or null
        const atIndex = email.indexOf('@');
        return atIndex !== -1 ? email.substring(0, atIndex) : email;
    };

    // Load cart data when user is logged in
    const loadCart = async () => {
        if (!user) return; // Avoid fetching if the user is not logged in
        try {
            const response = await axios.get('http://localhost:5000/api/cart/allcartitems');
            setCart({
                itemCount: response.data.products.length || 0,
            });
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    useEffect(() => {
        loadCart(); // Load cart when user is logged in
    }, [user]);  // This triggers whenever the user state changes (e.g., after login)

    // Manually update the cart after user adds an item
    const updateCart = () => {
        loadCart();  // Reload the cart after action
    };

    return (
        <>
            <div className="offer-bar">
                <div className="scrolling-offer">
                    🌱 Special Offer: Get 20% Off on Your First Order!
                </div>
            </div>

            <Navbar expand="lg" className="bg-body-tertiary shadow-navbar">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            src="https://websitedemos.net/organic-shop-02/wp-content/uploads/sites/465/2019/06/organic-store-logo5.svg"
                            alt="Organic Logo"
                            className="logo"
                        />
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll" className="justify-content-between">
                        <Nav className="me-auto">
                            <Dropdown>
                                <Dropdown.Toggle variant="link" id="categories-dropdown" className="text-black mx-3" style={{ border: 'none' }}>
                                    <FontAwesomeIcon icon={faBars} className="me-2" />
                                    Categories
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to="/categories/all" className="text-black">All Products</Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/categories/juices" className="text-black">Juices</Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/categories/fruits" className="text-black">Fruits</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>

                        {/* Search Bar */}
                        <div className="d-flex justify-content-center flex-grow-1 position-relative">
                            <Form className="d-flex w-50 position-relative">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2 pe-5 search-input"
                                    aria-label="Search"
                                />
                                <span className="position-absolute end-0 top-50 translate-middle-y pe-3">
                                    <FontAwesomeIcon icon={faSearch} />
                                </span>
                            </Form>
                        </div>

                        {/* User and Cart Links */}
                        <Nav className="ms-auto">
                            <Nav.Link as={Link} to="/about" className="text-black mx-3">About</Nav.Link>
                            <Nav.Link as={Link} to="/contact" className="text-black mx-3">Contact</Nav.Link>

                            {/* Conditional Rendering for Logged-In User */}
                            {user ? (
                                <>
                                    {/* Display user's email prefix (before @) */}
                                    <Nav.Link disabled className="me-3">Hi, {getEmailPrefix(user.email)}</Nav.Link>
                                    <Nav.Link onClick={logout} className="text-black ms-2">Log Out</Nav.Link>
                                </>
                            ) : (
                                <Button variant="link" as={Link} to="/login" className="button-link me-2 text-black">
                                    <FontAwesomeIcon icon={faUser} className="me-1 green-icon" />
                                    Login
                                </Button>
                            )}

                            {/* Wishlist and Cart */}
                            <Button variant="link" as={Link} to="/wishlist" className="button-link me-2 text-black">
                                <FontAwesomeIcon icon={faHeart} className="me-1 green-icon" />
                                Wishlist
                            </Button>
                            <Button variant="link" as={Link} to="/cart" className="button-link text-black position-relative" onClick={updateCart}>
                                <FontAwesomeIcon icon={faShoppingCart} size="lg" className="green-icon" /> Cart
                                <span className="badge bg-danger position-absolute top-0 start-100 translate-middle badge-rounded-pill">
                                    {cart.itemCount}
                                </span>
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default NavScrollExample;
