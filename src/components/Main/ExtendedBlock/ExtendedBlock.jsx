import styles from './ExtendedBlock.module.scss';
import icons from '../../../assets/sprite.svg';


export default function ExtendedBlock({ weather, iconIdCreator, defineWindDirection }) {

    const temp = weather ? Math.round(weather.main.temp) : '';
    const weatherDesc = weather?.weather[0].description;
    const briefWeather = weather?.weather[0].main;
    const partOfDay = weather ? weather.weather[0].icon.slice(-1) : '';
    const feelsLike = weather ? Math.round(weather.main.feels_like) : '';
    const windDeg = weather?.wind.deg;
    const windSpeed = weather ? Math.round(weather.wind.speed) : '';

    return (
        <div className={styles.extended}>
            {!weather ? 'Loading...' :
                <>
                    <div className={styles.header}>
                        <div className={styles.part}>
                            <p className={styles.temperature}><span>{temp}</span> °C</p>
                            <div className={styles.weather}>
                                <svg width='70' height='70' viewBox="0 0 100 100" role="img" aria-roledescription="">
                                    <use href={`${icons}#${!weather ? '' : iconIdCreator(weatherDesc, partOfDay)}`} />
                                </svg>
                                <p className={styles.weather_text}>{weatherDesc}</p>
                            </div>
                        </div>

                        <div className={styles.part}>
                            <p className={styles.sun}>
                                <svg width='50' height='50' viewBox="0 0 100 100" role="img" aria-roledescription="">
                                    <use href={`${icons}#sunrise`} />
                                </svg>
                                06:32
                            </p>
                            <p className={styles.sun}>
                                <svg width='50' height='50' viewBox="0 0 100 100" role="img" aria-roledescription="">
                                    <use href={`${icons}#sunset`} />
                                </svg>
                                21:15
                            </p>
                        </div>
                    </div>
                    <div className={styles.body}>
                        <ul>
                            <li>
                                <span>
                                    <svg width='20' height='20' viewBox="0 0 100 100" role="img" aria-roledescription="">
                                        <use href={`${icons}#feelsLike`} />
                                    </svg>
                                    Feels like</span>
                                <span>27°C</span>
                            </li>
                            <li>
                                <span>
                                    <svg width='20' height='20' viewBox="0 0 100 100" role="img" aria-roledescription="">
                                        <use href={`${icons}#pressure`} />
                                    </svg>
                                    Pressure</span>
                                <span>1052 hPa</span>
                            </li>
                            <li>
                                <span>
                                    <svg width='20' height='20' viewBox="0 0 100 100" role="img" aria-roledescription="">
                                        <use href={`${icons}#humidity`} />
                                    </svg>
                                    Humidity</span>
                                <span>68%</span>
                            </li>
                            <li>
                                <span>
                                    <svg width='20' height='20' viewBox="0 0 100 100" role="img" aria-roledescription="">
                                        <use href={`${icons}#cloudiness`} />
                                    </svg>
                                    Cloudiness</span>
                                <span>23%</span>
                            </li>
                            <li>
                                <span>
                                    <svg width='20' height='20' viewBox="0 0 100 100" role="img" aria-roledescription="">
                                        <use href={`${icons}#visibility`} />
                                    </svg>
                                    Visibility</span>
                                <span>100%</span>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <span>
                                    <svg width='20' height='20' viewBox="0 0 100 100" role="img" aria-roledescription="">
                                        <use href={`${icons}#wind`} />
                                    </svg>
                                    Wind</span>
                                <span>28 km/h</span>
                            </li>
                            <li>
                                <span>
                                    <svg width='20' height='20' viewBox="0 0 100 100" role="img" aria-roledescription="">
                                        <use href={`${icons}#gust`} />
                                    </svg>
                                    Gust</span>
                                <span>1.5 meter/sec</span>
                            </li>
                            <li>
                                <span>
                                    <svg width='20' height='20' viewBox="0 0 100 100" role="img" aria-roledescription="">
                                        <use href={`${icons}#chance`} />
                                    </svg>
                                    Chance of rain</span>
                                <span>--</span>
                            </li>
                            <li>
                                <span>
                                    <svg width='20' height='20' viewBox="0 0 100 100" role="img" aria-roledescription="">
                                        <use href={`${icons}#volume`} />
                                    </svg>
                                    Precipitation volume</span>
                                <span>23 mm</span>
                            </li>
                            <li>
                                <span>
                                    <svg width='20' height='20' viewBox="0 0 100 100" role="img" aria-roledescription="">
                                        <use href={`${icons}#aqi`} />
                                    </svg>
                                    Air quality index</span>
                                <span>1 (Good)</span>
                            </li>
                        </ul>
                    </div>

                </>
            }
        </div>
    )
}

