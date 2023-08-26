import { useState, useEffect } from 'react';
import { useFetch } from '../../useFetch';
import Container from '../Container/Container';
import HomeBlock from './HomeBlock/HomeBlock';
import ExtendedBlock from './ExtendedBlock/ExtendedBlock';
import styles from './Main.module.scss';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
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
import units from '../../utils/store.js';
import icons from '../../assets/sprite.svg';

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
    } else if (type == 'rain') {
        return '💧';
    } else if (type == 'snow') {
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

const createDataArr = (data, aqi) => {
    const dataArr = [
        {
            icon: 'feelsLike',
            key: 'Feels like',
            value: Math.round(data.main.feels_like) + units.temp.metric,
        },
        {
            icon: 'pressure',
            key: 'Pressure',
            value: data.main.pressure + units.pressure.en,
        },
        {
            icon: 'humidity',
            key: 'Humidity',
            value: data.main.humidity + units.humidity,
        },
        {
            icon: 'cloudiness',
            key: 'Cloudiness',
            value: data.clouds.all + units.cloudiness,
        },
        {
            icon: 'visibility',
            key: 'Visibility',
            value: data.visibility / 1000 + units.visibility.en,
        },
        {
            icon: 'wind',
            key: 'Wind',
            value: <p>
                <svg width='20' height='20' viewBox="0 0 100 100" role="img" aria-roledescription="Wind direction" style={{ transform: `rotate(${data.wind.deg}deg)` }}>
                    <use href={`${icons}#wind_dir`} />
                </svg>
                {Math.round(data.wind.speed)}{units.speed.metric.en}
            </p>,
        },
        {
            icon: 'gust',
            key: 'Gust',
            value: data.wind.gust + units.gust.metric.en,
        },
        {
            icon: 'chance',
            key: `Chance of ${data.rain ? 'rain' : data.snow ? 'snow' : 'precipitation'}`,
            value: (Math.round(data.pop) * 100 || 0) + units.pop,
        },
        {
            icon: 'volume',
            key: 'Precipitation volume',
            value: data.rain ? (data.rain?.['1h'] || data.rain?.['3h']) + units.precipitation :
                data.snow ? (data.snow?.['1h'] || data.snow?.['3h']) + units.precipitation : '--',
        },
        {
            icon: 'aqi',
            key: 'Air quality index',
            value: aqi && aqi.main.aqi,
        },
    ]
    return dataArr;
}

const getMaxPoP = (list) => {

    let precipType, tempWhilePrecip;
    let precipitation = list.reduce((maxPoP, elem) => {
        if (maxPoP < elem.details[7].value) {
            maxPoP = Math.round(elem.details[7].value);
            precipType = elem.rain ? "rain" : elem.snow ? 'snow' : '';
            tempWhilePrecip = elem.temp;
        }
        return maxPoP;
    }, 0);
    precipitation = `${definePrecip(tempWhilePrecip, precipType)} ${precipitation}%`
    return precipitation;
}

const getDayByMaxValue = (obj) => {
    let actualKey = '';
    let maxValue = 0;
    for (const [key, value] of Object.entries(obj)) {
        if (value > maxValue) {
            maxValue = value;
            actualKey = key;
        }
    }
    return actualKey;
}

const getMaxWindSpeed = (list) => {
    let indexOfElement = 0;
    list.reduce((maxWind, elem, i) => {
        if (elem.windSpeed > maxWind) {
            maxWind = Math.round(elem.windSpeed);
            indexOfElement = i;
        }
        return indexOfElement;
    }, 0);
    return list[indexOfElement].details[5].value;
}

const getTempExtremums = (list) => {
    const temps = [...list.map((e) => Math.round(e.temp))];
    return `${Math.min(...temps)}° / ${Math.max(...temps)}°`
}

const defineCommonWeatherPerDay = (data) => {

    const commonWeather = [...data.map((e) => e.weather)].reduce((acc, weath) => {
        acc[weath] ? acc[weath] = acc[weath] + 1 : acc[weath] = 1;
        return acc;
    }, {});
    return getDayByMaxValue(commonWeather);
}

const groupForecastByDay = (forecast) => {
    const list = forecast.reduce((newList, elem) => {
        const key = elem.date;
        if (!newList[key]) newList[key] = [];
        newList[key].push(elem);
        return newList;
    }, {});
    return list;
}

const addDetailsForDay = (list) => {
    const groupedList = groupForecastByDay(list);
    for (let [key, value] of Object.entries(groupedList)) {
        groupedList[key].detailsForTable = {
            dayOfWeek: value[0].dayOfWeek[0],
            date: value[0].dayOfWeek[1],
            weatherIcon: <svg width='50' height='50' viewBox="0 0 100 100" role="img" aria-roledescription="">
                <use href={`${icons}#${iconIdCreator(defineCommonWeatherPerDay(value), 'd')}`} />
            </svg>,
            weather: defineCommonWeatherPerDay(value),
            popr: getMaxPoP(value),
            wind: getMaxWindSpeed(value),
            tempExtr: getTempExtremums(value),
        }
    }
    return groupedList;
}

export default function Main({ currentLocation, API_URL }) {

    const params = currentLocation && new URLSearchParams({
        lat: currentLocation[0]["lat"],
        lon: currentLocation[0]["lon"],
        appid: process.env.REACT_APP_API_KEY,
        units: 'metric',
    })

    const [currentWeather, isPendingCurrent, errorCurrent, fetchWeather] = useFetch(API_URL.weather, params);
    const [forecast, isPendingForecast, errorForecast, fetchForecast] = useFetch(API_URL.forecast, params);
    const [airPollut, isPendingAirPollut, errorAirPollut, fetchAirPollut] = useFetch(API_URL.airPollution, params);
    const [currentDate, setCurrentDate] = useState(formatDate(new Date(Date.now())));
    const [currentTime, setCurrentTime] = useState(formatTime(new Date(Date.now())));

    useEffect(() => {
        setInterval(() => {
            let dateTime = new Date(Date.now());
            setCurrentDate(formatDate(dateTime));
            setCurrentTime(formatTime(dateTime));
        }, 60000);
    }, []);

    const currentData = {
        date: currentDate,
        time: currentTime,
        temp: currentWeather && Math.round(currentWeather.main.temp),
        weather: currentWeather?.weather[0].description,
        weatherIcon: currentWeather && iconIdCreator(currentWeather.weather[0].description, currentWeather.weather[0].icon.slice(-1)),
        briefWeather: currentWeather?.weather[0].main,
        partOfDay: currentWeather && currentWeather.weather[0].icon.slice(-1),
        windDirWords: currentWeather && defineWindDirection(currentWeather?.wind.deg),
        sunrise: currentWeather && formatTime(new Date(currentWeather.sys.sunrise*1000)),
        sunset: currentWeather && formatTime(new Date(currentWeather.sys.sunset*1000)),
        details: currentWeather && createDataArr(currentWeather, airPollut?.list?.[0]),
    }

    const forecastData = forecast && forecast.list.map((elem) => {
        const date = new Date(elem.dt * 1000);
        return {
            date: elem && formatDate(date),
            time: elem && formatTime(date),
            temp: Math.round(elem.main.temp),
            weather: elem?.weather[0].description,
            weatherIcon: elem && iconIdCreator(elem?.weather?.[0].description, elem?.sys.pod),
            briefWeather: elem?.weather[0].main,
            partOfDay: elem && elem.sys.pod,
            windSpeed: elem && elem.wind.speed,
            windDirWords: elem && defineWindDirection(elem?.wind.deg),
            dayOfWeek: elem && formatDT(elem.dt),
            precipitationIcon: elem && definePrecip(elem.main.temp, elem.rain ? "rain" : elem.snow ? 'snow' : ''),
            details: elem && createDataArr(elem, airPollut?.list?.[0]),
        }
    });

    useEffect(() => {
        if (!currentData.briefWeather) return;
        setBgImage(currentData.briefWeather, currentData.partOfDay);
    }, [currentWeather]);

    const hourlyForecast = forecastData?.slice(0, 9);

    const dailyForecast = forecastData && addDetailsForDay(forecastData);

    return (
        <Router>
            <main className={styles.main}>
                <Container className={styles.container}>
                    <Routes>
                        <Route path="/" element={
                            <HomeBlock currentData={currentData} dailyForecast={dailyForecast} hourlyForecast={hourlyForecast} />
                        } />
                        <Route path="details" element={<ExtendedBlock data={currentData} />} />
                    </Routes>
                </Container>
            </main>
        </Router>
    )
}