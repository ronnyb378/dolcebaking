import React, { useState } from 'react'
import { Container, Row, Col, Form, FloatingLabel, Button} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { actionSetSuccess } from '../redux/actions/status'

export default function ResetPass() {
    const [ newPass, setNewPass ] = useState('')
    const { token } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/v1/users/resetpassword', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                newPass,
                resetLink: token
            })
        }).then(res => res.json())
        .then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                console.log(data.success)
                dispatch(actionSetSuccess(data))
                history.push('/login')
            }
        })
    }

    return (
        <Container>
            <h2>Enter new password</h2>
            <Row>
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Password"
                            className="mb-3"
                        >
                            <Form.Control size="lg" type="password" placeholder="password"
                                value={newPass}
                                required
                                onChange={e => setNewPass(e.target.value)} />
                        </FloatingLabel>
                        <Button type="submit">Change Password</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
