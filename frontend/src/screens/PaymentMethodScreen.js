import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import Meta from '../components/Meta';

const PaymentMethodScreen = ({ history }) => {

    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    if (!shippingAddress) {
        history.push('/shipping');
    }

    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('Paypal')


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push('/placeorder')
    }
    return (
        <FormContainer>
        <Meta title="E-Shop | Payments" />
        <div  style={{paddingTop:'120px'}} ></div>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>

            <Form onSubmit={submitHandler}>
                <Form.Group controlId="address">
                    <Form.Label as='legend' >Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type="radio"
                            label="PayPal or Credit Card"
                            id="PayPal"
                            name="paymentMethod"
                            value="PayPal"
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>

                        <Form.Check
                            type="radio"
                            label="Stripe"
                            id="Stripe"
                            name="paymentMethod"
                            value="Stripe"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>

                        <Form.Check
                            type="radio"
                            label="Cash On Delivery"
                            id="COD"
                            name="paymentMethod"
                            value="COD"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </Col>
                </Form.Group>
                <Button type="submit" variant="primary" className="mt-3">Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentMethodScreen
