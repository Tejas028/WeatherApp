import React, { useState, useEffect } from 'react';
import './WeatherStyles.css';

export default function Container({ mode, now, sunRise, sunSet, weather, feelsLike, wind, humidity, prec }) {
    
    // Base styling with light/dark mode
    const [style, setStyle] = useState({
        height: "100vh",
        width: "100%",
        backgroundColor: mode ? "#0f172a" : "#fff7e6",
        color: mode ? "#f1f5f9" : "#1e293b",
        transition: "background-color 0.5s ease, color 0.5s ease",
        overflow: "hidden" // Prevent scrolling
    });

    // Add stars for dark mode
    const [stars, setStars] = useState([]);
    
    useEffect(() => {
        if (mode) {
            // Generate stars only in dark mode
            const starCount = 100;
            const newStars = [];
            
            for (let i = 0; i < starCount; i++) {
                newStars.push({
                    id: i,
                    left: Math.random() * 100 + '%',
                    top: Math.random() * 100 + '%',
                    size: Math.random() * 3 + 1 + 'px',
                    animationDuration: Math.random() * 3 + 2 + 's',
                });
            }
            
            setStars(newStars);
        } else {
            setStars([]);
        }
    }, [mode]);

    // Apply body styles when mode changes
    useEffect(() => {
        document.body.style.backgroundColor = mode ? "#0f172a" : "#fff7e6";
        document.body.style.color = mode ? "#f1f5f9" : "#1e293b";
        document.body.style.transition = "background-color 0.5s ease, color 0.5s ease";
        document.body.style.margin = "0";
        document.body.style.padding = "0";
        document.body.style.fontFamily = "'Nunito', sans-serif";
        document.body.style.overflow = "hidden"; // Prevent scrolling
        
        // Ensure html element has no scrollbar as well
        document.documentElement.style.overflow = "hidden";
        document.documentElement.style.height = "100%";
    }, [mode]);

    // Update container styles when mode changes
    useEffect(() => {
        setStyle({
            ...style,
            backgroundColor: mode ? "#0f172a" : "#fff7e6",
            color: mode ? "#f1f5f9" : "#1e293b"
        });
    }, [mode]);

    // Card holder styling with hover effects - adjusted for better fit
    const [holder, setHolder] = useState({
        width: "90%",
        maxWidth: "800px",
        margin: "0 auto",
        marginTop: "5vh",
        padding: "20px", // Reduced padding
        borderRadius: "20px",
        backgroundColor: mode ? "rgba(30, 58, 138, 0.3)" : "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(10px)",
        boxShadow: mode ? "0 10px 25px rgba(0, 0, 0, 0.2)" : "0 10px 25px rgba(0, 0, 0, 0.1)",
        transition: "all 0.4s ease-in-out",
        maxHeight: "85vh" // Ensure it fits in viewport
        
    });

    // Hover effects
    const handleMouseEnter = () => {
        setHolder(prev => ({
            ...prev,
            backgroundColor: mode ? "rgba(30, 58, 138, 0.4)" : "rgba(255, 255, 255, 0.8)",
            transform: "translateY(-5px)",
            boxShadow: mode ? 
                "0 15px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(99, 102, 241, 0.4)" : 
                "0 15px 30px rgba(0, 0, 0, 0.15), 0 0 20px rgba(251, 191, 36, 0.2)"
        }));
    };
    
    const handleMouseLeave = () => {
        setHolder(prev => ({
            ...prev,
            backgroundColor: mode ? "rgba(30, 58, 138, 0.3)" : "rgba(255, 255, 255, 0.7)",
            transform: "translateY(0)",
            boxShadow: mode ? "0 10px 25px rgba(0, 0, 0, 0.2)" : "0 10px 25px rgba(0, 0, 0, 0.1)"
        }));
    };

    // Get weather icon class based on weather condition
    const getWeatherIcon = (weather) => {
        const condition = weather.toLowerCase();
        if (condition.includes('clear') || condition.includes('sunny')) return 'wi wi-day-sunny';
        if (condition.includes('cloud')) return 'wi wi-cloudy';
        if (condition.includes('rain')) return 'wi wi-rain';
        if (condition.includes('snow')) return 'wi wi-snow';
        if (condition.includes('storm') || condition.includes('thunder')) return 'wi wi-thunderstorm';
        if (condition.includes('fog') || condition.includes('mist')) return 'wi wi-fog';
        return 'wi wi-day-cloudy';
    };

    return (
        <div style={style} className="weather-container">
            {/* Stars in dark mode */}
            {mode && stars.map(star => (
                <div 
                    key={star.id} 
                    className="star" 
                    style={{
                        left: star.left,
                        top: star.top,
                        width: star.size,
                        height: star.size,
                        animationDuration: star.animationDuration
                    }}
                />
            ))}
            
            <div className="container">
                <div 
                    style={holder} 
                    className="weather-card"
                    onMouseEnter={handleMouseEnter} 
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="row">
                        <div className="col-md-6">
                            <div className="temperature-display">
                                <div className="current-temp">
                                    <span className="temp-value">{now}</span>
                                    <span className="temp-unit">°C</span>
                                </div>
                                <div className="weather-description">
                                    <i className={getWeatherIcon(weather)}></i>
                                    <span>{weather}</span>
                                </div>
                                <div className="feels-like">
                                    Feels Like {feelsLike}°C
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-md-6">
                            <div className="weather-details">
                                <div className="details-section">
                                    <h3>
                                        <i className="wi wi-horizon"></i> Sun Schedule
                                    </h3>
                                    <div className="sun-times">
                                        <div className="sun-item">
                                            <i className="wi wi-sunrise"></i>
                                            <span><b>Sunrise:</b> {sunRise}</span>
                                        </div>
                                        <div className="sun-item">
                                            <i className="wi wi-sunset"></i>
                                            <span><b>Sunset:</b> {sunSet}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="details-section">
                                    <h3>
                                        <i className="wi wi-barometer"></i> Weather Details
                                    </h3>
                                    <div className="details-grid">
                                        <div className="detail-item">
                                            <i className="wi wi-strong-wind"></i>
                                            <div>
                                                <span className="detail-label">Wind</span>
                                                <span className="detail-value">{wind} m/s</span>
                                            </div>
                                        </div>
                                        <div className="detail-item">
                                            <i className="wi wi-humidity"></i>
                                            <div>
                                                <span className="detail-label">Humidity</span>
                                                <span className="detail-value">{humidity}%</span>
                                            </div>
                                        </div>
                                        <div className="detail-item">
                                            <i className="wi wi-raindrops"></i>
                                            <div>
                                                <span className="detail-label">Precipitation</span>
                                                <span className="detail-value">{prec} mm</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Container.defaultProps = {
    mode: false
};