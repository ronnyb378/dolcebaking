import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useState } from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const initialContactInfo = {
    name: '',
    email: '',
    number: ''
}

const initialBillingInfo = {
    line1: '',
    line2: '',
    city: '',
    state: '',
    postal_code: '',
}

export default function CheckoutDetails() {
    const cartValues = useSelector(state => state.cartValues)

    const stripe = useStripe()
    const elements = useElements()

    const [contactInfo, setContactInfo] = useState({ ...initialContactInfo })
    const [billingInfo, setBillingInfo] = useState({ ...initialBillingInfo })
    const [nameOnCard, setNameOnCard] = useState('')

    const handleContact = (e) => {
        const { name, value } = e.target;
        setContactInfo({
            ...contactInfo,
            [name]: value
        })
    }

    const handleBilling = e => {
        const { name, value } = e.target;
        setBillingInfo({
            ...billingInfo,
            [name]: value
        })
    }

    const handleFormSubmit = async e => {
        e.preventDefault();

        if (
            !contactInfo.name || !contactInfo.email || !contactInfo.number ||
            !billingInfo.line1 || !billingInfo.city || !billingInfo.state ||
            !billingInfo.postal_code || !nameOnCard
        ) {
            return
        }
        fetch('/api/v1/orders/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: cartValues.cartTotal * 100,
                billing: {
                    name: nameOnCard,
                    address: {
                        ...billingInfo
                    }
                }
            })
        })
        .then(res => res.json())
        .then(({clientSecret}) => {            
            stripe.createPaymentMethod({
                type: "card",
                card: elements.getElement(CardElement),
                billing_details: {
                    name: nameOnCard,
                    address: {
                        ...billingInfo
                    }
                }
            })
            .then(({ paymentMethod }) => {
                console.log('hello 2')
                stripe.confirmCardPayment(clientSecret, {
                    payment_method: paymentMethod.id
                })
                    .then(({ paymentIntent }) => {
                        console.log(paymentIntent)
                    })
            })
        })
    }

    const configCardElement = {
        iconStyle: 'solid',
        style: {
            base: {
                fontSize: '16px'
            }
        },
        hidePostalCode: true
    };

    return (
        <div>
            <h2>Check Out Page</h2>
            <Container className="pt-4 checkout-form">
                <Row className="justify-content-center">
                    <Col className="checkout-col">
                        <Form onSubmit={handleFormSubmit}>
                            <h4>Contact Information</h4>
                            <Form.Floating className="mb-2">
                                <Form.Control
                                    required
                                    id="floatingNameCustom"
                                    type="text"
                                    placeholder="Ronny Barahona"
                                    name="name"
                                    value={contactInfo.name}
                                    onChange={(e) => handleContact(e)}
                                />
                                <label htmlFor="floatingNameCustom">Name</label>
                            </Form.Floating>
                            <Form.Floating className="mb-2">
                                <Form.Control
                                    required
                                    id="floatingEmailCustom"
                                    type="email"
                                    placeholder="google@google.com"
                                    name="email"
                                    value={contactInfo.email}
                                    onChange={(e) => handleContact(e)}
                                />
                                <label htmlFor="floatingEmailCustom">Email</label>
                            </Form.Floating>
                            <Form.Floating className="mb-2">
                                <Form.Control
                                    required
                                    id="floatingNumCustom"
                                    type="tel"
                                    placeholder="1234567890"
                                    name="number"
                                    value={contactInfo.number}
                                    onChange={(e) => handleContact(e)}
                                />
                                <label htmlFor="floatingNumCustom">Number</label>
                            </Form.Floating>
                            <h4>Billing information</h4>
                            <Form.Floating className="mb-2">
                                <Form.Control
                                    required
                                    id="floatingCardNameCustom"
                                    type="text"
                                    placeholder="Ronny Barahona"
                                    name="nameOnCard"
                                    value={nameOnCard}
                                    onChange={(e) => setNameOnCard(e.target.value)}
                                />
                                <label htmlFor="floatingCardNameCustom">Name</label>
                            </Form.Floating>
                            <Form.Floating className="mb-2">
                                <Form.Control
                                    required
                                    id="floatingAddressCustom"
                                    type="text"
                                    placeholder="1234 Address Ln"
                                    name="line1"
                                    value={billingInfo.line1}
                                    onChange={(e) => handleBilling(e)}
                                />
                                <label htmlFor="floatingAddressCustom">Address 1</label>
                            </Form.Floating>
                            <Form.Floating className="mb-2">
                                <Form.Control
                                    id="floatingAddress2Custom"
                                    type="text"
                                    placeholder="Studio, Floor"
                                    name="line2"
                                    value={billingInfo.line2}
                                    onChange={(e) => handleBilling(e)}
                                />
                                <label htmlFor="floatingAddress2Custom">Address 2</label>
                            </Form.Floating>
                            <Row className="mb-2">
                                <Form.Group as={Col}>
                                    <Form.Floating className="mb-2">
                                        <Form.Control
                                            required
                                            id="floatingCityCustom"
                                            type="text"
                                            placeholder="Houston"
                                            name="city"
                                            value={billingInfo.city}
                                            onChange={(e) => handleBilling(e)}
                                        />
                                        <label htmlFor="floatingCityCustom">City</label>
                                    </Form.Floating>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Floating className="mb-2">
                                        <Form.Control
                                            required
                                            id="floatingStateCustom"
                                            type="text"
                                            placeholder="Texas"
                                            name="state"
                                            value={billingInfo.state}
                                            onChange={(e) => handleBilling(e)}
                                        />
                                        <label htmlFor="floatingStateCustom">State</label>
                                    </Form.Floating>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Floating className="mb-2">
                                        <Form.Control
                                            required
                                            id="floatingZipCustom"
                                            type="text"
                                            placeholder="000000"
                                            name="postal_code"
                                            value={billingInfo.postal_code}
                                            onChange={(e) => handleBilling(e)}
                                        />
                                        <label htmlFor="floatingZipCustom">Zip</label>
                                    </Form.Floating>
                                </Form.Group>
                            </Row>
                            <h4>Card Details</h4>
                            <CardElement options={configCardElement} />
                            <Button type="submit">Pay Now</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
