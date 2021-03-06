import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import SearchBox from './SearchBox';

const Header = () => {

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(logout());
    }
    return (
        <header>
            <Navbar bg="dark" expand="md" variant="dark" collapseOnSelect className="fixed-top" >
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand> <img src="/logo192.png" alt="Logo" width="30" height="30" />  E-Shop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" >
                        <Route render={({ history }) => <SearchBox history={history} />} />
                        <Nav className="ml-auto">
                            <LinkContainer to='/cart' >
                                <Nav.Link><i className="fas fa-shopping-cart" />  Cart</Nav.Link>

                            </LinkContainer>
                            {
                                userInfo ? (
                                    <NavDropdown title={userInfo.name} id="username" >
                                        <LinkContainer to='/profile' >
                                            <NavDropdown.Item>
                                                Profile
                                            </NavDropdown.Item>

                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler} >
                                            Logout
                                            </NavDropdown.Item>
                                    </NavDropdown>
                                ) :
                                    (<LinkContainer to='/login' >
                                        <Nav.Link><i className="fas fa-user" /> Sign In</Nav.Link>

                                    </LinkContainer>)
                            }
                            {
                                userInfo && userInfo.isAdmin &&
                                <NavDropdown title='Admin' id="admin" >
                                    <LinkContainer to='/admin/userlist' >
                                        <NavDropdown.Item>
                                            Users
                                            </NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/productlist' >
                                        <NavDropdown.Item>
                                            Products
                                            </NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/orderlist' >
                                        <NavDropdown.Item>
                                            Orders
                                            </NavDropdown.Item>
                                    </LinkContainer>

                                </NavDropdown>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header;
