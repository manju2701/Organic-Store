import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Card, Container, Row, Col, Alert } from 'react-bootstrap';
import '../styles/Wishlist.css';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [products, setProducts] = useState({});
    const [removeMessage, setRemoveMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const userId = "YOUR_USER_ID"; // Replace with actual user ID logic

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/wishlist/allwishlistitems`);
                setWishlist(response.data.products || []);
                fetchProductDetails(response.data.products.map(item => item.productId));
            } catch (error) {
                console.error('Error fetching wishlist:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchWishlist();
    }, []);

    const fetchProductDetails = async (productIds) => {
        if (!productIds.length) return;

        try {
            const response = await axios.get('http://localhost:5000/api/products/all');
            const productList = response.data.products;
            const productMap = productList.reduce((acc, product) => {
                acc[product._id] = product;
                return acc;
            }, {});
            setProducts(productMap);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    const removeFromWishlist = async (productId) => {
        try {
            await axios.delete(`http://localhost:5000/api/wishlist/remove/${productId}`);
            const updatedWishlist = wishlist.filter(item => item.productId !== productId);
            setWishlist(updatedWishlist);
            setRemoveMessage('Product removed from wishlist!');
            setTimeout(() => setRemoveMessage(''), 3000);
        } catch (error) {
            console.error('Error removing from wishlist:', error);
        }
    };

    const addToCart = async (productId) => {
        try {
            await axios.post('http://localhost:5000/api/cart/addtocart', {
                userId,
                productId,
                quantity: 1,
            });
            alert('Product added to cart!');
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('There was an error adding the product to your cart.');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <Container className="wishlist-container mt-4">
            <h2>Your Wishlist</h2>
            {removeMessage && <Alert variant="success">{removeMessage}</Alert>}
            <Row>
                {wishlist.length === 0 ? (
                    <Col>
                        <p>Wishlist is empty!</p>
                    </Col>
                ) : (
                    wishlist.map(item => {
                        const product = products[item.productId];
                        return (
                            <Col key={item.productId} md={4} className="mb-4">
                                <Card>
                                    <Card.Img variant="top" src={product?.image || 'placeholder.jpg'} />
                                    <Card.Body>
                                        <Card.Title>{product?.name || 'Product Not Found'}</Card.Title>
                                        <Card.Text>Price: ${product?.price}</Card.Text>
                                        <Button variant="danger" onClick={() => removeFromWishlist(item.productId)}>
                                            Remove
                                        </Button>
                                        <Button variant="primary" onClick={() => addToCart(product._id)}>
                                            Add to Cart
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })
                )}
            </Row>
            <Link to="/" className="continue-shopping">
                <Button variant="primary">Continue Shopping</Button>
            </Link>
        </Container>
    );
};

export default Wishlist;
