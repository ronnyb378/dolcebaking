import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
// import { Counter } from '../features/counter/Counter';

export default function ItemPopUp(props) {
    const clickedItem = useSelector(state => state.itemDetail)

    return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {clickedItem.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <Counter /> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
    )
}
