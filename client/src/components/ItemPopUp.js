import React, { useEffect, useState } from 'react'
import { Modal, Button, Image, Form, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { actionUpdateCart } from '../redux/actions/cart'
import { actionItemDetail } from '../redux/actions/itemDetail'

// import { Counter } from '../features/counter/Counter';

export default function ItemPopUp(props) {
    const dispatch = useDispatch()
    const { data } = props
    const [ detailObj, setDetailObj ] = useState(null)

    useEffect(() => {
        if (data) {
            const newDetailObj = data;
            setDetailObj(newDetailObj)
        }
    }, [data])

    const clickedItem = useSelector(state => state.itemDetail)

    const items = useSelector(state => state.products.categories)



    const getItem = (id) => {
        const product = props.data.products.find(item => item.id == id);
        console.log(product)
        return product
    }


    const handleAddToCart = id => {
        let tempProducts = [...items];
        const index = tempProducts.indexOf(getItem(id));
        // const product = tempProducts[index];
        // product.inCart = true;
        // product.count += 1;
        // const price = product.price;
        // product.total = price;

        const product = getItem(id)
        dispatch(actionUpdateCart(product))
    }

    const handleRadioButton = id => {
        console.log(id)
        const product = getItem(id)
        dispatch(actionItemDetail(product))
    }

    if (detailObj) {
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
                    {/* {clickedItem.name} */}
                    {props.data.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* <Counter /> */}
                <Row>
                    <Col>
                        {/* <Image src={clickedItem.image} fluid rounded /> */}
                        <Image src={props.data.image} fluid rounded />
                    </Col>
                    <Col className="d-flex align-items-center">
                        {/* Trying new things */}
                        <Form onChange={(e) => handleRadioButton(e.target.value)}>
                            {
                            (props.data.products.length > 1) ? (
                                props.data.products.map((data) => {
                                return <Form.Check
                                        key={data.id}
                                        value={data.id}
                                        inline 
                                        type="radio"
                                        name="group1"
                                        id={`default-radio`}
                                        label={`${data.name}`}
                                        />
                            })
                            ) : (null)
                                } 
                        </Form>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Back To Products</Button>
                <Button className="cart-btn" onClick={() => handleAddToCart(clickedItem.id)}>Add To Cart</Button>
            </Modal.Footer>
        </Modal>
    )} else { return null }
}
