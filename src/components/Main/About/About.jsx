import styles from './About.module.scss';
import Logo from '../../Logo/Logo';

export default function About() {

    return (
        <>
            <div className={styles.about}>
                <h3>About <Logo className={styles.logo} /></h3>
                <p><strong>Welcome to GoodWeather</strong> – your go-to source for accurate and up-to-date weather information.</p>
                <p>Our user-friendly weather app provides both current weather conditions and detailed forecasts,
                    allowing you to stay prepared for any weather scenario.</p>
                    <h4>Key Features:</h4>
                    <ul>
                        <li><strong>Current Weather:</strong> Get real-time weather updates for your location, including temperature, humidity, wind speed, and more.</li>

                        <li><strong>Weather Forecast:</strong> Plan your week with a detailed weather forecast that covers the next few days, so you're never caught off guard.</li>

                        <li><strong>Air Quality Index (AQI):</strong> We care about your health and safety. Check the Air Quality Index to stay informed about the air you breathe.</li>
                    </ul>
                    <p>Our site sources weather data from <a href='https://openweathermap.org/' target='_blank'><strong>Openweathermap.org</strong></a>, ensuring reliability and accuracy.</p>

                    <p> Whether you're planning your day or just curious about the weather around the world, our site has you covered.</p>

                    <small>Developed by Halyna T. For questions and feedback feel free to reach out at:</small>
                    <div className={styles.contacts}>
                        <a href='mailto: gal227795@gmail.com' className={styles.mail}></a>
                        <a href='https://www.linkedin.com/in/halyna-t/' target="_blank" className={styles.linkedin}></a>
                        <a href='https://github.com/GalinaTur#' target="_blank" className={styles.github}></a>
                    </div>
            </div>
        </>
    )
}

