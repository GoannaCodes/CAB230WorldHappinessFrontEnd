import React from 'react';
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";

const Navbar = () =>{
    return(
        <header>
            <nav>
                {/* main endpoints */}
                <ul>
                    <li id="logo">
                        <Link to="/home"><img src="icons/happy-logo-full.png" alt="Home-logo"></img></Link>
                    </li>
                    <li>
                        <Link to="/rankings" className="NavItems">Rankings</Link>
                    </li>
                    <li>
                        <Link to="/factors" className="NavItems">Factors</Link>
                    </li>
                </ul>

                {/* Authentication endpoints */}
                <Link to={"/register"}>
                    <Button variant="contained" color="primary"id="registerButton">Register</Button>
                </Link>
                <Link to={"/login"}>
                    <Button variant="contained" id="loginButton">Login</Button>
                </Link>
                <Link to={"/logout"}>
                    <Button variant="contained" color="secondary" id="logoutButton">Logout</Button>
                </Link>
            </nav>
        </header>
    )
}
export default Navbar;