import React from 'react'
import instagram from '../images/instagram.png'
// import downtown from '../images/downtown_houston.jpeg'

export default function Footer() {
    return (
        <div>
            {/* <div className="container">
                <img className="header-image" src={downtown} />
            </div> */}
            <footer className="footer">Dolce Desserts <a href="https://www.instagram.com/dol.ce.desserts/"><img src={instagram} alt="instagram logo" /></a>| example@example.com | 123-456-7890</footer>
        </div>
    )
}
