import React from 'react'
import instagram from '../images/instagram.png'
// import downtown from '../images/downtown_houston.jpeg'

export default function Footer() {
    return (
        <div>
            <footer className="footer">Dolce Desserts&nbsp;&nbsp;<a href="https://www.instagram.com/dol.ce.desserts/"><img src={instagram} alt="instagram logo" /></a><span>&nbsp;&nbsp;example@example.com</span></footer>
        </div>
    )
}
