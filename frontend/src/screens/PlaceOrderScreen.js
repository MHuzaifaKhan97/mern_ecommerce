import React, { useEffect } from 'react';
import { Button, Row, Col, ListGroup, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Message from '../components/Message';
import Meta from '../components/Meta';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';

const PlaceOrderScreen = ({ history }) => {

    const cart = useSelector(state => state.cart);

    const dispatch = useDispatch();

    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    }

    // Calculate Prices
    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));

    // Shipping Price
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);

    // Tax Price
    cart.taxPrice = addDecimals(Number((0.15) * cart.itemsPrice));

    // Total Price
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2);


    const orderCreate = useSelector(state => state.orderCreate);
    const { order, success, error } = orderCreate;

    useEffect(() => {
        if (success) {
            history.push(`order/${order._id}`)
        }
        // eslint-disable-next-line
    }, [history, success])
    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            taxPrice: cart.taxPrice,
            shippingPrice: cart.shippingPrice,
            totalPrice: cart.totalPrice,
        }));
    }

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
        <Meta title="E-Shop | Place Order" />

            <Row>
                <Col md={8}>
                    <ListGroup variant="flush" >
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong style={{ fontWeight: 'bold' }}>Address:</strong>
                                {cart.shippingAddress.address}, {' '}
                                {cart.shippingAddress.city},{' '}
                                {cart.shippingAddress.postalCode},{' '}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong style={{ fontWeight: 'bold' }}>Method: </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {
                                cart.cartItems.length === 0 ?
                                    <Message>Your cart is empty</Message> :
                                    (
                                        <ListGroup variant="flush">
                                            {cart.cartItems.map((item, index) => {
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
                    <ListGroup>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${cart.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>${cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {error && <Message variant='danger' >{error}</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                type="button"
                                className="btn-block"
                                disabled={cart.cartItems === 0}
                                onClick={placeOrderHandler}>
                                Place Order</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </>
    )
}


export default PlaceOrderScreen
