import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import cart from '../images/dolce_cart.png'
import { Link } from 'react-router-dom'

export default function NavBar() {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg">
                <Container className="mx-1" fluid>
                    <Navbar.Brand as={Link} to={"/"}>🍰 Dolce Desserts</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                        </Nav>
                        <Nav>
                            <Nav.Link as={Link} to={"/login"}>Login</Nav.Link>
                            <Nav.Link as={Link} to={"/cart"} eventKey={2} href="/cart">
                                <img src={cart} alt="shopping cart"/>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
