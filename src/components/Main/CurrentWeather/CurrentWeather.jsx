import { useState, useEffect } from 'react';
import styles from './CurrentWeather.module.scss';
import icons from '../../../assets/sprite.svg';
import { Link } from 'react-router-dom';

export default function CurrentWeather({ data }) {
    const [currentDate, setCurrentDate] = useState(null);
    const [currentTime, setCurrentTime] = useState(null);

    useEffect(() => {
        let dateTime = new Date(Date.now() + data.timezone);
        setCurrentDate(dateTime.toUTCString().slice(0, 16));
        setCurrentTime(dateTime.toUTCString().slice(17, 22));

        setInterval(() => {
            dateTime = new Date(Date.now() + data.timezone);
            setCurrentDate(dateTime.toUTCString().slice(0, 16));
            setCurrentTime(dateTime.toUTCString().slice(17, 22));
        }, 60000);
    }, [data]);

    return (
            <Link to='/details/today' className={styles.current}>
                {!data ? 'Loading...' :
                    <>
                        <div className={styles.date}>
                            <p className={styles.time} data-testid='currTime'>{currentTime}</p>
                            <p data-testid='currDate'>{currentDate}</p>
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
            </Link>
    )
}

