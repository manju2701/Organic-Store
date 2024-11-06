import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/Juices.css';

// JuiceItem component to display individual juice details
const JuiceItem = ({ image, title, description, price, rating }) => {
    return (
        <div className="juice-item text-center">
            <img src={image} alt={title} className="juice-image" />
            <h2>{title}</h2>
            <p>{description}</p>
            <p>Price: ${price}</p>
            <p>Rating: {Array(rating).fill('⭐')}</p>
        </div>
    );
};

const Juices = () => {
    const juice = [
        {
            image: "https://websitedemos.net/organic-shop-02/wp-content/uploads/sites/465/2018/06/orage-juice-kariz-400x400.jpg",
            title: "Juice 1",
            description: "Fresh Orange Juice",
            price: "18.00",
            rating: 4,
        },
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGZ2TlBKWjNdTc4li9EhlMDsVoDF39kdrNlQ&s",
            title: "Juice 2",
            description: "Tropical Juice Mix",
            price: "20.00",
            rating: 5,
        },
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpbChJi1KLnUPJOJh03abnQ8GgamHbDjT9Lw&s",
            title: "Juice 3",
            description: "Mango Delight",
            price: "22.00",
            rating: 4,
        },
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSk5scnQmENbZLMfVB7FRoxCDlA4lPl_VwvA&s",
            title: "Juice 4",
            description: "Berry Blast",
            price: "19.00",
            rating: 5,
        },
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-1H0uYyl7CfGPd7cp67PV_EAcz4ErBWlDMg&s",
            title: "Juice 5",
            description: "Grapefruit Juice",
            price: "16.00",
            rating: 4,
        },
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqNCb9lNUiqgU6R6aNVXfylkOmx1lXCh4raw&s",
            title: "Juice 6",
            description: "Apple Juice",
            price: "15.00",
            rating: 5,
        },
    ];

    return (
        <Container>
            <h1 className="title text-center mb-4">Juices</h1>
            <Row>
                {juice.map((juiceItem, index) => (
                    <Col key={index} xs={12} sm={6} md={4}>
                        <JuiceItem {...juiceItem} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Juices;
