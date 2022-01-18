import React from 'react'
import { Container } from 'react-bootstrap'
import bakeTool from '../images/dolce_baking_tool.png'

export default function BrandHeader() {
    return (
        <div>
            <Container className=" pb-4 brandHeader" fluid>
                <h1>Dolce<br /> Desserts</h1>
                <h3>Houston</h3>
                <h6>Quality Ingredients<img src={bakeTool} alt="spatula"/> Quality Products</h6>
            </Container>
        </div>
    )
}
