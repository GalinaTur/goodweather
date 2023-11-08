import styles from './About.module.scss';
import Logo from '../../Logo/Logo';

export default function About() {

    return (
        <>
        <div className={styles.about}>
            <h3>About <Logo className={styles.logo} /></h3>
            <p>Welcome to GoodWeather – your go-to source for accurate and up-to-date weather information.
                Our user-friendly weather app provides both current weather conditions and detailed forecasts,
                allowing you to stay prepared for any weather scenario.</p>
            <div>
                <h4>Key Features:</h4>
                <ul>
                    <li>Current Weather: Get real-time weather updates for your location, including temperature, humidity, wind speed, and more.</li>

                    <li>Weather Forecast: Plan your week with a detailed weather forecast that covers the next few days, so you're never caught off guard.</li>

                    <li>Air Quality Index (AQI): We care about your health and safety. Check the Air Quality Index to stay informed about the air you breathe.</li>

                </ul>
                </div>
        </div>
        </>
    )
}

