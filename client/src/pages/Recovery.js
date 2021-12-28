
import React from 'react'
import { useState } from 'react'
import { Container, Form, Row, Col, FloatingLabel, Button } from 'react-bootstrap'

export default function Recovery() {
    const [ email, setEmail ] = useState('')

    const handleSubmit = (e) => {
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
                console.log(data.error)
            } else {
                console.log(data.success)
            }
        })
    }

    return (
        <Container className="pt-4">
            <Row className="justify-content-center">
                <Col className="recovery-form">
                <h4>Email Password</h4>
                    <Form className="py-2"onSubmit={handleSubmit}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Email address"
                            className="mb-3"
                        >
                            <Form.Control size="lg" type="email" placeholder="name@example.com"
                                value={email}
                                required
                                onChange={e => setEmail(e.target.value)} />
                        </FloatingLabel>
                        <Button type="submit">Email Password</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
