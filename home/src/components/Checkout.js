import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, ListGroup } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Destructure cart, totalAmount, and products from location.state
  const { cart = [], totalAmount = 0, products = {} } = location.state || {};

  const [shippingDetails, setShippingDetails] = useState({
    address: '',
    city: '',
    zipCode: '',
    country: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    // Ensure all fields are filled out
    if (!shippingDetails.address || !shippingDetails.city || !shippingDetails.zipCode || !shippingDetails.country) {
      setError('Please fill in all shipping details');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/cart/checkout', {
        shippingDetails,
        paymentMethod,
        cart
      });

      const result = response.data;
      if (response.status === 200) {
        setMessage('Checkout successful!');
        setShippingDetails({
          address: '',
          city: '',
          zipCode: '',
          country: ''
        });
        setError('');
      } else {
        setError(result.message || 'An error occurred during checkout');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setError('An error occurred during checkout');
    }
  };

  return (
    <Container>
      <Row>
        <Col md={8}>
          <Card>
            <Card.Header>
              <h3>Cart Summary</h3>
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}
              <ListGroup variant="flush">
                {cart.length === 0 ? (
                  <ListGroup.Item>Your cart is empty</ListGroup.Item>
                ) : (
                  cart.map((item, index) => {
                    const product = products[item.productId];
                    return (
                      <ListGroup.Item key={index}>
                        <div>
                          <strong>{product?.name || 'Product not found'}</strong> - 
                          Quantity: {item.quantity} - 
                          Price: ${(product ? product.price : 0).toFixed(2)}
                        </div>
                      </ListGroup.Item>
                    );
                  })
                )}
              </ListGroup>
              <hr />
              <h5>Total Amount: ${totalAmount ? totalAmount.toFixed(2) : '0.00'}</h5>
            </Card.Body>
          </Card>

          <div className="mt-3 text-center">
            <Button variant="secondary" onClick={() => navigate('/categories/all')}>
              Continue Shopping
            </Button>
          </div>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Header>
              <h3>Shipping Details</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleCheckout}>
                <Form.Group controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={shippingDetails.address}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="city">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={shippingDetails.city}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="zipCode">
                  <Form.Label>Zip Code</Form.Label>
                  <Form.Control
                    type="text"
                    name="zipCode"
                    value={shippingDetails.zipCode}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="country">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    name="country"
                    value={shippingDetails.country}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="paymentMethod">
                  <Form.Label>Payment Method</Form.Label>
                  <Form.Check
                    type="radio"
                    label="Cash on Delivery (COD)"
                    name="paymentMethod"
                    value="COD"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                  />
                </Form.Group>

                <div className="d-flex justify-content-end">
                  <Button variant="primary" type="submit">
                    Proceed to Checkout
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
