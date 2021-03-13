import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';

const HomeScreen = () => {

    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {
                    products.map(product => (
                        <Col sm={12} md={6} lg={4} xl={3} key={product._id} >
                            <Product product={product} />
                        </Col>
                    ))
                }
            </Row>
        </>
    )
}

export default HomeScreen;

const products = [
    {
        _id: '1',
        name: 'Demo Product 1',
        image: '/images/airpods.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores fugiat nemo laudantium. A suscipit officiis unde facilis praesentium.',
        brand: 'apple',
        categories: 'Electronics',
        price: 89.99,
        countInStock: 4,
        rating: 4.5,
        numReviews: 4,
    },
    {
        _id: '2',
        name: 'Demo Product 2',
        image: '/images/phone.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores fugiat nemo laudantium. A suscipit officiis unde facilis praesentium.',
        brand: 'apple',
        categories: 'Electronics',
        price: 89.99,
        countInStock: 4,
        rating: 4.5,
        numReviews: 4,
    },
    {
        _id: '3',
        name: 'Demo Product 3',
        image: '/images/alexa.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores fugiat nemo laudantium. A suscipit officiis unde facilis praesentium.',
        brand: 'apple',
        categories: 'Electronics',
        price: 89.99,
        countInStock: 4,
        rating: 4.5,
        numReviews: 4,
    },
    {
        _id: '4',
        name: 'Demo Product 4',
        image: '/images/mouse.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores fugiat nemo laudantium. A suscipit officiis unde facilis praesentium.',
        brand: 'samsung',
        categories: 'Electronics',
        price: 89.99,
        countInStock: 4,
        rating: 4.5,
        numReviews: 4,
    },
    {
        _id: '5',
        name: 'Demo Product 5',
        image: '/images/phone.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores fugiat nemo laudantium. A suscipit officiis unde facilis praesentium.',
        brand: 'apple',
        categories: 'Electronics',
        price: 89.99,
        countInStock: 4,
        rating: 4.5,
        numReviews: 3.5,
    },
    {
        _id: '6',
        name: 'Demo Product 6',
        image: '/images/playstation.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores fugiat nemo laudantium. A suscipit officiis unde facilis praesentium.',
        brand: 'apple',
        categories: 'Electronics',
        price: 89.99,
        countInStock: 4,
        rating: 4.5,
        numReviews: 4,
    },
    {
        _id: '7',
        name: 'Demo Product 7',
        image: '/images/sample.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores fugiat nemo laudantium. A suscipit officiis unde facilis praesentium.',
        brand: 'apple',
        categories: 'Electronics',
        price: 89.99,
        countInStock: 4,
        rating: 4.5,
        numReviews: 5,
    }

]