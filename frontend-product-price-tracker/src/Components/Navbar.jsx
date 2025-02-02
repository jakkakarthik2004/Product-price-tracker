import React, { useState }  from 'react'
import './Navbarstyles.css'
import {NavLink} from 'react-router-dom'; 
import LoadingBar from 'react-top-loading-bar'
const Navbar = () => {
    return (
        <>
        <body>
            <nav>
                <div className="left"><NavLink to = "/"><button className='navbar-btn'>Product Price Tracker</button></NavLink></div>
                <div className="right">
                    <ul>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/about">About Us</NavLink></li>
                        <li><NavLink to="/track">Track</NavLink></li>
                        <li><NavLink to="/history">History</NavLink></li>
                        <li><NavLink to="/signin">Login</NavLink></li>
                        <li><NavLink to="/signup">Register</NavLink></li>
                    </ul>
                </div>
            </nav>
        </body>
        </>
    )
}

export default Navbar;