import React, { useState } from 'react'
import { Container, Row, Col, Form, FloatingLabel, Button} from 'react-bootstrap'
import { useParams } from 'react-router-dom'

export default function ResetPass() {
    const [ password, setPassword ] = useState('')
    const { token } = useParams()

    return (
        <Container>
            <h2>Enter new password</h2>
            <Row>
                <Col>
                    <Form>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Password"
                            className="mb-3"
                        >
                            <Form.Control size="lg" type="password" placeholder="password"
                                value={password}
                                required
                                onChange={e => setPassword(e.target.value)} />
                        </FloatingLabel>
                        <Button type="submit">Change Password</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
