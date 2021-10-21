import React from 'react'
import instagram from '../images/instagram.png'

export default function Footer() {
    return (
        <div>
            <footer className="footer">Dolce Desserts <a href="https://www.instagram.com/dol.ce.desserts/"><img src={instagram} alt="instagram logo" /></a>| example@example.com | 123-456-7890</footer>
        </div>
    )
}
