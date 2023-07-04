import styles from './CurrentWeather.module.scss';
import icons from '../../../assets/sprite.svg';

export default function CurrentWeather() {

    return (
        <div className={styles.current}>
            <div className={styles.date}>
                <p>Wed - June 28, 2023</p>
                <p><span>11:51 AM</span></p>
            </div>

            <p className={styles.temperature}><span>23</span> °C</p>
            <div className={styles.weather}>
                <svg width='100' height='100' viewBox="0 0 100 100" role="img" aria-roledescription="">
                    <use href={`${icons}#day_rain_thunder`} />
                </svg>
                <p>Thunder</p>
            </div>
            <div className={styles.temperatureDiff}>
                <p>Max: 25°C</p>
                <p>Min: 19°C</p>
            </div>
            <div className={styles.wind}>
                <p>West South 13km/h</p>
            </div>
        </div>
    )
}

