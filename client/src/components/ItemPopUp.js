import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { Counter } from '../features/counter/Counter';

export default function ItemPopUp(props) {

    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.data}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <Counter /> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
