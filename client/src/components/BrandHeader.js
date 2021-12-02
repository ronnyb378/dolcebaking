import React from 'react'
import { Container, Image } from 'react-bootstrap'
import bakeTool from '../images/dolce_baking_tool.png'

export default function BrandHeader() {
    return (
        <div>
            <Container className="pt-4 pb-4 brandHeader">
                <h1>Dolce<br /> Desserts</h1>
                <h6>Houston<img src={bakeTool} alt="spatula"/>Something <img src={bakeTool} alt="spatula"/> Est. 2016</h6>
            </Container>
        </div>
    )
}
