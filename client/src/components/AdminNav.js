import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function AdminNav() {

    const { user } = useSelector(state => state.user)

    if (!user || !user.email.includes('guest@apple.com')) {
        return null
    }

    return (
        <Navbar className="admin-nav">
            <Container className="mx-1" fluid>
                <Nav className="me-auto">
                </Nav>
                <Nav>
                    <Nav.Link as={Link} to={"/admin"}>My Admin</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}
