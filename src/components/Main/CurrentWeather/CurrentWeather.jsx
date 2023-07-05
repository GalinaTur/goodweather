import styles from './CurrentWeather.module.scss';
import icons from '../../../assets/sprite.svg';

// const iconIdCreator = (weather_description) => {
//     let iconID = 
// }

export default function CurrentWeather({currentWeather, date, time}) {

    return (
        <div className={styles.current}>
            <div className={styles.date}>
                <p>{date}</p>
                <p><span>{time}</span></p>
            </div>

            <p className={styles.temperature}><span>{Math.round(currentWeather.temp)}</span> °C</p>
            <div className={styles.weather}>
                <svg width='100' height='100' viewBox="0 0 100 100" role="img" aria-roledescription="">
                    <use href={`${icons}#day_rain_thunder`} />
                </svg>
                <p>{currentWeather.weather}</p>
            </div>
            <div className={styles.feelsLike}>
                <p>Feels like: {Math.round(currentWeather.feels_like)}°C</p>
            </div>
            <div className={styles.wind}>
                <p>West South {Math.round(currentWeather.wind_speed)}km/h</p>
            </div>
        </div>
    )
}

