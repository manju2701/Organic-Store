import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import '../styles/Cart.css';

const Cart = () => {
const [cart, setCart] = useState([]);
const [products, setProducts] = useState({});
const [removeMessage, setRemoveMessage] = useState('');
const [loading, setLoading] = useState(true);

const navigate = useNavigate();

useEffect(() => {
const fetchCart = async () => {
    setLoading(true);
    try {
        const response = await axios.get('http://localhost:5000/api/cart/allcartitems');
        const fetchedCart = Array.isArray(response.data.products) ? response.data.products : [];
        setCart(fetchedCart);
        fetchProductDetails(fetchedCart.map(item => item.productId));
    } catch (error) {
        console.error('Error fetching cart:', error);
    } finally {
        setLoading(false);
    }
};

fetchCart();
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

const removeFromCart = async (productId) => {
try {
    await axios.delete(`http://localhost:5000/api/cart/remove/${productId}`);
    const updatedCart = cart.filter(item => item.productId !== productId);
    setCart(updatedCart);
    setRemoveMessage('Product removed from cart!');
    setTimeout(() => setRemoveMessage(''), 3000);
} catch (error) {
    console.error('Error removing from cart:', error);
}
};

const updateQuantity = async (productId, quantity) => {
if (quantity <= 0) return;

try {
    await axios.post('http://localhost:5000/api/cart/updatequantity', {
        productId,
        quantity,
    });

    const updatedCart = cart.map(item => item.productId === productId ? { ...item, quantity } : item);
    setCart(updatedCart);
} catch (error) {
    console.error('Error updating quantity:', error);
}
};

const totalPrice = cart.reduce((total, item) => {
const product = products[item.productId];
return total + (product ? product.price * item.quantity : 0);
}, 0);

if (loading) {
return <p>Loading...</p>;
}

return (
<Container className="cart-container mt-4">
    <h2>Your Cart</h2>
    {removeMessage && <Alert variant="success">{removeMessage}</Alert>}
    <Row>
        {cart.length === 0 ? (
            <Col>
                <p>Cart is empty!</p>
            </Col>
        ) : (
            cart.map(item => {
                const product = products[item.productId];
                return (
                    <Col key={item.productId} md={4} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={product?.image || 'placeholder.jpg'} />
                            <Card.Body>
                                <Card.Title>{product?.name || 'Product Not Found'}</Card.Title>
                                <div className="cart-item-quantity">
                                    <Button
                                        variant="success"
                                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                        className="mx-1"
                                    >
                                        +
                                    </Button>
                                    <span>{item.quantity}</span>
                                    <Button
                                        variant="success"
                                        onClick={() => updateQuantity(item.productId, Math.max(item.quantity - 1, 1))}
                                        className="mx-1"
                                    >
                                        -
                                    </Button>
                                </div>
                                <Card.Text>
                                    Total: ${(product ? product.price * item.quantity : 0).toFixed(2)}
                                </Card.Text>
                                <Button variant="danger" onClick={() => removeFromCart(item.productId)}>
                                    Remove
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                );
            })
        )}
    </Row>
    {cart.length > 0 && (
        <div className="cart-total">
            <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
        </div>
    )}
    <Link 
        to={{
            pathname: "/checkout",
            state: { cart, totalAmount: totalPrice, products }
        }} 
        className="continue-shopping"
    >
        <Button variant="primary">Proceed to Checkout</Button>
    </Link>
</Container>
);
};

export default Cart;
