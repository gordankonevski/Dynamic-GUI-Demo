import React from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';

function NavigationBar() {
    return (
        <nav className="navbar"> {/* Apply the navbar class from App.css */}
            <ul className="nav-links"> {/* Apply the nav-links class */}
                <li><NavLink to="/" exact>Home</NavLink></li>
                <li><NavLink to="/inventory">Inventory</NavLink></li>
            </ul>
        </nav>
    );
}

export default NavigationBar;