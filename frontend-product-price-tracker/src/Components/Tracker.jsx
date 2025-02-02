import React, { useState } from 'react'
import './Loginstyles.css'
import { useParams } from 'react-router-dom';
const Tracker = () => {
    document.title = "B15 Product Price Tracker | Tracker"
    const { email } = useParams();
    const amazonScrapper = async (url, email) => {
        try {
            const response = await fetch('http://localhost:8080/scrapeAmazon', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url, email }),
            });
            const { data } = await response.json();
            return data;
        } catch (e) {
            console.log('error in fetching' + e);
        }
    }
    const flipkartScrapper = async (url, email) => {
        try {
            const response = await fetch('http://localhost:7000/scrapeFlipkart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url, email }),
            });
            const { data } = await response.json();
            return data;
        } catch (e) {
            console.log('error in fetching' + e);
        }
    }
    const fetchData = async () => {
        let product = document.querySelector('.searchedProduct').value;
        
        if(product.length === 0) {
            alert("Please select product");
        }
        else {
            document.querySelector(".preloader").style.display = "flex";
            let amazonURL = '';
            let flipkartURL = '';
            let proId = '';
            let priId = '';
            if(product === 'i15pm') {
                amazonURL = 'https://www.amazon.in/Apple-iPhone-15-Pro-Max/dp/B0CHXDW1B6/'
                flipkartURL = 'https://www.flipkart.com/apple-iphone-15-pro-max-natural-titanium-1-tb/p/itm2bdab781feef6 '
                proId = '_1pro';
                priId = '_1pri';
            }
            else if(product === 'i15p') {
                amazonURL = 'https://www.amazon.in/Apple-iPhone-15-Pro-TB/dp/B0CHWWVSLF/'
                flipkartURL = 'https://www.flipkart.com/apple-iphone-15-pro-blue-titanium-1-tb/p/itme90f8c7fd0ad7'
                proId = '_2pro';
                priId = '_2pri';
            }
            else if(product === 'i15') {
                amazonURL = 'https://www.amazon.in/Apple-iPhone-15-512-GB/dp/B0CHXB1PT6/'
                flipkartURL = 'https://www.flipkart.com/apple-iphone-15-blue-512-gb/p/itmbd86e796dea27'
                proId = '_3pro';
                priId = '_3pri';
            }
            else if(product === 's23u') {
                amazonURL = 'https://www.amazon.in/Samsung-Galaxy-Ultra-Green-Storage/dp/B0BT9CXXXX/'
                flipkartURL = 'https://www.flipkart.com/samsung-galaxy-s23-ultra-5g-green-256-gb/p/itm77dc35f7779a4 '
                proId = '_4pro';
                priId = '_4pri';
            }
            else if(product === 's23') {
                amazonURL = 'https://www.amazon.in/Samsung-Galaxy-Green-256GB-Storage/dp/B0BT9DVZLZ/'
                flipkartURL = 'https://www.flipkart.com/samsung-galaxy-s23-5g-green-256-gb/p/itm6840743bfd1ef'
                proId = '_5pro';
                priId = '_5pri';
            }
            else if(product === 's23fe') {
                amazonURL = 'https://www.amazon.in/Samsung-Galaxy-Graphite-128GB-Storage/dp/B0CJ4SCY75/'
                flipkartURL = 'https://www.flipkart.com/samsung-s23-fe-graphite-128-gb/p/itm8e986731987c8'
                proId = '_6pro';
                priId = '_6pri';
            }
            else if(product === 'sfold5') {
                amazonURL = 'https://www.amazon.in/Samsung-Galaxy-Fold5-Phantom-Storage/dp/B0CB6B25BZ/'
                flipkartURL = 'https://www.flipkart.com/samsung-galaxy-z-fold5-phantom-black-512-gb/p/itm4d14abce6dc2f'
                proId = '_7pro';
                priId = '_7pri';
            }
            else if(product === 'sflip5') {
                amazonURL = 'https://www.amazon.in/Samsung-Galaxy-Flip5-Graphite-Storage/dp/B0CB6BZ244/'
                flipkartURL = 'https://www.flipkart.com/samsung-galaxy-z-flip5-graphite-256-gb/p/itm0f715c56a74f4'
                proId = '_8pro';
                priId = '_8pri';
            }
            else if(product === 'o11r') {
                amazonURL = 'https://www.amazon.in/OnePlus-Sonic-Black-128GB-Storage/dp/B0BSNP46QP/'
                flipkartURL = 'https://www.flipkart.com/oneplus-11r-5g-sonic-black-128-gb/p/itmd8344a066fd54'
                proId = '_9pro';
                priId = '_9pri';
            }
            else if(product === 'o11') {
                amazonURL = 'https://www.amazon.in/OnePlus-Titan-Black-256GB-Storage/dp/B0BQJLVSC2/'
                flipkartURL = 'https://www.flipkart.com/oneplus-11-5g-titan-black-256-gb/p/itm668119d115289'
                proId = '_10pro';
                priId = '_10pri';
            }
            else if(product === 'o10t') {
                amazonURL = 'https://www.amazon.in/OnePlus-Moonstone-Black-256GB-Storage/dp/B0B5V2KDNZ/'
                flipkartURL = 'https://www.flipkart.com/oneplus-10t-5g-moonstone-black-256-gb/p/itm9a8677129b2bf'
                proId = '_11pro';
                priId = '_11pri';
            }
            try {
                console.log(amazonURL);
                let amazonData = await amazonScrapper(amazonURL, email);
                let flipkartData = await flipkartScrapper(flipkartURL, email);
                
                document.querySelector(".output").style.display = "block";
                const tableHead = document.querySelector("thead");
                tableHead.innerHTML = `
                    <tr>
                        <th>Platform</th>
                        <th>Product name</th>
                        <th>Product Price</th>
                        <th>Product MRP</th>
                        <th>Discount</th>
                        <th>Rating</th>
                        <th>Purchase</th>
                    </tr>
                `
                let str = '';
                const tableBody = document.querySelector('tbody');
                str += `
                    <tr>
                        <td>Amazon</td>
                        <td>${amazonData.productName}</td>
                        <td>&#x20B9;${amazonData.productPrice}</td>
                        <td>&#x20B9;${amazonData.productMrp}</td>
                        <td>${amazonData.discount}&#37;</td>
                        <td>${amazonData.productRating}</td>
                        <td><a href = ${amazonURL} target = "_blank">Purchase</a></td>
                    </tr>
                `
                str += `
                    <tr>
                        <td>Flipkart</td>
                        <td>${flipkartData.productName}</td>
                        <td>&#x20B9;${flipkartData.productPrice}</td>
                        <td>&#x20B9;${flipkartData.productMrp}</td>
                        <td>${flipkartData.discount}&#37;</td>
                        <td>${flipkartData.productRating}</td>
                        <td><a href = ${flipkartURL} target = "_blank">Purchase</a></td>
                    </tr>
                `
                document.querySelector(".preloader").style.display = "none";
                tableBody.innerHTML = str;
            }
            catch (error) {
                console.error('Error during scraping:', error);
            }      
        }
    };
    const getName = async () => {
        try {
            const response = await fetch('http://localhost:5000/getName');
            const { data } = await response.json();
            return data;
        } catch (e) {
            console.log('error in fetching' + e);
        }
    }
    return (
        <>
            <div className="container">
                <div className="title">Search for a product</div>
                <div className="inputs">
                    <select name="country" className="searchedProduct">
                        <option value="" disabled="" selected="">
                        Choose a product
                        </option>
                        <option value="i15pm">iPhone 15 pro max</option>
                        <option value="i15p">iPhone 15 pro</option>
                        <option value="i15">iPhone 15</option>
                        <option value="s23u">Samsung s23 ultra</option>
                        <option value="s23">Samsung s23</option>
                        <option value="s23fe">Samsung s23 FE</option>
                        <option value="sfold5">Samsung Galaxy Z Fold5</option>
                        <option value="sflip5">Samsung Galaxy Z Flip5</option>
                        <option value="o11r">OnePlus 11R</option>
                        <option value="o11">OnePlus 11</option>
                        <option value="o10t">OnePlus 10T</option>
                    </select>
                    <button type="submit" className="btn" onClick = {fetchData}>Submit</button>
                </div>
            </div>
            <div className="preloader">
                <svg
                    className="cart"
                    role="img"
                    aria-label="Shopping cart line animation"
                    viewBox="0 0 128 128"
                    width="128px"
                    height="128px"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={8}>
                        <g className="cart__track" stroke="hsla(0,10%,10%,0.1)">
                                <polyline points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" />
                                <circle cx={43} cy={111} r={13} />
                                <circle cx={102} cy={111} r={13} />
                        </g>
                        <g className="cart__lines" stroke="currentColor">
                            <polyline
                                className="cart__top"
                                points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80"
                                strokeDasharray="338 338"
                                strokeDashoffset={-338}
                            />
                            <g className="cart__wheel1" transform="rotate(-90,43,111)">
                                <circle
                                    className="cart__wheel-stroke"
                                    cx={43}
                                    cy={111}
                                    r={13}
                                    strokeDasharray="81.68 81.68"
                                    strokeDashoffset="81.68"
                                />
                            </g>
                            <g className="cart__wheel2" transform="rotate(90,102,111)">
                                <circle
                                    className="cart__wheel-stroke"
                                    cx={102}
                                    cy={111}
                                    r={13}
                                    strokeDasharray="81.68 81.68"
                                    strokeDashoffset="81.68"
                                />
                            </g>
                        </g>
                    </g>
                </svg>
                <div className="preloader__text">
                    <p className="preloader__msg">Bringing you the products...</p>
                    <p className="preloader__msg preloader__msg--last">
                    This is taking long.
                    </p>
                </div>
                </div>

            <div className="output">
                <div className="output-title"><h2>Product details</h2></div>
                <table>
                    <thead>                   
                    
                    </thead>
                    <tbody>
                                
                    </tbody>
                </table>
            </div>

        </>
    )
}
export default Tracker