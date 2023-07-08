import { useState, useEffect } from 'react';
import Container from '../Container/Container';
import ChartBlock from './ChartBlock/ChartBlock';
import CurrentWeather from './CurrentWeather/CurrentWeather';
import styles from './Main.module.scss';
import TableBlock from './TableBlock/TableBlock';

const API_ADDITIONAL = '&units=metric';

const formatDate = (date) => {
    let oldDate = date.toDateString();
    let newDate = `${oldDate.slice(0, 3)} - ${oldDate.slice(4, 10)}, ${oldDate.slice(11)}`;
    return newDate;
}

const formatTime = (time) => {
    let oldTime = time.toTimeString();
    let newTime = oldTime.slice(0, 5);
    return newTime;
}

const iconIdCreator = (weather_description, time_of_day) => {
    let iconID = `${weather_description.replaceAll(' ', '_')}_${time_of_day}`;
    return iconID;
}

export default function Main({ fetchData, currentLocation, API_KEY, API_URL }) {
   
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [error, setError] = useState(null);

   

    useEffect(() => {
        if (currentLocation) {
            fetchData(API_URL.weather, currentLocation[0]['lat'], currentLocation[0]['lon'], '', API_KEY, API_ADDITIONAL, setCurrentWeather, setError);
        }
    }, [currentLocation]);

    useEffect(() => {
        if (currentLocation) {
            fetchData(API_URL.forecast, currentLocation[0]['lat'], currentLocation[0]['lon'], '', API_KEY, API_ADDITIONAL, setForecast, setError);
        }
    }, [currentLocation]);

    return (
        <main className={styles.main}>
            <Container className={styles.container}>
                <CurrentWeather currentWeather={currentWeather} formatDate={formatDate} formatTime={formatTime} iconIdCreator={iconIdCreator}/>
                <ChartBlock forecast={forecast} iconIdCreator={iconIdCreator}/>
                <TableBlock />
            </Container>
        </main>
    )
}

