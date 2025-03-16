import React from 'react';

export default function Navbar({ title, mode, setMode, city, setCity }) {
    
    const changeMode = () => {
        setMode(prevMode => !prevMode);  // Toggle dark mode in App.js
    };

    const changeCity = (event) => {
        event.preventDefault();  // Prevent form from refreshing
        const newCity = document.getElementById("search").value.trim();
        if (newCity) setCity(newCity);
    };

    return (
        <>
            <nav className={`navbar navbar-expand-xl shadow ${mode ? "dark" : "light"}`}>
                <div className="container-fluid">
                    <a className={`navbar-brand ${mode ? "dark" : "light"}`} href="/">{title}</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
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
