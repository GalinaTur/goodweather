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

const setTwoDigit = (numb) => {
    return numb < 10 ? `0${numb}` : numb;
}

const formatDT = (dt) => {
    const dateTime = new Date(dt * 1000);
    let newDate = formatDate(dateTime);
    let dayOfWeek = newDate.slice(0, 3);
    let date = `${setTwoDigit(dateTime.getDate())}.${setTwoDigit(dateTime.getMonth() + 1)}`
    switch (dayOfWeek) {
        case 'Mon': dayOfWeek = 'Monday';
            break;
        case 'Tue': dayOfWeek = 'Tuesday';
            break;
        case 'Wed': dayOfWeek = 'Wednesday';
            break;
        case 'Thu': dayOfWeek = 'Thursday';
            break;
        case 'Fri': dayOfWeek = 'Friday';
            break;
        case 'Sat': dayOfWeek = 'Saturday';
            break;
        case 'Sun': dayOfWeek = 'Sunday';
            break;
    }
    return [dayOfWeek, date];
}

const iconIdCreator = (weather_description, time_of_day) => {
    let iconID = `${weather_description.replaceAll(' ', '_')}_${time_of_day}`;
    return iconID;
}

const definePrecip = (temp, type) => {
    if (!type) {
        return temp < 0 ? '❄' : '💧';
    } else if (type = 'rain') {
        return '💧';
    } else if (type = 'snow') {
        return '❄';
    }
}

const defineWindDirection = (deg) => {
    if (deg < 22.5 || deg > 337.5) 
        return 'North';
    if (deg < 67.5)
        return 'North-East';
    if (deg < 112.5)
        return 'East';
    if (deg < 157.5)
        return 'South-East';
    if (deg < 202.5)
        return 'South';
    if (deg < 247.5)
        return 'South-West';
    if (deg < 292.5)
        return 'West';
    if (deg < 337.5)
        return 'North-West';
}

export default function Main({ fetchData, currentLocation, API_KEY, API_URL }) {

    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
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

    return !currentLocation ? 'Loading' : (
        <main className={styles.main}>
            <Container className={styles.container}>
                <CurrentWeather currentWeather={currentWeather} formatDate={formatDate} formatTime={formatTime} iconIdCreator={iconIdCreator} defineWindDirection={defineWindDirection} />
                <ChartBlock forecast={forecast} iconIdCreator={iconIdCreator} definePrecip={definePrecip} />
                <TableBlock forecast={forecast} iconIdCreator={iconIdCreator} formatDT={formatDT} definePrecip={definePrecip}/>
            </Container>
        </main>
    )
}

