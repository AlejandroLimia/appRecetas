import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {NavLink} from "react-router-dom"

const Menuhamburguesa = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  const fotoBoton = require("../images/menuHamburguesa.png")

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret style={{backgroundColor: `white`, border: `none`}}><img src={fotoBoton} alt="menu" style={{width: `26%`}}></img></DropdownToggle>
      <DropdownMenu>
        <DropdownItem><NavLink to="/Home">Home</NavLink></DropdownItem>
        <DropdownItem divider />
        <DropdownItem> {/*<NavLink to="/Ciudades">Ciudades</NavLink>*/}</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default Menuhamburguesa;