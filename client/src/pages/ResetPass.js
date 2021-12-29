import React, { useState } from 'react'
import { Container, Row, Col, Form, FloatingLabel, Button} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { actionSetError, actionSetSuccess } from '../redux/actions/status'

export default function ResetPass() {
    const [ newPass, setNewPass ] = useState('')
    const [ isLoading, setLoading ] = useState(false)
    const { token } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        setLoading(true)
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
                dispatch(actionSetError(data))
                setLoading(false)
            } else {
                console.log(data.success)
                dispatch(actionSetSuccess(data))
                history.push('/login')
            }
        })
    }

    return (
        <Container className="pt-4">
            <Row className="justify-content-center">
                <Col className="recovery-form">
                <h4 className="pt-2">Enter new password!</h4>
                    <Form className="py-2" onSubmit={handleSubmit}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Password"
                            className="mb-3"
                        >
                            <Form.Control size="lg" type="password" placeholder="password"
                                disabled={isLoading}
                                value={newPass}
                                required
                                onChange={e => setNewPass(e.target.value)} />
                        </FloatingLabel>
                        <Button disabled={isLoading} type="submit">Change Password</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
