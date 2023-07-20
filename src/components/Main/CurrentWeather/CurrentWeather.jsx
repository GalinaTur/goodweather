import { useState, useEffect } from 'react';
import styles from './CurrentWeather.module.scss';
import icons from '../../../assets/sprite.svg';
import classNames from 'classnames';
import bgClearD from '../../../assets/img/clear_d.jpg';
import bgClearN from '../../../assets/img/clear_n.jpg';
import bgCloudsD from '../../../assets/img/clouds_d.jpg';
import bgCloudsN from '../../../assets/img/clouds_n.jpg';
import bgRain from '../../../assets/img/rain.jpg';
import bgSnowD from '../../../assets/img/snow_d.jpg';
import bgSnowN from '../../../assets/img/snow_n.jpg';
import bgThunder from '../../../assets/img/thunder.jpg';
import bgTornado from '../../../assets/img/tornado.jpg';
import bgMist from '../../../assets/img/mist.jpg';

let dateTime = new Date();

let setBgImage = (weather, partOfDay) => {
    if (weather === 'Clear' && partOfDay == 'd') {
        document.body.style.backgroundImage = `url(${bgClearD})`;
    } else if (weather === 'Clear' && partOfDay == 'n') {
        document.body.style.backgroundImage = `url(${bgClearN})`;
    } else if (weather === 'Clouds' && partOfDay == 'd') {
        document.body.style.backgroundImage = `url(${bgCloudsD})`;
    } else if (weather === 'Clouds' && partOfDay == 'n') {
        document.body.style.backgroundImage = `url(${bgCloudsN})`;
    } else if (weather === 'Rain' || weather === 'Drizzle') {
        document.body.style.backgroundImage = `url(${bgRain})`;
    } else if (weather === 'Snow' && partOfDay == 'd') {
        document.body.style.backgroundImage = `url(${bgSnowD})`;
    } else if (weather === 'Snow' && partOfDay == 'n') {
        document.body.style.backgroundImage = `url(${bgSnowN})`;
    } else if (weather === 'Thunderstorm') {
        document.body.style.backgroundImage = `url(${bgThunder})`;
    } else if (weather === 'Tornado') {
        document.body.style.backgroundImage = `url(${bgTornado})`;
    } else {
        document.body.style.backgroundImage = `url(${bgMist})`;
    }
}

export default function CurrentWeather({ currentWeather, formatDate, formatTime, iconIdCreator, defineWindDirection, className }) {

    const [currentDate, setCurrentDate] = useState(formatDate(dateTime));
    const [currentTime, setCurrentTime] = useState(formatTime(dateTime));

    useEffect(() => {
        setInterval(() => {
            dateTime = new Date();
            setCurrentDate(formatDate(dateTime));
            setCurrentTime(formatTime(dateTime));
        }, 60000);
    }, []);

    const temp = currentWeather ? Math.round(currentWeather.main.temp) : '';
    const weather = currentWeather?.weather[0].description;
    const briefWeather = currentWeather?.weather[0].main;
    const partOfDay = currentWeather ? currentWeather.weather[0].icon.slice(-1) : '';
    const feelsLike = currentWeather ? Math.round(currentWeather.main.feels_like) : '';
    const windDeg = currentWeather?.wind.deg;
    const windSpeed = currentWeather ? Math.round(currentWeather.wind.speed) : '';

    useEffect(()=> { 
        if (!briefWeather) return;
        setBgImage(briefWeather, partOfDay);
    }, [currentWeather]);

    return (
        <div className={classNames(className, styles.current)}>
            {!currentWeather ? 'Loading...' :
                <>
                    <div className={styles.date}>
                        <p className={styles.time}>{currentTime}</p>
                        <p>{currentDate}</p>
                    </div>

                    <p className={styles.temperature}><span>{temp}</span> °C</p>
                    <div className={styles.weather}>
                        <svg width='90' height='90' viewBox="0 0 100 100" role="img" aria-roledescription="">
                            <use href={`${icons}#${!weather ? '' : iconIdCreator(weather, partOfDay)}`} />
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

