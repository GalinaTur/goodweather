import { useState, useEffect } from 'react';
import Container from '../Container/Container';
import ChartBlock from './ChartBlock/ChartBlock';
import CurrentWeather from './CurrentWeather/CurrentWeather';
import ExtendedBlock from './ExtendedBlock/ExtendedBlock';
import styles from './Main.module.scss';
import TableBlock from './TableBlock/TableBlock';
import bgClearD from '../../assets/img/clear_d.jpg';
import bgClearN from '../../assets/img/clear_n.jpg';
import bgCloudsD from '../../assets/img/clouds_d.jpg';
import bgCloudsN from '../../assets/img/clouds_n.jpg';
import bgRain from '../../assets/img/rain.jpg';
import bgSnowD from '../../assets/img/snow_d.jpg';
import bgSnowN from '../../assets/img/snow_n.jpg';
import bgThunder from '../../assets/img/thunder.jpg';
import bgTornado from '../../assets/img/tornado.jpg';
import bgMist from '../../assets/img/mist.jpg';

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

const iconIdCreator = (weatherDescription, timeOfDay) => {
    let iconID = `${weatherDescription.replaceAll(' ', '_')}_${timeOfDay}`;
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

let setBgImage = (weather, partOfDay) => {
    if (weather === 'Clear' && partOfDay === 'd') {
        document.body.style.backgroundImage = `url(${bgClearD})`;
    } else if (weather === 'Clear' && partOfDay === 'n') {
        document.body.style.backgroundImage = `url(${bgClearN})`;
    } else if (weather === 'Clouds' && partOfDay === 'd') {
        document.body.style.backgroundImage = `url(${bgCloudsD})`;
    } else if (weather === 'Clouds' && partOfDay === 'n') {
        document.body.style.backgroundImage = `url(${bgCloudsN})`;
    } else if (weather === 'Rain' || weather === 'Drizzle') {
        document.body.style.backgroundImage = `url(${bgRain})`;
    } else if (weather === 'Snow' && partOfDay === 'd') {
        document.body.style.backgroundImage = `url(${bgSnowD})`;
    } else if (weather === 'Snow' && partOfDay === 'n') {
        document.body.style.backgroundImage = `url(${bgSnowN})`;
    } else if (weather === 'Thunderstorm') {
        document.body.style.backgroundImage = `url(${bgThunder})`;
    } else if (weather === 'Tornado') {
        document.body.style.backgroundImage = `url(${bgTornado})`;
    } else {
        document.body.style.backgroundImage = `url(${bgMist})`;
    }
}

let dateTime = new Date();

export default function Main({ fetchData, currentLocation, API_KEY, API_URL }) {

    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [currentDate, setCurrentDate] = useState(formatDate(dateTime));
    const [currentTime, setCurrentTime] = useState(formatTime(dateTime));
    const [airPollut, setAirPollut] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setInterval(() => {
            dateTime = new Date();
            setCurrentDate(formatDate(dateTime));
            setCurrentTime(formatTime(dateTime));
        }, 60000);
    }, []);

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

    useEffect(() => {
        if (currentLocation) {
            fetchData(API_URL.airPollution, currentLocation[0]['lat'], currentLocation[0]['lon'], '', API_KEY, '', setAirPollut, setError);
        }
    }, [currentLocation]);

    // const createDataMap = (data) => {
    //     const dataMap = new Map ([
    //         ['Feels&nbsp;like', Math.round(data.main.feels_like)],
    //         ['Pressure', data.main.pressure],
    //         ['Humidity', data.main.humidity],
    //         ['Cloudiness', data.clouds.all],
    //         ['Visibility', data.visibility],
    //         ['Wind', {deg:data.wind.deg, speed:data.wind.speed}],
    //         ['Gust', data.wind.gust],
    //     ])
    //     }
        

    const currentData = {
        date: currentDate,
        time: currentTime,
        temp: currentWeather && Math.round(currentWeather.main.temp),
        weather: currentWeather?.weather[0].description,
        briefWeather: currentWeather?.weather[0].main,
        partOfDay: currentWeather && currentWeather.weather[0].icon.slice(-1),
        feelsLike: currentWeather && Math.round(currentWeather.main.feels_like),
        windDeg: currentWeather?.wind.deg,
        windSpeed: currentWeather && Math.round(currentWeather.wind.speed),
        windGust: currentWeather?.wind.gust,
        pressure: currentWeather?.main.pressure,
        humidity: currentWeather?.main.humidity,
        visibility: currentWeather?.visibility,
        cloudiness: currentWeather?.clouds.all,
        pop: currentWeather?.pop,
        rain: {
            '1h': currentWeather?.rain?.['1h'] || null,
            '3h': currentWeather?.rain?.['3h'] || null,
        },
        snow: {
            '1h': currentWeather?.snow?.['1h'] || null,
            '3h': currentWeather?.snow?.['3h'] || null,
        },
        sunrise: currentWeather?.sys.sunrise,
        sunrise: currentWeather?.sys.sunset,
        aqi: airPollut?.list[0].main.aqi,
    }

    const daily = {
        
    }

    useEffect(() => {
        if (!currentData.briefWeather) return;
        setBgImage(currentData.briefWeather, currentData.partOfDay);
    }, [currentWeather]);

    return (
        <main className={styles.main}>
            <Container className={styles.container}>
                <>
                    {/* <ExtendedBlock weather={currentWeather} iconIdCreator={iconIdCreator} defineWindDirection={defineWindDirection}/> */}
                    <CurrentWeather className={styles.current} data={currentData} iconIdCreator={iconIdCreator} defineWindDirection={defineWindDirection} />
                    <ChartBlock className={styles.chart} forecast={forecast} iconIdCreator={iconIdCreator} definePrecip={definePrecip} />
                    <TableBlock className={styles.table} forecast={forecast} iconIdCreator={iconIdCreator} formatDT={formatDT} definePrecip={definePrecip} />
                </>
            </Container>
        </main>
    )
}

