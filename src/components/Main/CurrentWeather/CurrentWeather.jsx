import styles from './CurrentWeather.module.scss';
import icons from '../../../assets/sprite.svg';

export default function CurrentWeather({ data }) {

    return (
        <div className={styles.current}>
            {!data ? 'Loading...' :
                <>
                    <div className={styles.date}>
                        <p className={styles.time} data-testid='currTime'>{data?.time}</p>
                        <p data-testid='currDate'>{data?.date}</p>
                    </div>

                    <p className={styles.temperature} data-testid='currTemp'><span>{data.temp}</span>°C</p>
                    <div className={styles.weather}>
                        <svg width='90' height='90' viewBox="0 0 100 100" role="img" aria-label={`Current weather: ${data?.weather}`}>
                            <use href={`${icons}#${data?.weatherIcon}`} data-testid={data?.weatherIcon} />
                        </svg>
                        <p className={styles.weather_text}>{data?.weather}</p>
                    </div>
                    <div className={styles.details}>
                        <div className={styles.feelsLike}>
                            <p>Feels like: {data?.details?.[0].value}</p>
                        </div>
                        <div className={styles.wind}>
                            <div>Wind:{data.details?.[5].value}</div>
                            {data?.windDirWords}
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

