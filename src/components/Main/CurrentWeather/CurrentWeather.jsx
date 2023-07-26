import { useState, useEffect } from 'react';
import styles from './CurrentWeather.module.scss';
import icons from '../../../assets/sprite.svg';
import classNames from 'classnames';

export default function CurrentWeather({ data }) {

    return (
        <div className={styles.current}>
            {!data ? 'Loading...' :
                <>
                    <div className={styles.date}>
                        <p className={styles.time}>{data?.time}</p>
                        <p>{data?.date}</p>
                    </div>

                    <p className={styles.temperature}><span>{data.temp}</span> {data?.details?.[0].unit}</p>
                    <div className={styles.weather}>
                        <svg width='90' height='90' viewBox="0 0 100 100" role="img" aria-roledescription="">
                            <use href={`${icons}#${data?.weatherIcon}`} />
                        </svg>
                        <p className={styles.weather_text}>{data?.weather}</p>
                    </div>
                    <div className={styles.details}>
                        <div className={styles.feelsLike}>
                            <p>Feels like: {data?.details?.[0].value} {data?.details?.[0].unit}</p>
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

