import React from 'react';
import { Link } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import Button from 'react-bootstrap/Button'
import {useState} from "react";
import AuthModal from './Authentication/AuthModal';
import LoginPage from './LoginPage';
const Navbar = () => {
    
    const { setCurrency,user } = CryptoState();
    
    return (
        <div>

            <nav className="nav" onChange={(e) => setCurrency(e.target.value)} >
                <Link to="/" style={{textDecoration:"none",color:"black"}}><h1 className="nav-left" style={{ marginLeft: "20px" }}>CrytoTracker</h1></Link>
                <div className="nav-right">
                    <select>
                        <option value="INR" >INR</option>
                        <option value="USD" >USD</option>
                    </select>
                    {user?(<LoginPage/>):(<h1><AuthModal/></h1>)}
                </div>

            </nav>



        </div>
    );
};

export default Navbar;