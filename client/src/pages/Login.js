import React from 'react'
import { Container, Form, Row, Col, Button, FloatingLabel } from 'react-bootstrap'

export default function Login() {
    return (
        <div>
            <Container className="pt-4 login-form" fluid>
                <h2>Log in </h2>
                <Row className="justify-content-center">
                    <Col >
                        {/* <h2>Login</h2> */}
                        <Form>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email address"
                                className="mb-3"
                            >
                                <Form.Control size="lg" type="email" placeholder="name@example.com" />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingPassword" label="Password">
                                <Form.Control size="lg" type="password" placeholder="Password" />
                            </FloatingLabel>
                            <Button size="lg" type="submit">Sign in</Button>
                        </Form>
                        <Button className="accountBtn" size="lg">Create an Account</Button>
                    </Col>
                    {/* <Col>
                        <Form>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="firstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control size="lg" placeholder="John" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="lastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control size="lg" placeholder="Doe" />
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3" controlId="signUpEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control size="lg" type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="number">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control size="lg" type="email" placeholder="(123)456-7890" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="signUpPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control size="lg" type="password" placeholder="Password" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="confirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control size="lg" type="password" placeholder="Confirm Password" />
                            </Form.Group>

                            <Button variant="primary" type="submit" size="lg">
                                Submit
                            </Button>
                        </Form>
                    </Col> */}
                </Row>
            </Container>
        </div>
    )
}
