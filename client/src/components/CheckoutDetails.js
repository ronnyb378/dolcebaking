import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useState, useEffect } from 'react'
import { Container, Form, Row, Col, Button, Alert } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { actionClearCart } from '../redux/actions/cart'
import { useHistory } from 'react-router'
import { actionSetError, actionSetSuccess } from '../redux/actions/status'

const initialContactInfo = {
    firstName: '',
    lastName: '',
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
    const cartData = useSelector(state => state)
    const dispatch = useDispatch()
    const history = useHistory()

    const stripe = useStripe()
    const elements = useElements()

    const [isLoading, setLoading] = useState(false)
    const [contactInfo, setContactInfo] = useState({ ...initialContactInfo })
    const [billingInfo, setBillingInfo] = useState({ ...initialBillingInfo })
    const [nameOnCard, setNameOnCard] = useState('')

    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });


    useEffect(() => {
        // console.log('useEffect ran')
        if (cartData.cart.cartItems < 1) {
            history.push('/')
        }

    }, [cartData.cart.cartItems, history])

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
        setLoading(true)

        if (
            !contactInfo.firstName || !contactInfo.lastName || !contactInfo.email || !contactInfo.number ||
            !billingInfo.line1 || !billingInfo.city || !billingInfo.state ||
            !billingInfo.postal_code || !nameOnCard
        ) {
            setLoading(false)
            return
        }
        const phoneReg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im //eslint-disable-line

        if (!contactInfo.number.match(phoneReg)) {
            dispatch(actionSetError({ error: 'Not a valid phone number' }))
            setLoading(false)
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
            .then(({ clientSecret }) => {
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
                .then(({ paymentMethod, error }) => {
                    if (!paymentMethod) {
                        setLoading(false);
                        dispatch(actionSetError({ error: error.message }))
                    } else {
                        stripe.confirmCardPayment(clientSecret, {
                            payment_method: paymentMethod.id
                        })
                        .then(({ paymentIntent, error }) => {
                            if (!paymentIntent) {
                                setLoading(false)
                                dispatch(actionSetError({ error: error.message}))
                            } else if (paymentIntent.status === 'succeeded') {
                                createOrder();
                            } else {
                                setLoading(false)
                            }
                        })
                    }
                })
            })
    }

    const createOrder = () => {
        fetch('/api/v1/orders/neworder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                value: cartData,
                firstName: contactInfo.firstName,
                lastName: contactInfo.lastName,
                email: contactInfo.email,
                number: contactInfo.number,
                completed: false
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setLoading(false)
                    dispatch(actionClearCart())
                    dispatch(actionSetSuccess(data))
                } else if (data.error) {
                    setLoading(false)
                    dispatch(actionSetError(data))
                }

            })
    }

    const configCardElement = {
        iconStyle: 'solid',
        style: {
            base: {
                iconColor: '#E86A92',
                fontSize: '16px',
                backgroundColor: '#fff',
                fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
                fontSmoothing: 'antialiased',
                '::placeholder': {
                    color: 'gray',
                },
            }
        },
        hidePostalCode: true
    };

    return (
        <div>
            <h2>Check Out</h2>
            <Container className="pt-4 pb-4 checkout-form">
                <Row className="justify-content-center">
                    <Col className="checkout-col pb-2">
                    <Alert style={{backgroundColor: "white"}}>
            Please note: Dolce Desserts is not accepting actual payments/orders at this time.
    </Alert>
                        <Form onSubmit={handleFormSubmit}>
                            <h4>Contact Information</h4>
                            <Row>
                                <Col>
                                    <Form.Floating className="mb-2">
                                        <Form.Control
                                            disabled={isLoading}
                                            required
                                            id="floatingNameCustom"
                                            type="text"
                                            placeholder="Ronny"
                                            name="firstName"
                                            value={contactInfo.firstName}
                                            onChange={(e) => handleContact(e)}
                                        />
                                        <label htmlFor="floatingNameCustom">First Name</label>
                                    </Form.Floating>
                                </Col>
                                <Col>
                                    <Form.Floating className="mb-2">
                                        <Form.Control
                                            disabled={isLoading}
                                            required
                                            id="floatingNameCustom"
                                            type="text"
                                            placeholder="Barahona"
                                            name="lastName"
                                            value={contactInfo.lastName}
                                            onChange={(e) => handleContact(e)}
                                        />
                                        <label htmlFor="floatingNameCustom">Last Name</label>
                                    </Form.Floating>
                                </Col>
                            </Row>
                            <Form.Floating className="mb-2">
                                <Form.Control
                                    disabled={isLoading}
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
                                    disabled={isLoading}
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
                                    disabled={isLoading}
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
                                    disabled={isLoading}
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
                                    disabled={isLoading}
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
                                            disabled={isLoading}
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
                                            disabled={isLoading}
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
                                            disabled={isLoading}
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
                            <div className="cardInputWrapper mb-4">
                                <CardElement options={configCardElement} />
                            </div>
                            <Button type="submit" disabled={isLoading}>{isLoading ? 'Processing...' : `Pay ${formatter.format(cartValues.cartTotal)}`}</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
