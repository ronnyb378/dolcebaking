import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import cart from '../images/dolce_cart.png'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { actionLoggedOut } from '../redux/actions/user'

export default function NavBar() {
    const dispatch = useDispatch()

    const { user, checked } = useSelector(state => state.user)

    const handleLogout = (e) => {
        e.preventDefault();
        fetch('/api/v1/users/logout')
        .then(res => res.json())
        .then(data => {
            dispatch(actionLoggedOut())
        })
    }   

    return (
        <div>
            <Navbar collapseOnSelect expand="sm">
                <Container className="mx-1" fluid>
                    <Navbar.Brand as={Link} to={"/"}>🍰 Dolce Desserts</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                        </Nav>
                        <Nav>
                            { checked && user ? (
                            <Nav.Link href="/logout" onClick={handleLogout}>Logout</Nav.Link>
                            ) : (<Nav.Link as={Link} to={"/login"}>Login</Nav.Link>)}
                            <Nav.Link as={Link} to={"/cart"} eventKey={2}>
                                <img src={cart} alt="shopping cart"/>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
