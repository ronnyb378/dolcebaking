import React, { useState, useRef } from 'react'
import { Modal, Button, Image, Form, Row, Col, Overlay, Tooltip } from 'react-bootstrap'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { actionUpdateCart } from '../redux/actions/cart'
import { actionItemDetail } from '../redux/actions/itemDetail'


export default function ItemPopUp(props) {
    const dispatch = useDispatch()
    const { data: { name, description, image, products } } = props
    const clickedItem = useSelector(state => state.itemDetail)
    const [error, setError] = useState('')
    const target = useRef(null);
    const [show, setShow] = useState(false);

    const getItem = (id) => {
        const product = products.find(item => item.id === parseInt(id));
        return product
    }



    // check if any flavor is chosen
    const validation = (inputArray) => {
        let i = 0;
        let formValid = false;

        if (inputArray.length === 1) {
            return true
        }

        while (i < inputArray.length && !formValid) {
            if (inputArray[i].checked) formValid = true;
            i++;
        }

        if (!formValid) {
            setError('Please choose a flavor')
            return false
        } else if (formValid) {
            return true
        }
    }




    const handleAddToCart = (e, product) => {

        e.preventDefault();
        let isValid = validation([...e.target])

        if (isValid) {
            setShow(true)
            setTimeout( () => setShow(false), 1500);
            let copyProduct = { ...product }

            const price = copyProduct.price;
            copyProduct.total = price

            dispatch(actionUpdateCart(copyProduct))
            setError('')
        }
    }

    const handleRadioButton = id => {
        const product = getItem(id)
        dispatch(actionItemDetail(product))
    }

    const closeModal = () => {
        props.onHide();
        setShow(false)
        setError('')
    }

    return (
        <Modal
            onExited={() => {setError(''); setShow(false)}}
            {...props}
            dialogClassName="modal-50w"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <Image src={image} fluid rounded />
                    </Col>
                    <Col className="d-flex align-items-center item-column-right">
                        <h5>{description}</h5>
                        {/* form having id and button having form attribute not supported by IE11? */}
                        <Form noValidate id="item-form" onSubmit={(e) => handleAddToCart(e, clickedItem)} onChange={(e) => handleRadioButton(e.target.value)}>
                            {products.length > 1 && <h5>Flavors</h5>} {error && <p>{error}</p>}
                            {(products.length > 1) ? (
                                products.map(data =>
                                    <Form.Check
                                        required
                                        key={data.id}
                                        value={data.id}
                                        inline
                                        type="radio"
                                        name="group1"
                                        id={`default-radio`}
                                        label={`${data.name}`}
                                    />
                                )
                            ) : (null)
                            }
                        </Form>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => closeModal()}>Back To Products</Button>
                <Button ref={target} form="item-form" className="cart-btn" type="submit" >Add To Cart</Button>
                <Overlay target={target.current} show={show} placement="top">
                    {(props) => (
                        <Tooltip id="overlay-example" {...props}>
                            Added to cart!
                        </Tooltip>
                    )}
                </Overlay>
            </Modal.Footer>
        </Modal>
    )
}
