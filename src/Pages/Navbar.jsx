import React, { useState } from 'react';
import logo_img from './images/logo.png';
import { HashLink } from 'react-router-hash-link';
import 'font-awesome/css/font-awesome.min.css';
import './Navbar.css';
const Navbar = () => {
  const [isActive, setActive] = useState(false);

  const handleClick = () => {
    setActive(!isActive);
  };

  const closeMobileMenu = () => {
    setActive(false);
  };
  return (
    <>
      <div className="nav-container">
        <div className="logo">
          <HashLink to="/#home">
            <img src={logo_img} alt="om dental clinic logo" />
          </HashLink>
          <h2>Clinica Dental</h2>
        </div>
        <div className={isActive ? 'active_links' : 'links'}>
          <div className="MenuItems">
            <HashLink to="/#home" onClick={closeMobileMenu}>
              INICIO
            </HashLink>
          </div>
          <div className="MenuItems">
            <HashLink to="/#about-doctors" onClick={closeMobileMenu}>
              ACERCA
            </HashLink>
          </div>
          <div className="MenuItems">
            <HashLink to="/#our-services" onClick={closeMobileMenu}>
              TRATAMIENTOS
            </HashLink>
          </div>
          <div className="MenuItems">
            <HashLink to="/register" onClick={closeMobileMenu}>
              REGISTRO
            </HashLink>
          </div>
          <div className="MenuItems">
            <HashLink to="/#contact-us" onClick={closeMobileMenu}>
              CONTACTOS
            </HashLink>
          </div>
          <div className="MenuItems bgMenu" id="Appointment_menu">
            <HashLink to="/dental-clinic/slot" onClick={closeMobileMenu}>
              CITA
            </HashLink>
          </div>
        </div>
        <div className="toggle_menu_icons" onClick={handleClick}>
          <i className={isActive ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
      </div>
    </>
  );
};

export default Navbar;
