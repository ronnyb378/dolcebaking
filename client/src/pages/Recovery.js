import { useDispatch } from 'react-redux'
import React, { useState } from 'react'
import { actionSetError, actionSetSuccess } from '../redux/actions/status'
import { useHistory } from 'react-router-dom'
import { Container, Form, Row, Col, FloatingLabel, Button } from 'react-bootstrap'

export default function Recovery() {
    const [ email, setEmail ] = useState('')
    const [ isLoading, setLoading ] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()


    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault();
        fetch('/api/v1/users/recovery', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email
            })
        }).then(res => res.json())
        .then(data => {
            if (data.error) {
                dispatch(actionSetError({ error: "We are unable to send you an email at this time. Please try again later."}))
                setLoading(false)
            } else {
                history.push('/login')
                dispatch(actionSetSuccess(data))
                
            }
        })
    }

    return (
        <Container className="pt-2">
            <Row className="justify-content-center">
                <Col className="recovery-form">
                <h4 className="pt-2">Password Recovery</h4>
                    <Form className="py-2"onSubmit={handleSubmit}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Email address"
                            className="mb-3"
                        >
                            <Form.Control size="lg" type="email" placeholder="name@example.com"
                                disabled={isLoading}
                                value={email}
                                required
                                onChange={e => setEmail(e.target.value)} />
                        </FloatingLabel>
                        <Button disabled={isLoading}type="submit">Send Email</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
