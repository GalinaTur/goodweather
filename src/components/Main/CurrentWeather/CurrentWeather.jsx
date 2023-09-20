import { useState, useEffect } from 'react';
import styles from './CurrentWeather.module.scss';
import { Link } from 'react-router-dom';
import TemperatureBig from '../TemperatureBig/TemperatureBig';
import WeatherIcon from '../WeatherIcon/WeatherIcon';

const formatDate = date => new Date(date).toUTCString().slice(0, 16);
const formatTime = time => new Date(time).toUTCString().slice(17, 22);

export default function CurrentWeather({ data }) {
    const [currentDateTime, setCurrentDateTime] = useState(data && new Date(Date.now() + data.timezone));

    useEffect(() => {
        let dateTime = new Date(Date.now() + data.timezone);
        setCurrentDateTime(dateTime);

        setInterval(() => {
            dateTime = new Date(Date.now() + data.timezone);
            setCurrentDateTime(dateTime);
        }, 60000);
    }, [data]);

    return (
        <Link to='/details/today' className={styles.current}>
            {!data ? 'Loading...' :
                <>
                    <div className={styles.date}>
                        <p className={styles.time} data-testid='currTime'>{formatTime(currentDateTime)}</p>
                        <p data-testid='currDate'>{formatDate(currentDateTime)}</p>
                    </div>

                    <TemperatureBig data={data.temp} className={styles.temperature}/>
                        <div className={styles.weather}>
                        <WeatherIcon data={data.weatherIcon} className={styles.icon} />
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

