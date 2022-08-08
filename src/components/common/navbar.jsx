import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../images/logo.png';

const NavBar = ({ emp }) => {

    var className = "navbar navbar-expand-lg navbar-light py-3 px-5";
    if (emp) className = className.concat(" bg-dark");
    else className = className.concat(" bg-light");

    return (

        <nav id="navlist" className={className}>

            <NavLink to="/dashboard" style={{ textDecoration: "none" }}>
                <div className="navbar-brand" to="#">
                    <img src={logo} style={{ height: '50px', width: '200px' }} />
                </div>
            </NavLink>

            {emp &&
                <React.Fragment>
                    <div className='ms-auto'>
                        <NavLink className="mx-5" to="/logout" style={{ textDecoration: "None", color: "white" }}>Logout</NavLink>
                        <NavLink to="/change_password" style={{ textDecoration: "None", color: "white" }}>Change Password</NavLink>
                    </div>
                </React.Fragment>}

            {!emp &&
                <React.Fragment>
                    <div className='ms-auto'>
                        <NavLink className="mx-5" to="/login" style={{ textDecoration: "None" }}>Login</NavLink>
                    </div>

                </React.Fragment>}
        </nav>
    );
}

export default NavBar;