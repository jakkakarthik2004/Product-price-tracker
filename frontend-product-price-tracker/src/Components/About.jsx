import React from 'react'
import {NavLink} from 'react-router-dom'; 
const About = () => {
    document.title = "B15 Product Price Tracker | Home";
    const emailAddress = 'b15productpricetracker@gmail.com';
    const handleEmailClick = () => {
        window.location.href = `mailto:${emailAddress}`;
    };
    return (
        <>
        <div className="home-container">
            <div className="about-heading">Developed by</div>
            <div className="card-container">
                <div class="card">
                    <p class="heading">Jakka Karthik</p>
                    <p>B.Tech CSE</p>
                </div>
            </div>
            <div className="footer-rights">
                Copyright © jakkakarthik | All rights reserved
            </div>
        </div>
        </>
    )
}
export default About