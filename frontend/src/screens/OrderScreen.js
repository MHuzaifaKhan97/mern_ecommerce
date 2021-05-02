import React, { useEffect, useState } from 'react';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrder } from '../actions/orderActions';

const OrderScreen = ({ match }) => {

    const orderId = match.params.id;

    const cart = useSelector(state => state.cart);

    
    const orderDetails = useSelector(state => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const dispatch = useDispatch();
  
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    }    
    if(!loading){
        // Calculate Prices
        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0));
    }

    // Shipping Price
    cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 100;

    // Tax Price
    cart.taxPrice = Number((0.15) * cart.itemsPrice);

    // Total Price
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2);


    useEffect(() => {

        dispatch(getOrder(orderId));

    }, [dispatch, orderId])

    return loading ? <Loader /> :  error ? <Message variant="danger" > {error}</Message> :
            <>
                <h1>Order ID: {order._id}</h1>
                <Row>
                    <Col md={8}>
                        <ListGroup variant="flush" >
                            <ListGroup.Item>
                                <h2>Shipping</h2>
                                <p><strong style={{ fontWeight: 'bold' }}>Name: </strong>{order.user.name} </p>
                                <p><strong style={{ fontWeight: 'bold' }}>Email: </strong>
                                    <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                                </p>
                                <p>
                                    <strong style={{ fontWeight: 'bold' }}>Address:</strong>
                                    {order.shippingAddress.address}, {' '}
                                    {order.shippingAddress.city},{' '}
                                    {order.shippingAddress.postalCode},{' '}
                                    {order.shippingAddress.country}
                                </p>
                                {order.isDelivered ? 
                                    <Message variant="success">Delivered on {order.deliveredAt}</Message>:
                                    <Message variant="warning">Not Delivered  </Message>
                                 }
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <p>
                                <strong style={{ fontWeight: 'bold' }}>Method: </strong>
                                {order.paymentMethod}
                                </p>
                                {order.isPaid ? 
                                    <Message variant="success">Paid on {order.paidAt}</Message>:
                                    <Message variant="warning">Not Paid  </Message>
                                 }
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Order Items</h2>
                                {
                                    order.orderItems.length === 0 ?
                                        <Message>Order is empty</Message> :
                                        (
                                            <ListGroup variant="flush">
                                                {order.orderItems.map((item, index) => {
                                                    return <ListGroup.Item key={index} >
                                                        <Row>
                                                            <Col md={1}>
                                                                <Image alt={item.name} fluid rounded src={item.image} />
                                                            </Col>
                                                            <Col>
                                                                <Link to={`/product/${item.product}`} >
                                                                    {item.name}
                                                                </Link>
                                                            </Col>
                                                            <Col md={4}>
                                                                {item.qty} X {item.price} = ${item.qty * item.price}
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                })}
                                            </ListGroup>
                                        )
                                }
                            </ListGroup.Item>

                        </ListGroup>
                    </Col>

                    <Col md={4}>
                        <ListGroup >
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                          
                        </ListGroup>
                    </Col>
                </Row>

            </>
    }



export default OrderScreen
