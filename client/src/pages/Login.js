import React, { useState, useEffect } from 'react'
import { Container, Form, Row, Col, Button, FloatingLabel } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { actionLoggedIn } from '../redux/actions/user';
import { useHistory } from 'react-router-dom';
import { actionClearAlerts, actionSetError } from '../redux/actions/status';

const initialSignupInfo = {
    signupEmail: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    signupPassword: '',
    signupConfirmPassword: '',
}

export default function Login() {
    const dispatch = useDispatch()
    const history = useHistory()
    // form state
    const [login, setLogin] = useState(false)

    // login states
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    // sign up states
    const [signupInfo, setSignupInfo] = useState({ ...initialSignupInfo})
    const [ textColor, setTextColor ] = useState('crimson')

    // between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character

    useEffect(() => {
        const paswd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/

        if (signupInfo.signupPassword.match(paswd)) {
            setTextColor('forestgreen')
        } else {
            setTextColor('crimson')
        }
    }, [signupInfo.signupPassword])

    const handleSignupChange = (e) => {
        const { name, value } = e.target
        setSignupInfo({
            ...signupInfo,
            [name]: value
        })
    }

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
        e.preventDefault();
        fetch('/api/v1/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: signupInfo.signupEmail,
                first_name: signupInfo.firstName,
                last_name: signupInfo.lastName,
                phone_number: signupInfo.phoneNumber,
                password: signupInfo.signupPassword,
                confirmed_password: signupInfo.signupConfirmPassword
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setLogin(!login)
                    setSignupInfo({...initialSignupInfo})
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
                                                name="firstName"
                                                value={signupInfo.firstName}
                                                onChange={(e) => handleSignupChange(e)} />
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
                                                name="lastName"
                                                value={signupInfo.lastName}
                                                onChange={(e) => handleSignupChange(e)} />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                                <FloatingLabel
                                    controlId="FloatingEmail"
                                    label="Email Address"
                                    className="mb-4">
                                    <Form.Control size="lg" type="email" placeholder="example@example.com"
                                        name="signupEmail" value={signupInfo.signupEmail} onChange={(e) => handleSignupChange(e)}
                                        />
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="FloatingPhoneNumber"
                                    label="Phone Number"
                                    className="mb-4">
                                    <Form.Control size="lg" placeholder="(123)456-7890"
                                        name="phoneNumber" value={signupInfo.phoneNumber} type="tel" onChange={(e) => handleSignupChange(e)} />
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="FloatingPassword"
                                    label="Password"
                                    className="mb-1"
                                    >
                                    <Form.Control size="lg" type="password" placeholder="Password"
                                        name="signupPassword" value={signupInfo.signupPassword} onChange={(e) => handleSignupChange(e)} />
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
                                            name="signupConfirmPassword" value={signupInfo.signupConfirmPassword} onChange={(e) => handleSignupChange(e)} />
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
