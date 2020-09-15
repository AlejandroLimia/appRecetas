import React from 'react';
import '../styles/HeaderFooter.css'

function Footer() {
	const year = new Date().getFullYear()
    return (
        <footer>
           <div>
              <p> &copy; Avocado - All rights reserved {year}</p>
            </div>
        </footer>
    )
}

export default Footer