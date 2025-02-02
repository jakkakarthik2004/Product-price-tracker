import React, {useState} from 'react'
import './Registerstyles.css'
import ReactPlayer from 'react-player';
import { useHistory } from 'react-router-dom';
import {NavLink} from 'react-router-dom';
const Register = () => {
    document.title = "B15 Product Price Tracker | Register"
    const history = useHistory();
    const [user, setUser] = useState({
        name:"",
        email:"",
        password:"",
        cpassword:""
    });
    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({...user, [name]:value})
    }
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const postData = async () => {
        document.querySelector(".loader").style.display = "flex";
        const { name, email, password, cpassword } = user;
        // const setError = document.querySelector('.error')
        // if (!validateEmail(email)) {
        //     setError.innerHTML = `Enter a valid Email`;
        //     document.querySelector(".loader").style.display = "none";
        // } 
        // else if(password !== cpassword) {
        //     window.alert("Password and Confirm Password are not the same");
        //     document.querySelector(".loader").style.display = "none";
        // }
        // else {
            // console.log(user);
            const response = await fetch('http://localhost:5000/signup',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name, email, password, cpassword
                })
            })
            const data = await response.json();
            console.log(data);
            if(data.success) {
                document.querySelector(".loader").style.display = "none";
                history.push("/signin");
            }
            else {
                document.querySelector(".loader").style.display = "none";
                // setError.innerHTML = `User already exists!`;
            }
        // }
    }
    return (
        <>
        <body>
            <div className="container">
                <div className='title'>Register</div>
                <div className="inputs">
                    <input type="text" name = "name" className = 'name' placeholder="Enter your Name" autoComplete='off' value = {user.name} onChange={handleInputs}/>
                    <input type="text" name = "email" className = 'username' placeholder="Enter Email" autoComplete='off' value = {user.email} onChange={handleInputs}/>
                    <input type="password" name = "password" className = "password" placeholder="Enter Password" value = {user.password} onChange={handleInputs}/>
                    <input type="password" name = "cpassword" className = "cpassword" placeholder="Confirm Password" value = {user.cpassword} onChange={handleInputs}/>
                    <div className="error"></div>
                    <button className = "btn" type="button" onClick={postData}>Register</button>
                </div>
                <div className="login">
                    <p>Already have an account! <NavLink to="/signin">Login</NavLink></p>
                </div>
                <main className='loader'>
                    <svg className="ip" viewBox="0 0 256 128" width="256px" height="128px" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stop-color="#5ebd3e" />
                                <stop offset="33%" stop-color="#ffb900" />
                                <stop offset="67%" stop-color="#f78200" />
                                <stop offset="100%" stop-color="#e23838" />
                            </linearGradient>
                            <linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
                                <stop offset="0%" stop-color="#e23838" />
                                <stop offset="33%" stop-color="#973999" />
                                <stop offset="67%" stop-color="#009cdf" />
                                <stop offset="100%" stop-color="#5ebd3e" />
                            </linearGradient>
                        </defs>
                        <g fill="none" stroke-linecap="round" stroke-width="16">
                            <g className="ip__track" stroke="#ddd">
                                <path d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56"/>
                                <path d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64"/>
                            </g>
                            <g stroke-dasharray="180 656">
                                <path className="ip__worm1" stroke="url(#grad1)" stroke-dashoffset="0" d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56"/>
                                <path className="ip__worm2" stroke="url(#grad2)" stroke-dashoffset="358" d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64"/>
                            </g>
                        </g>
                    </svg>
                </main>
            </div>
        </body>
        </>
    )
}
export default Register