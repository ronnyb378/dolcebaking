import React, { useEffect, useState, useRef } from 'react'
import { Modal, Button, Image, Form, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { actionUpdateCart } from '../redux/actions/cart'
import { actionItemDetail } from '../redux/actions/itemDetail'

// import { Counter } from '../features/counter/Counter';

export default function ItemPopUp(props) {
    const ref = useRef()
    const dispatch = useDispatch()
    const { data } = props
    const [detailObj, setDetailObj] = useState(null)
    const [error, setError ] = useState('')


    useEffect(() => {

        if (data) {
            const newDetailObj = data;
            setDetailObj(newDetailObj)
        }


    }, [data])

    const clickedItem = useSelector(state => state.itemDetail)
    // const items = useSelector(state => state.products.categories)



    const getItem = (id) => {
        const product = props.data.products.find(item => item.id === parseInt(id));
        return product
    }

    const validation = (arr) => {
        let i = 0;
        let formValid = false;

        if (arr.length === 1) {
            return true
        }

        while (i < arr.length && !formValid) {
            if (arr[i].checked) formValid = true;
            i++;
        }

        if (!formValid) {
            setError('Please choose a flavor')
            return false
        } else if (formValid) {
            return true
        }
    }




    const handleAddToCart = (e, id) => {

        // console.log(e.target[1].checked)
        // console.log(typeof(e.target))
        e.preventDefault();
        let isValid = validation([...e.target])

        if (isValid) {
        const tempProduct = getItem(id)
        let product = { ...tempProduct }
        const price = product.price;
        product.total = price    
        dispatch(actionUpdateCart(product))
        setError('')
        }
    }

    const handleRadioButton = (e, id) => {
        const product = getItem(id)
        dispatch(actionItemDetail(product))
    }

    const closeModal = () => {
        props.onHide();
        console.log('closeModal function')
        setError('')
    }


    if (detailObj) {
        return (
            <Modal
                ref={ref}
                onExited={() => setError('')}
                {...props}
                dialogClassName="modal-50w"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.data.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Image src={props.data.image} fluid rounded />
                        </Col>
                        <Col className="d-flex align-items-center item-column-right">
                            <h5>{props.data.description}</h5>
                            {/* form having id and button having form attribute not supported by IE11? */}
                            <Form noValidate id="item-form" onSubmit={(e) => handleAddToCart(e, clickedItem.id)} onChange={(e) => handleRadioButton(e, e.target.value)}>
                                {props.data.products.length > 1 && <h5>Flavors</h5>} { error && <p>{error}</p>}
                                {(props.data.products.length > 1) ? (
                                    props.data.products.map(data =>
                                        <Form.Check
                                            required
                                            key={data.id}
                                            value={data.id}
                                            inline
                                            className="radio-btns"
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
                    <Button form="item-form" className="cart-btn" type="submit" >Add To Cart</Button>
                </Modal.Footer>
            </Modal>
        )
    } else { return null }
}
