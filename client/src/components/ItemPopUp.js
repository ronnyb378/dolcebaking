import React, { useEffect, useState } from 'react'
import { Modal, Button, Image, Form, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { actionUpdateCart } from '../redux/actions/cart'
import { actionItemDetail } from '../redux/actions/itemDetail'

// import { Counter } from '../features/counter/Counter';

export default function ItemPopUp(props) {
    const dispatch = useDispatch()
    const { data } = props
    const [detailObj, setDetailObj] = useState(null)
    const [ clicked, setClicked ] = useState(false)
    const [ error, setError ] = useState("")

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

    const validate = () => {
        let errorMessage = "";

        if (!clicked) {
            errorMessage = "Please choose a flavor"
        }

        if (errorMessage) {
            setError(errorMessage);
            return false;
        }
        return true;
    }


    const handleAddToCart = (e, id) => {
        // let tempProducts = [...items];
        // const index = tempProducts.indexOf(getItem(id));
        // const product = tempProducts[index];
        // product.inCart = true;
        // product.count += 1;
        // const price = product.price;
        // product.total = price;

        e.preventDefault();
        const isValid = validate()
        if (isValid) {
            const tempProduct = getItem(id)
            let product = { ...tempProduct }
            const price = product.price;
            product.total = price    
            dispatch(actionUpdateCart(product))
            setError('')
        }
    
    }

    const handleRadioButton = id => {
        const product = getItem(id)
        dispatch(actionItemDetail(product))
        setClicked(true)
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
                        {props.data.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Image src={props.data.image} fluid rounded />
                        </Col>
                        <Col className="d-flex align-items-center item-column-right">
                            <i>{props.data.description}</i>
                            {/* form having id and button having form attribute not supported by IE11? */}
                            <Form noValidate id="item-form" onSubmit={(e) => handleAddToCart(e, clickedItem.id)} onChange={(e) => handleRadioButton(e.target.value)}>
                                {props.data.products.length > 1 && <h5>Flavors</h5>} { error && <p>{error}</p>}
                                {(props.data.products.length > 1) ? (
                                    props.data.products.map(data =>
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
                    <Button onClick={props.onHide}>Back To Products</Button>
                    <Button form="item-form" className="cart-btn" type="submit" >Add To Cart</Button>
                </Modal.Footer>
            </Modal>
        )
    } else { return null }
}
