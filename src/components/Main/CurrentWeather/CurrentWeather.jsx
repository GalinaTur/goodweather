import { useState, useEffect } from 'react';
import styles from './CurrentWeather.module.scss';
import icons from '../../../assets/sprite.svg';
import classNames from 'classnames';

export default function CurrentWeather({ data, iconIdCreator, defineWindDirection, className }) {

    return (
        <div className={classNames(className, styles.current)}>
            {!data ? 'Loading...' :
                <>
                    <div className={styles.date}>
                        <p className={styles.time}>{data.time}</p>
                        <p>{data.date}</p>
                    </div>

                    <p className={styles.temperature}><span>{data.temp}</span> °C</p>
                    <div className={styles.weather}>
                        <svg width='90' height='90' viewBox="0 0 100 100" role="img" aria-roledescription="">
                            <use href={`${icons}#${!data.weather ? '' : iconIdCreator(data.weather, data.partOfDay)}`} />
                        </svg>
                        <p className={styles.weather_text}>{data.weather}</p>
                    </div>
                    <div className={styles.details}>
                        <div className={styles.feelsLike}>
                            <p>Feels like: {data.feelsLike}°C</p>
                        </div>
                        <div className={styles.wind}>
                            <p className={styles.deg}>Wind:
                                <svg width='20' height='20' viewBox="0 0 100 100" role="img" aria-roledescription="" style={{ transform: `rotate(${data.windDeg}deg)` }}>
                                    <use href={`${icons}#wind_dir`} />
                                </svg>
                                {defineWindDirection(data.windDeg)}</p>
                            <p className={styles.speed}>{data.windSpeed} km/h</p>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

