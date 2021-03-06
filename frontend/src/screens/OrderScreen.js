import React, { useEffect, useState } from 'react';
import { Button, Row, Col, ListGroup, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { PayPalButton } from 'react-paypal-button-v2';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Meta from '../components/Meta';
import Loader from '../components/Loader';
import { getOrder, payOrder, deliverOrder } from '../actions/orderActions';
import { ORDER_PAY_RESET, ORDER_DELIVERED_RESET } from '../constants/orderConstants';

const OrderScreen = ({ match, history }) => {

    const orderId = match.params.id;

    //For PayPal
    const [sdkReady, setSdkReady] = useState(false);

    const cart = useSelector(state => state.cart);

    const orderDetails = useSelector(state => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    //For PayPal
    const orderPay = useSelector(state => state.orderPay);
    const { success: successPay, loading: loadingPay } = orderPay;

    const orderDeliver = useSelector(state => state.orderDeliver);
    const { success: successDeliver, loading: loadingDeliver } = orderDeliver;


    const dispatch = useDispatch();

    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    }
    if (!loading) {
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

        if (!userInfo) {
            history.push('/login')
        }

        // Paypal work
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            }
            document.body.appendChild(script);
        }

        if (!order || successPay || successDeliver) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVERED_RESET })
            dispatch(getOrder(orderId));
        }
        else if (!order.isPaid) {
            if (window.paypal) {
                addPayPalScript();
            } else {
                setSdkReady(true);
            }
        }
    }, [dispatch, orderId, successPay, successDeliver, order, history, userInfo])

    // For Paypal
    const successPaymentHandler = (paymentResult) => {
        if(JSON.parse(localStorage.getItem('paymentMethod')) === "COD"){
        console.log(userInfo.email)
        // const paymentResult = {
        //     id: `order${orderId.substring(0,19)}`,
        //     status:'paid',
        //     update_time: Date.now(),
        //     email_address:userInfo.email,
        // }
            dispatch(payOrder(orderId));
        }
        else{
            dispatch(payOrder(orderId, paymentResult));
        }
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    return loading ? <Loader /> : error ? <Message variant="danger" > {error}</Message> :
        <>
            <h1  style={{paddingTop:'120px'}} >Order ID: {order._id}</h1>
            <Row>
        <Meta title="E-Shop | Order Confirmation" />

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
                                <Message variant="success">Delivered on {order.deliveredAt}</Message> :
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
                                <Message variant="success">Paid on {order.paidAt}</Message> :
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
                        {
                            !order.isPaid && JSON.parse(localStorage.getItem('paymentMethod')) === "COD" && (
                                <ListGroup.Item>
                                    <Button type='button' className='btn btn-block'
                                        amount={order.totalPrice}
                                        onClick={successPaymentHandler}
                                    >Pay </Button>
                                    

                                </ListGroup.Item>
                            ) }
                            {
                                !order.isPaid && JSON.parse(localStorage.getItem('paymentMethod')) === "PayPal" && (
                                    <ListGroup.Item>
                                        {loadingPay && <Loader />}
                                        {!sdkReady ? <Loader /> : (
                                            <PayPalButton
                                                amount={order.totalPrice}
                                                onSuccess={successPaymentHandler}
                                            />
                                        )}
                                    </ListGroup.Item>

                                )
                        }
                        {loadingDeliver && <Loader />}
                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <ListGroup.Item>
                                <Button type='button' className='btn btn-block' onClick={deliverHandler}>
                                    Mark As Delivered
                                </Button>
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Col>
            </Row>

        </>
}



export default OrderScreen
