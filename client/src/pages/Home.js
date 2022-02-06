import React, { useRef, useState } from 'react'
import { Container, Card, Row, Col, Button } from 'react-bootstrap'
import ItemPopUp from '../components/ItemPopUp'
import { useDispatch, useSelector } from 'react-redux'
import { actionItemDetail } from '../redux/actions/itemDetail'

import BrandHeader from '../components/BrandHeader'
import pink from '../images/pink-image.png'

export default function Home() {
    const dispatch = useDispatch()

    const items = useSelector(state => state.products.categories)

    const item = useSelector(state => state.itemDetail)

    const [modalShow, setModalShow] = useState(false)

    const [ loading, setLoading ] = useState(true)
    const counter = useRef(0)

    const imageLoaded = () => {
        counter.current += 1;
        if (counter.current >= items.length ) {
            setLoading(false)
        }
    }


    const handleDetail = (object) => {
        dispatch(actionItemDetail(object))
    }

    const hideModal = () => setModalShow(false)

    const clickedItem = item => {
        setModalShow(true);
        // setTempItem(item);
        handleDetail(item)
    }


    return (
        <div className="pb-4">
            <BrandHeader />
            <hr  className='line-break'/>
            <Container className="pt-4 pb-4 menu" fluid>
                <h2>Our Treats</h2>
                <Row  className="pt-4 g-4">
                    {items.map((item) => {
                        return <Col xs={12} sm={6} xl={4} key={item.id} onClick={() => clickedItem(item)}>
                            <Card className="bg-dark text-white ">
                            <div className="img-hover-zoom" style={{display: loading ? "block" : "none"}}>
                            <Card.Img variant="top" src={pink} alt="Card image" style={{ opacity: "0.7"}}/>
                            </div>
                                <div className="img-hover-zoom" style={{display: loading ? "none" : "block"}}>
                                <Card.Img variant="top" onLoad={imageLoaded} src={item.image} alt="Card image" />
                                </div>
                                <Card.Body>
                                    <Card.Text>
                                        {item.category}
                                    </Card.Text>
                                    <Button >
                                            Order
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    })}
                </Row>
            </Container>
            {/* {tempItem && 
            <ItemPopUp
                show={modalShow}
                onHide={() => setModalShow(hideModal)}
                data={tempItem}
            />
            } */}
            { modalShow && 
                <ItemPopUp
                show={modalShow}
                onHide={() => setModalShow(hideModal)}
                data={item}
            />

            }
        </div>
    )
}
