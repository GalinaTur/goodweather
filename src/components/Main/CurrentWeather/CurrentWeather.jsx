import styles from './CurrentWeather.module.scss';
import icons from '../../../assets/sprite.svg';

const iconIdCreator = (weather_description, time_of_day) => {
    let iconID = `${weather_description.replaceAll(' ', '_')}_${time_of_day}`;
    return iconID;
}

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

export default function CurrentWeather({ currentWeather, date, time }) {
    return (
        <div className={styles.current}>
            <div className={styles.date}>
                <p className={styles.time}>{time}</p>
                <p>{date}</p>
            </div>

            <p className={styles.temperature}><span>{Math.round(currentWeather.temp)}</span> °C</p>
            <div className={styles.weather}>
                <svg width='100' height='100' viewBox="0 0 100 100" role="img" aria-roledescription="">
                    <use href={`${icons}#${iconIdCreator(currentWeather.weather, currentWeather.time_of_day)}`} />
                </svg>
                <p className={styles.weather_text}>{currentWeather.weather}</p>
            </div>
            <div className={styles.details}>
                <div className={styles.feelsLike}>
                    <p>Feels like: {Math.round(currentWeather.feels_like)}°C</p>
                </div>
                <div className={styles.wind}>
                    <p className={styles.deg}>Wind:
                        <svg width='20' height='20' viewBox="0 0 100 100" role="img" aria-roledescription="" style={{ transform: `rotate(${currentWeather.wind_deg}deg)` }}>
                            <use href={`${icons}#wind_dir`} />
                        </svg>
                        {defineWindDirection(currentWeather.wind_deg)}</p>
                    <p className={styles.speed}>{Math.round(currentWeather.wind_speed)}km/h</p>
                </div>
            </div>
        </div>
    )
}

