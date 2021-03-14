import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';

const ProductScreen = ({ match }) => {
    const product = products.find(p => p._id === match.params.id)
    console.log(product);
    return (
        <>
            <Link className="btn btn-light my-3" to="/" >Go Back </Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>Price: ${product.price}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p>Description: ${product.description}</p>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush" >
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Price:
                                    </Col>
                                    <Col>
                                        <strong>{product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Status:
                                    </Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button className="btn-block" type="button" disabled={product.countInStock === 0} >Add to Cart</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default ProductScreen;



const products = [
    {
        _id: '1',
        name: 'Demo Product 1',
        image: '/images/airpods.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores fugiat nemo laudantium. A suscipit officiis unde facilis praesentium.',
        brand: 'apple',
        categories: 'Electronics',
        price: 89.99,
        countInStock: 0,
        rating: 4.5,
        numReviews: 2,
    },
    {
        _id: '2',
        name: 'Demo Product 2',
        image: '/images/phone.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores fugiat nemo laudantium. A suscipit officiis unde facilis praesentium.',
        brand: 'apple',
        categories: 'Electronics',
        price: 89.99,
        countInStock: 12,
        rating: 3.5,
        numReviews: 7,
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
        rating: 2.5,
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
        countInStock: 3,
        rating: 5,
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
        rating: 5,
        numReviews: 10,
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