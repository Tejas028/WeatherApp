import React, { useState } from 'react';

export default function Navbar({ title, mode, setMode, city, setCity }) {
    
    const changeMode = () => {
        setMode(prevMode => {
            if (prevMode) {
                changeBorderDark(); // Apply light mode styles
            } else {
                changeBorderLight(); // Apply dark mode styles
            }
            return !prevMode; // Toggle mode
        });
    };

    const changeCity = (event) => {
        event.preventDefault();  // Prevent form from refreshing
        const newCity = document.getElementById("search").value.trim();
        if (newCity) setCity(newCity);
    };

    const changeBorderDark = () => {
        document.getElementsByClassName('navbar-toggler')[0].style.borderColor = "#212529";
        document.getElementsByClassName('navbar-toggler-icon')[0].style.backgroundImage =
            "url('data:image/svg+xml,%3csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 30 30%22%3e%3cpath stroke=%22rgb(33, 37, 41)%22 stroke-linecap=%22round%22 stroke-miterlimit=%2210%22 stroke-width=%222%22 d=%22M4 7h22M4 15h22M4 23h22%22/%3e%3c/svg%3e')";
    };
    
    const changeBorderLight = () => {
        document.getElementsByClassName('navbar-toggler')[0].style.borderColor = "white";
        document.getElementsByClassName('navbar-toggler-icon')[0].style.backgroundImage =
            "url('data:image/svg+xml,%3csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 30 30%22%3e%3cpath stroke=%22white%22 stroke-linecap=%22round%22 stroke-miterlimit=%2210%22 stroke-width=%222%22 d=%22M4 7h22M4 15h22M4 23h22%22/%3e%3c/svg%3e')";
    };
    

    return (
        <>
            <nav className={`navbar navbar-expand-xl shadow ${mode ? "dark" : "light"}`}>
                <div className="container-fluid">
                    <a className={`navbar-brand ${mode ? "dark" : "light"}`} href="/">{title}</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className={`navbar-toggler-icon `}></span>
                    </button>
                    <div className={`collapse navbar-collapse ${mode ? "dark" : "light"}`} id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className={`nav-link ${mode ? "dark" : "light"}`} aria-current="page" href="/">Home</a>
                            </li>
                            <li className={`nav-item dropdown ${mode ? "dark" : "light"} transition-delay:0`}>
                                <a className={`nav-link dropdown-toggle ${mode ? "dark" : "light"}`} href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Theme
                                </a>
                                <ul className={`dropdown-menu ${mode ? "dark" : "light"}`}>
                                    <li>
                                        <button className={`dropdown-item ${mode ? "dark" : "light"}`} onClick={changeMode}>
                                            {mode ? "Light Mode" : "Dark Mode"}
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <form className="d-flex" role="search" onSubmit={changeCity}>
                            <input id="search" className="form-control me-2" type="search" placeholder={city} aria-label="Search" />
                            <button className={`btn ${mode ? "btn-outline-light" : "btn-outline-dark"}`} type="submit" >
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    );
}

// Default Props
Navbar.defaultProps = {
    title: "Navbar",
    mode: false
};
