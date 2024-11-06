import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import '../styles/Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [lastAddedProductId, setLastAddedProductId] = useState(null);
  const userId = "YOUR_USER_ID"; 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/all');
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    try {
      const response = await axios.post('http://localhost:5000/api/cart/addtocart', {
        userId,
        productId,
        quantity: 1 // Default quantity is 1
      });

      if (response.status === 200) {
        alert('Product added to cart!');
        setLastAddedProductId(productId);
        setTimeout(() => setLastAddedProductId(null), 3000);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('There was an error adding the product to your cart.');
    }
  };

  const addToWishlist = async (productId) => {
    try {
        const response = await axios.post('http://localhost:5000/api/wishlist/addtowishlist', {
            productId // Just pass the productId
        });

        if (response.status === 200) {
            alert('Product added to wishlist!');
        } else {
            alert(response.data.message);
        }
    } catch (error) {
        console.error('Error adding to wishlist:', error);
        alert('Product Is Already In Wishlist.');
    }
};


  return (
    <Container>
      <h2 className="text-center my-4">Products</h2>
      <Row>
        {products.map(product => (
          <Col key={product._id} md={3} className="mb-4">
            <Card>
              <Card.Img variant="top" src={product.image || 'placeholder.jpg'} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>Price: ${product.price}</Card.Text>
                <div className="button-group">
                  <Button 
                    variant="success" 
                    onClick={() => addToCart(product._id)}
                    className="w-100"
                  >
                    Add to Cart
                  </Button>
                  <Button 
                    variant="outline-success" 
                    onClick={() => addToWishlist(product._id)} // Pass product ID
                    className="wishlist-button"
                  >
                    <FaHeart />
                  </Button>
                </div>
                {lastAddedProductId === product._id && (
                  <p className="success-message mt-2">Product added to cart!</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="text-center my-4">
        <Link to="/cart">
          <Button variant="success">Go To Cart</Button> 
        </Link>
      </div>
    </Container>
  );
};

export default Products;
