import React, { useState, useEffect } from 'react'
import { Container, Form, Row, Col, Button, FloatingLabel } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { actionLoggedIn } from '../redux/actions/user';
import { useHistory } from 'react-router-dom';
import { actionClearAlerts, actionSetError } from '../redux/actions/status';

export default function Login() {
    const dispatch = useDispatch()
    const history = useHistory()
    // form state
    const [login, setLogin] = useState(false)

    // login states
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    // sign up states
    // const [ signupUsername, setSignupUsername ] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupConfirmPassword, setSignupConfirmPassword] = useState('')

    const [ textColor, setTextColor ] = useState('crimson')

    // between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character

    useEffect(() => {
        const paswd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/

        if (signupPassword.match(paswd)) {
            setTextColor('forestgreen')
        } else {
            setTextColor('crimson')
        }
    }, [signupPassword])

    const handleLoginSubmit = (e) => {
        e.preventDefault()
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
                    dispatch(actionSetError(data))
                } else {
                    history.push('/')
                    dispatch(actionLoggedIn(data.user))
                    dispatch(actionClearAlerts())
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
                // username: signupUsername,
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
                    // history.push('/')
                    setLogin(!login)
                    setFirstName('');
                    setLastName('');
                    setSignupEmail('');
                    setPhoneNumber('');
                    setSignupPassword('');
                    setSignupConfirmPassword('');
                    console.log(data.success)
                    dispatch(actionClearAlerts())
                } else {
                    dispatch(actionSetError(data))
                }
            })
    }

    const handleFormChange = (e) => {
        dispatch(actionClearAlerts())
        e.preventDefault()
        setLogin(!login)
    }

    const handleGuestLogin = (e) => {
        e.preventDefault()
        fetch('/api/v1/users/login/guest')
            .then(res => res.json())
            .then(data => {
                dispatch(actionLoggedIn(data.user))
                dispatch(actionClearAlerts())
                history.push('/')
            })
    }


    return (
        <div>
            <Container className="pt-4 login-container" fluid>
                <Row className="justify-content-center">
                    {login === true ? (
                        <Col className="form-col">
                            <h4 className="pt-2 signup-title">Sign Up</h4>
                            <Form className="signUpForm pt-4" onSubmit={handleSignupSubmit}>
                                <Row>
                                    <Col>
                                        <FloatingLabel
                                            controlId="floatingFirst"
                                            label="First Name"
                                            className="mb-4">
                                            <Form.Control
                                                size="lg"
                                                type="text"
                                                placeholder="John"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)} />
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel
                                            controlId="FloatingLast"
                                            label="Last Name"
                                            className="mb-4">
                                            <Form.Control
                                                size="lg"
                                                type="text"
                                                placeholder="Doe"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)} />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                                <FloatingLabel
                                    controlId="FloatingEmail"
                                    label="Email Address"
                                    className="mb-4">
                                    <Form.Control size="lg" type="email" placeholder="example@example.com"
                                        value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)}
                                        />
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="FloatingPhoneNumber"
                                    label="Phone Number"
                                    className="mb-4">
                                    <Form.Control size="lg" placeholder="(123)456-7890"
                                        value={phoneNumber} type="tel" onChange={(e) => setPhoneNumber(e.target.value)} />
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="FloatingPassword"
                                    label="Password"
                                    className="mb-1"
                                    >
                                    <Form.Control size="lg" type="password" placeholder="Password"
                                        value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} />
                                </FloatingLabel>
                                <div className="passwordHelpText">
                                <Form.Text id="passwordHelpBlock" style={{color: textColor }}>
                                    Your password must be 8-15 characters long, contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character
                                </Form.Text>
                                </div>
                                    <FloatingLabel
                                        controlId="FloatingConfirmPassword"
                                        label="Confirm Password"
                                        className="mb-4">
                                        <Form.Control size="lg" type="password" placeholder="Confirm Password"
                                            value={signupConfirmPassword} onChange={(e) => setSignupConfirmPassword(e.target.value)} />
                                    </FloatingLabel>
                                    <Button type="submit" size="lg" className="mb-3">
                                        Create Account
                                    </Button>
                                    <p onClick={(e) => handleFormChange(e)}>Already have an account? Sign in here.</p>
                            </Form>
                        </Col>

                    ) : (

                        <Col className="form-col">
                            <h4 className="pt-2">Log in</h4>
                            <Form className="pt-4" onSubmit={handleLoginSubmit}>
                                <FloatingLabel
                                    controlId="floatingLoginEmail"
                                    label="Email address"
                                    className="mb-3"
                                >
                                    <Form.Control size="lg" type="email" placeholder="name@example.com"
                                        value={loginUsername}
                                        onChange={e => setLoginUsername(e.target.value)} />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingLoginPassword" label="Password" className="mb-3">
                                    <Form.Control size="lg" type="password" placeholder="Password"
                                        value={loginPassword} onChange={e => setLoginPassword(e.target.value)}
                                    />
                                </FloatingLabel>
                                <p onClick={() => { dispatch(actionClearAlerts()); history.push('/recovery') }}>Forgot Password?</p>
                                <Button className="form-btn" size="lg" type="submit">Sign in</Button>
                                <p className="guestBtn" onClick={(e) => handleGuestLogin(e)}>
                                    Sign in as Guest
                                </p>
                                <p onClick={(e) => handleFormChange(e)} className="accountBtn" size="lg">Create an Account</p>
                            </Form>
                        </Col>
                    )}
                </Row>
            </Container>
        </div>
    )
}
