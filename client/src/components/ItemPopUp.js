import React, { useState } from 'react'
import { Modal, Button, Image, Form, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { actionUpdateCart } from '../redux/actions/cart'
import { actionUpdateItems } from '../redux/actions/items'
// import { Counter } from '../features/counter/Counter';

export default function ItemPopUp(props) {
    const dispatch = useDispatch()
    const clickedItem = useSelector(state => state.itemDetail)
    const items = useSelector(state => state.products)
    const [count, setCount] = useState(0)

    function updateCount(e, num) {
        e.preventDefault()
        setCount(Math.max(0, count + num))
    }

    // may want to export getItem function from 
    // Home.js later for reusability 
    const getItem = (id) => {
        const product = items.find(item => item.id === id);
        return product
    }

    const addToCart = id => {
        let tempProducts = [...items];
        const index = tempProducts.indexOf(getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;

        dispatch(actionUpdateItems(tempProducts))
        dispatch(actionUpdateCart(product))


    }

    const handleAddToCart = id => {
        let tempProducts = [...items];
        const index = tempProducts.indexOf(getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        // product.count += 1;
        const price = product.price;
        product.total = price;
        dispatch(actionUpdateCart(product))
    }


    return (
        <Modal
            {...props}
            // size="lg"
            dialogClassName="modal-50w"
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
                <Row>
                    <Col>
                        <Image src={clickedItem.image} fluid rounded />
                    </Col>
                    <Col className="d-flex align-items-center">
                        <Form >
                            {clickedItem.id === 3 ? (
                            <div className="pb-2"><h6 className="pb-1"><b>Flavor</b></h6>
                            <Form.Check
                                inline
                                type="radio"
                                name="group1"
                                id={`default-radio`}
                                label={`pineapple`}
                            /><Form.Check
                            inline
                            type="radio"
                            name="group1"
                            id={`default-radio`}
                            label={`strawberry`}
                            />
                            <Form.Check
                            inline
                            type="radio"
                            name="group1"
                            id={`default-radio`}
                            label={`cajeta`}
                            /></div>) : (
                                null
                            ) }
                            <h6 className="pb-1"><b>Quantity</b></h6>
                            <div className="quantity d-flex">
                                <Button variant="flat" onClick={(e) => updateCount(e,-1)}>-</Button>
                                <span>{count}</span>
                                <Button variant="flat" onClick={(e) => updateCount(e, 1)}>+</Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Back To Products</Button>
                <Button onClick={() => handleAddToCart(clickedItem.id)}>Add To Cart</Button>
            </Modal.Footer>
        </Modal>
    )
}
