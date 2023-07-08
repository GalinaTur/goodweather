import { useState, useEffect } from 'react';
import styles from './CurrentWeather.module.scss';
import icons from '../../../assets/sprite.svg';

let dateTime = new Date();

const defineWindDirection = (deg) => {
    return (deg < 22.5) ? 'North'
        : (deg < 67.5) ? 'North-East'
            : (deg < 112.5) ? 'East'
                : (deg < 157.5) ? 'South-East'
                    : (deg < 202.5) ? 'South'
                        : (deg < 247.5) ? 'South-West'
                            : (deg < 292.5) ? 'West'
                                : (deg < 337.5) ? 'North-West'
                                    : 'North';
}

export default function CurrentWeather({ currentWeather, formatDate, formatTime, iconIdCreator }) {

    const [currentDate, setCurrentDate] = useState(formatDate(dateTime));
    const [currentTime, setCurrentTime] = useState(formatTime(dateTime));

    useEffect(() => {
        setInterval(() => {
            dateTime = new Date();
            setCurrentDate(formatDate(dateTime));
            setCurrentTime(formatTime(dateTime));
        }, 60000);
    }, []);

    const temp = currentWeather? Math.round(currentWeather.main.temp) : '';
    const weather = currentWeather?.weather[0].description;
    const partOfDay = currentWeather? currentWeather.weather[0].icon.slice(-1) : '';
    const feelsLike = currentWeather? Math.round(currentWeather.main.feels_like) : '';
    const windDeg = currentWeather?.wind.deg;
    const windSpeed = currentWeather? Math.round(currentWeather.wind.speed) : '';

    return (
        <div className={styles.current}>
        {!currentWeather? 'Loading...' :
        <>
            <div className={styles.date}>
                <p className={styles.time}>{currentTime}</p>
                <p>{currentDate}</p>
            </div>

            <p className={styles.temperature}><span>{temp}</span> °C</p>
            <div className={styles.weather}>
                <svg width='100' height='100' viewBox="0 0 100 100" role="img" aria-roledescription="">
                    <use href={`${icons}#${!weather? '' :iconIdCreator(weather, partOfDay)}`} />
                </svg>
                <p className={styles.weather_text}>{weather}</p>
            </div>
            <div className={styles.details}>
                <div className={styles.feelsLike}>
                    <p>Feels like: {feelsLike}°C</p>
                </div>
                <div className={styles.wind}>
                    <p className={styles.deg}>Wind:
                        <svg width='20' height='20' viewBox="0 0 100 100" role="img" aria-roledescription="" style={{ transform: `rotate(${windDeg}deg)` }}>
                            <use href={`${icons}#wind_dir`} />
                        </svg>
                        {defineWindDirection(windDeg)}</p>
                    <p className={styles.speed}>{windSpeed} km/h</p>
                </div>
            </div>
            </>
        }
        </div>
    )
}

