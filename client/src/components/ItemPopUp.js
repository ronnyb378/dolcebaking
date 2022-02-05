import React, { useState, useRef, useEffect } from 'react'
import { Modal, Button, Image, Form, Row, Col, Overlay, Tooltip } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { actionUpdateCart } from '../redux/actions/cart'


export default function ItemPopUp(props) {
    const dispatch = useDispatch()
    const { data: { name, description, image, products } } = props


    const [error, setError] = useState('')
    const [show, setShow] = useState(false);
    const [ selectedItem, setSelectedItem ] = useState({...props.data})

    const target = useRef(null);

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
        } 
        
        return true
    }


    useEffect(() => {
        let mounted = true;
        setTimeout(() => {
            if (mounted) {
                setShow(false)
            }
        }, 1500);

        return () => { mounted = false }
    }, [show])


    const handleAddToCart = (e, product) => {
        e.preventDefault();
        let copyProduct = { ...product };

        if (product.products) {
            copyProduct = { ...products[0]}
        }

        let isValid = validation([...e.target])

        if (isValid) {
            setShow(true)
            const price = copyProduct.price;
            copyProduct.total = price
            dispatch(actionUpdateCart(copyProduct))
            setError('')
        }
    }

    const handleRadioButton = id => {
        const product = getItem(id)
        setSelectedItem(product)
    }

    const closeModal = () => {
        props.onHide();
        setShow(false)
        setError('')
    }

    return (
        <Modal
            onExited={() => closeModal()}
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
                        <Form noValidate id="item-form" onSubmit={(e) => handleAddToCart(e, selectedItem)} onChange={(e) => handleRadioButton(e.target.value)}>
                            {products.length > 1 && <h5>Flavors</h5>} {error && <p>{error}</p>}
                            {products.length > 1 && products.map(data =>
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
                            )}
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
