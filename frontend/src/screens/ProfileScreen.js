import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/Message';
import Meta from '../components/Meta';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';

const ProfileScreen = ({ location, history }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;

    // Check User is Logged In
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    // Get Success Bool of User updated or not.
    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success } = userUpdateProfile;


    const orderListMy = useSelector(state => state.orderListMy);
    const { loading: loadingOrders, orders } = orderListMy;

    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        } else {
            if (!user?.name) {
                dispatch(getUserDetails('profile'));
                dispatch(listMyOrders());

            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, history, userInfo, user, loadingOrders])

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Password does not match.")
        }
        else {
            // Dispatch Update Profile
            dispatch(updateUserProfile({ id: user._id, name, email, password }));
        }
    }

    return (
        <Row  style={{paddingTop:'120px'}}>
            <Meta title="E-Shop | Profile" />

            <Col md={3}>
                <h2>User Profile</h2>
                {error && <Message variant="danger" >{error}</Message>}
                {success && <Message variant="success" >{`Profile Updated`}</Message>}
                {message && <Message variant="danger" >{message}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Name"
                            value={name}
                            onChange={e => setName(e.target.value)} >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)} >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)} >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter Confirm Password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)} >
                        </Form.Control>
                    </Form.Group>

                    <Button type="submit" variant="primary"  >Update</Button>
                </Form>

            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
                
                    {/* loadingOrders ? <Loader /> : errorOrders ? <Message variant="danger">{errorOrders}</Message> :  */}
                    
                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                            <td>ID</td>
                            <td>DATE</td>
                            <td>TOTAL</td>
                            <td>PAID</td>
                            <td>DELIVERED</td>
                            <td>DETAILS</td>
                            <tr></tr>
                        </thead>
                        <tbody>
                            {
                             orders &&  orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>{order.totalPrice}</td>
                                        <td>{order.isPaid ? order.paidAt.substring(0, 10) : (<i className="fas fa-times text-danger" ></i>)}</td>
                                        <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : (<i className="fas fa-times text-danger" ></i>)}</td>
                                        <td>
                                            <LinkContainer to={`/order/${order._id}`}>
                                                <Button className="btn-sm" variant='light'>Details</Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                    {/* <h3 className="text-center" >No Orders Found</h3> */}
                
            </Col>
        </Row>
    )
}

export default ProfileScreen;
