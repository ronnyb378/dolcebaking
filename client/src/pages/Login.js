import React, { useState } from 'react'
import { Container, Form, Row, Col, Button, FloatingLabel } from 'react-bootstrap'

export default function Login() {

    // form state
    const [login, setLogin] = useState(false)

    // login states
    const [ loginUsername, setLoginUsername ] = useState('');
    const [ loginPassword, setLoginPassword ] = useState('');

    // sign up states
    const [ signupUsername, setSignupUsername ] = useState('');
    const [ signupEmail, setSignupEmail ] = useState('');
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ phoneNumber, setPhoneNumber ] = useState('');
    const [ signupPassword, setSignupPassword ] = useState('');
    const [ signupConfirmPassword, setSignupConfirmPassword ] = useState('')

    const handleLoginSubmit = (e) => {
        e.preventDefault()
        console.log('fetch')
        fetch('/api/v1/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: loginUsername,
                password: loginPassword,
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                console.log(data.success)
            }
        })
    }

    const handleSignupSubmit = (e) => {
        e.preventDefault()
        fetch('/api/v1/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: signupUsername,
                email: signupEmail,
                first_name: firstName,
                last_name: lastName,
                phone_number: phoneNumber,
                password: signupPassword,
                confirmed_password: signupConfirmPassword
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                console.log(data.success)
            } else {
                console.log(data.error)
            }
        })
    }

    const handleFormChange = (e) => {
        e.preventDefault()
        setLogin(!login)
    }


    return (
        <div>
            <Container className="pt-4 login-form" fluid>
                <Row className="justify-content-center">
                    {login === true ? (
                        <Col>
                            <h2>Sign Up</h2>
                            <Form className="signUpForm" onSubmit={handleSignupSubmit}>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="firstName">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control size="lg" placeholder="John"
                                        value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="lastName">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control size="lg" placeholder="Doe"
                                        value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                                    </Form.Group>
                                </Row>
                                <Form.Group className="mb-3" controlId="signUpEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control size="lg" type="email" placeholder="example@example.com"
                                    value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="username">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control size="lg" placeholder="BunnieCakes123"
                                        value={signupUsername} onChange={(e) => setSignupUsername(e.target.value)} />
                                    </Form.Group>
                                <Form.Group className="mb-3" controlId="number">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control size="lg" placeholder="(123)456-7890"
                                    value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="signUpPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control size="lg" type="password" placeholder="Password"
                                    value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="confirmPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control size="lg" type="password" placeholder="Confirm Password"
                                    value={signupConfirmPassword} onChange={(e) => setSignupConfirmPassword(e.target.value)} />
                                </Form.Group>
                                <Button variant="primary" type="submit" size="lg">
                                    Create Account
                                </Button>
                                <p onClick={(e) => handleFormChange(e)}>Already have an account? Sign in here.</p>
                            </Form>
                        </Col>

                    ) : (

                        <Col >
                            <h2>Log in</h2>
                            <Form onSubmit={handleLoginSubmit}>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Email address"
                                    className="mb-3"
                                >
                                    <Form.Control size="lg" type="email" placeholder="name@example.com" 
                                    value={loginUsername}
                                    onChange={e => setLoginUsername(e.target.value)}/>
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingPassword" label="Password">
                                    <Form.Control size="lg" type="password" placeholder="Password" 
                                    value={loginPassword} onChange={e => setLoginPassword(e.target.value)}
                                    />
                                </FloatingLabel>
                                <Form.Check
                                    type="checkbox"
                                    label="Keep me signed in"
                                />
                                <Button size="lg" type="submit">Sign in</Button>
                                <Button className="guestBtn" size="lg">
                                    Sign in as Guest
                                </Button>
                                <Button onClick={(e) => handleFormChange(e)} className="accountBtn" size="lg">Create an Account</Button>
                            </Form>
                        </Col>
                    )}
                </Row>
            </Container>
        </div>
    )
}
