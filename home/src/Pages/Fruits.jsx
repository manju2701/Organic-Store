import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../styles/Fruits.css';

// FruitItem component to display individual fruit details
const FruitItem = ({ image, title, description, price, rating }) => {
    return (
        <Card className="fruit-item text-center">
            <Card.Img variant="top" src={image} alt={title} className="fruit-image" />
            <Card.Body>
                <Card.Title className="fruit-title">{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Card.Text className="fruit-price">Price: ${price}</Card.Text>
                <Card.Text className="fruit-rating">Rating: {Array(rating).fill('⭐')}</Card.Text>
            </Card.Body>
        </Card>
    );
};

const Fruits = () => {
    const fruits = [
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGHCoR_2AhmxthSdCLF6NHKe-xTFICRR6ugg&s",
            title: "Orange",
            description: "Freshly picked oranges.",
            price: "1.00",
            rating: 4,
        },
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpbkP8M5riy5W73dqBRrNG2tLz3615OAYHYQ&s",
            title: "Banana",
            description: "Ripe bananas from the tropics.",
            price: "0.50",
            rating: 5,
        },
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsH9bL7zOmPWLD_mrCO3kqM4dlM-0mdLYg7g&s",
            title: "Mango",
            description: "Sweet and juicy mangoes.",
            price: "1.50",
            rating: 4,
        },
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1AxagPzDdtWHZKAAW9kKmD8h5WIMujpXyzg&s",
            title: "Strawberry",
            description: "Fresh strawberries.",
            price: "2.00",
            rating: 5,
        },
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRURB4PXOa5mOgJLsQ0pvGB8VhUjMM_QHdKQQ&s",
            title: "Grapefruit",
            description: "Tangy grapefruit.",
            price: "1.20",
            rating: 4,
        },
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqn5kZOU45SY0-9By1R33rNbaox6BnYje7Hw&s",
            title: "Apple",
            description: "Crisp apples.",
            price: "1.00",
            rating: 5,
        },
    ];

    return (
        <Container>
            <h1 className="title text-center mb-4">Fruits</h1>
            <Row>
                {fruits.map((fruitItem, index) => (
                    <Col key={index} xs={12} sm={6} md={4}>
                        <FruitItem {...fruitItem} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Fruits;
