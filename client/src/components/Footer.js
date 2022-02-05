import React from 'react'
import instagram from '../images/instagram.png'
import emailIcon from '../images/email.png'

export default function Footer() {
    return (
        <div>
            <footer className="footer">&nbsp;&nbsp;<a href="https://www.instagram.com/dol.ce.desserts/"><img src={instagram} alt="instagram logo" /></a>&nbsp;&nbsp;
                <a title="Send me an email" href="mailto:dolcedesserts868@gmail.com?subject=Order Inquiry"><img src={emailIcon} alt="email icon" /></a>
                </footer>
        </div>
    )
}
