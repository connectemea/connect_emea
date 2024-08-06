import React from 'react'
// import { Link } from 'react-router-dom'
import navLinks from '../../const/navLinks';
import Logo from '../../assets/icons/connect.svg'


function NavBar() {
  return (
    <div className='flex justify-between p-4'>
      <div>
        <img src={Logo} alt='logo' />
      </div>
      <div className='flex items-center justify-center gap-4'>

      {navLinks.map((link, index) => (
        <div key={index} className="flex items-center justify-center gap-4">
            <a href={link.href} >{link.label}</a>
            </div>
      ))}
      </div>

    </div>
  )
  }
export default NavBar;
