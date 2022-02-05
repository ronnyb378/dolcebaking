import React from 'react'
import { Container } from 'react-bootstrap'
import bakeTool from '../images/dolce_baking_tool.png'

export default function BrandHeader() {
    return (
        <div>
            <Container className=" pb-4 brandHeader" fluid>
                <h1><span className='dolce-title'>Dolce</span><br /><span className='desserts-title'>Desserts</span></h1>
                <h3 className='houston-title'>Houston</h3>
                <h6><span>Quality Ingredients  </span><img src={bakeTool} alt="spatula"/><span>  Quality Products</span></h6>
            </Container>
        </div>
    )
}
