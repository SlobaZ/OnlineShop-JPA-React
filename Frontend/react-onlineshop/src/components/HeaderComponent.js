import React, { Component } from 'react'
import { Link } from "react-router-dom";
import logo from '../logo.jpg';

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">

                    <div className="logo">
                    <img src={logo} width="50" height="50" alt="Logo" />
                    </div>
                    
                    <Link to="/" className="navbar-brand">
                        Online Shop
                    </Link>

                    <ul class="navbar-nav">
                        <li className="nav-item ">
                            <Link to="/proizvodi" className="navbar-brand"> Proizvodi </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/korisnici" className="navbar-brand"> Korisnici </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/kupovine" className="navbar-brand"> Kupovina </Link>
                        </li>
                    </ul>
                    </nav>
                </header>
            </div>
        )
    }
}

export default HeaderComponent
