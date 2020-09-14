import React from 'react';
import '../styles/HeaderFooter.css'

function Footer() {
    const fotoc = require("../images/c.png")
    return (
        <footer>
           <div>
              <img src={fotoc} alt="Copy Right"></img>
              <p>MyTineray All rights reserved 2020</p>
            </div>
        </footer>
    )
}

export default Footer