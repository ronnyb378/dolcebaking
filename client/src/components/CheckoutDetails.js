import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React from 'react'
import { Container, Form, Row, Col } from 'react-bootstrap'

export default function CheckoutDetails() {
    const stripe = useStripe()
    const elements = useElements()


    return (
        <div>
            <h2>Check Out Page</h2>
            <Container className="pt-4 checkout-form">
                <Row className="justify-content-center">
                    <Col className="checkout-col">
                    <Form>
                        <h4>Contact Information</h4>
                        <Form.Floating className="mb-2">
                            <Form.Control
                                id="floatingNameCustom"
                                type="text"
                                placeholder="Ronny Barahona"
                            />
                            <label htmlFor="floatingNameCustom">Name</label>
                        </Form.Floating>
                        <Form.Floating className="mb-2">
                            <Form.Control
                                id="floatingEmailCustom"
                                type="email"
                                placeholder="google@google.com"
                            />
                            <label htmlFor="floatingEmailCustom">Email</label>
                        </Form.Floating>
                        <Form.Floating className="mb-2">
                            <Form.Control
                                id="floatingNumCustom"
                                type="tel"
                                placeholder="1234567890"
                                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                            />
                            <label htmlFor="floatingNumCustom">Number</label>
                        </Form.Floating>
                        <h4>Billing information</h4>
                        <Form.Floating className="mb-2">
                            <Form.Control
                                id="floatingCardNameCustom"
                                type="text"
                                placeholder="Ronny Barahona"
                            />
                            <label htmlFor="floatingCardNameCustom">Name</label>
                        </Form.Floating>
                        <Form.Floating className="mb-2">
                            <Form.Control
                                id="floatingAddressCustom"
                                type="text"
                                placeholder="1234 Address Ln"
                            />
                            <label htmlFor="floatingAddressCustom">Address 1</label>
                        </Form.Floating>
                        <Form.Floating className="mb-2">
                            <Form.Control
                                id="floatingAddress2Custom"
                                type="text"
                                placeholder="Studio, Floor"
                            />
                            <label htmlFor="floatingAddress2Custom">Address 2</label>
                        </Form.Floating>
                        <Row className="mb-2">
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Floating className="mb-2">
                                    <Form.Control
                                        id="floatingCityCustom"
                                        type="text"
                                        placeholder="Houston"
                                    />
                                    <label htmlFor="floatingCityCustom">City</label>
                                </Form.Floating>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Floating className="mb-2">
                                    <Form.Control
                                        id="floatingStateCustom"
                                        type="text"
                                        placeholder="Texas"
                                    />
                                    <label htmlFor="floatingStateCustom">State</label>
                                </Form.Floating>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Floating className="mb-2">
                                    <Form.Control
                                        id="floatingZipCustom"
                                        type="text"
                                        placeholder="000000"
                                    />
                                    <label htmlFor="floatingZipCustom">Zip</label>
                                </Form.Floating>
                            </Form.Group>
                        </Row>
                        <h4>Card Details</h4>
                        <CardElement />
                    </Form>
                </Col>
                </Row>
            </Container>
        </div>
    )
}
