import { useEffect, useState } from 'react';
import { useFetch } from '../../useFetch';
import { Outlet, useNavigate } from 'react-router-dom';
import Container from '../Container/Container';
import styles from './Main.module.scss';
import {units, airComponentsRanges} from '../../utils/store.js';
import icons from '../../assets/sprite.svg';
import WeatherIcon from './WeatherIcon/WeatherIcon';

const formatDateFullDate = (date, offset) => {
    const options = {
        timeZone: 'UTC',
        weekday: 'short',
        day: '2-digit',
        month: "short",
        year: 'numeric',
    }
    const oldDate = new Date(date.getTime() + offset * 1000);
    const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(oldDate).toLowerCase();
    return formattedDate;
}

const formatTime = (time, offset) => {
    const options = {
        timeZone: 'UTC',
        hour: '2-digit',
        minute: '2-digit',
    }
    const oldTime = new Date(time.getTime() + offset * 1000);
    const formattedTime = new Intl.DateTimeFormat("en-GB", options).format(oldTime);
    return formattedTime;
}

const formatDateFullWeekdayShortDate = (dt, offset) => {
    const optionsWeekday = {
        timeZone: 'UTC',
        weekday: 'long',
    }
    const optionsDay = {
        timeZone: 'UTC',
        day: '2-digit',
        month: "2-digit",
    }
    const date = new Date((dt + offset) * 1000);
    const weekday = new Intl.DateTimeFormat("en-GB", optionsWeekday).format(date).toLocaleLowerCase();
    const day = new Intl.DateTimeFormat("en-GB", optionsDay).format(date);
    return [weekday, day];
}

const createIconId = (weatherDescription, timeOfDay) => {
    let iconID = `${weatherDescription.replaceAll(' ', '_')}_${timeOfDay}`;
    return iconID;
}

const definePrecipitationType = (temp, type) => {
    if (!type) {
        return temp < 0 ? '❄' : '💧';
    } else if (type === 'rain') {
        return '💧';
    } else if (type === 'snow') {
        return '❄';
    }
}

const defineWindDirection = (deg) => {
    if (deg < 22.5 || deg > 337.5) {
        return 'North';
    } else if (deg < 67.5) {
        return 'North-East';
    } else if (deg < 112.5) {
        return 'East';
    } else if (deg < 157.5) {
        return 'South-East';
    } else if (deg < 202.5) {
        return 'South';
    } else if (deg < 247.5) {
        return 'South-West';
    } else if (deg < 292.5) {
        return 'West';
    } else if (deg < 337.5) {
        return 'North-West';
    }
}

const setBgImage = (weather, partOfDay) => {
    let bgImage;
    if (weather === 'Clear' && partOfDay === 'd') {
        bgImage = require('../../assets/img/clear_d.jpg');
    } else if (weather === 'Clear' && partOfDay === 'n') {
        bgImage = require('../../assets/img/clear_n.jpg');
    } else if (weather === 'Clouds' && partOfDay === 'd') {
        bgImage = require('../../assets/img/clouds_d.jpg');
    } else if (weather === 'Clouds' && partOfDay === 'n') {
        bgImage = require('../../assets/img/clouds_n.jpg');
    } else if (weather === 'Rain' || weather === 'Drizzle') {
        bgImage = require('../../assets/img/rain.jpg');
    } else if (weather === 'Snow' && partOfDay === 'd') {
        bgImage = require('../../assets/img/snow_d.jpg');
    } else if (weather === 'Snow' && partOfDay === 'n') {
        bgImage = require('../../assets/img/snow_n.jpg');
    } else if (weather === 'Thunderstorm') {
        bgImage = require('../../assets/img/thunder.jpg');
    } else if (weather === 'Tornado') {
        bgImage = require('../../assets/img/tornado.jpg');
    } else {
        bgImage = require('../../assets/img/mist.jpg');
    }

    document.body.style.backgroundImage = `url(${bgImage})`;
}

const convertPressureValue = (value) => {
    return Math.round(value * 0.75006157584566);
}

const createDataArr = (data, aqi) => {
    const dataArr = [
        {
            icon: 'feelsLike',
            key: 'Feels like',
            value: Math.round(data.main.feels_like) + '\u00a0' + units.temp.metric,
        },
        {
            icon: 'pressure',
            key: 'Pressure',
            value: convertPressureValue(data.main.pressure) + '\u00a0' + units.pressure.en,
        },
        {
            icon: 'cloudiness',
            key: 'Cloudiness',
            value: data.clouds.all + '\u00a0' + units.cloudiness,
        },
        {
            icon: 'visibility',
            key: 'Visibility',
            value: Math.round(data.visibility / 100) / 10 + '\u00a0' + units.visibility.en,
        },
        {
            icon: 'humidity',
            key: 'Humidity',
            value: data.main.humidity + '\u00a0' + units.humidity,
        },
        {
            icon: 'gust',
            key: 'Gust',
            value: data.wind.gust ? Math.round(data.wind.gust) + '\u00a0' + units.gust.metric.en : '—',
        },
        {
            icon: 'chance',
            key: `Chance of ${data.rain ? 'rain' : data.snow ? 'snow' : 'precipitation'}`,
            value: (Math.round(data.pop * 100) || 0) + '\u00a0' + units.pop,
        },
        {
            icon: 'wind',
            key: 'Wind',
            value: <p>
                <svg width='20' height='20' viewBox="0 0 100 100" role="img" aria-roledescription="Wind direction" style={{ transform: `rotate(${data.wind.deg}deg)` }} className={styles.wind}>
                    <use href={`${icons}#wind_dir`} />
                </svg>
                {' ' + Math.round(data.wind.speed) + '\u00a0' + units.speed.metric.en}
            </p>,
        },
        {
            icon: 'volume',
            key: 'Precipitation volume',
            value: data.rain ? (data.rain?.['1h'] || data.rain?.['3h']) + '\u00a0' + units.precipitation.en :
                data.snow ? (data.snow?.['1h'] || data.snow?.['3h']) + '\u00a0' + units.precipitation.en : '—',
        },
        {
            icon: 'aqi',
            key: 'AQI',
            value: aqi && `${aqi.main.aqi} (${airComponentsRanges.qualitativeNames[aqi.main.aqi - 1]})`,
        },
    ]
    return dataArr;
}

const getMaxPoP = (list) => {
    let precipitation = list.reduce((maxPoP, elem) => {
        const PoPValue = parseInt(elem.details[6].value);
        if (!maxPoP || maxPoP[0] < PoPValue) {
            maxPoP = [PoPValue, elem.precipitationIcon];
        }
        return maxPoP;
    }, 0);
    return `${precipitation[1]} ${Math.round(precipitation[0])} %`;
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
    let temps = [...list.map((e) => {
        return Math.round(e.temp);
    })];
    return `${Math.min(...temps)}° / ${Math.max(...temps)}°`;
}

const defineCommonWeatherPerDay = (data) => {
    const weathersCount = [...data.map(e => e.weather)].reduce((acc, weath) => {
        acc[weath] ? acc[weath] = acc[weath] + 1 : acc[weath] = 1;
        return acc;
    }, {});

    let commonWeather = [0, ''];

    for (const [key, value] of Object.entries(weathersCount)) {
        if (value > commonWeather[0]) commonWeather = [value, key];
    }
    return commonWeather[1];
}

const groupForecastByDay = (forecast) => {
    const list = forecast.reduce((newList, elem, id, arr) => {
        const key = elem.date.slice(0, 3);
        if (!newList[key]) newList[key] = [];
        newList[key].push(elem);
        if (newList[key].length === 8 && arr[id + 1]) {
            arr[id + 4] && newList[key].push(arr[id + 1]);
        } else if (newList[key].length < 4 && !arr[id + 1]) {
            delete newList[key];
        }
        return newList;
    }, {});
    return list;
}

const addDetailsForDay = (list) => {
    const groupedList = groupForecastByDay(list);
    for (let [key, value] of Object.entries(groupedList)) {
        groupedList[key].detailsForTable = {
            weekday: value[0].weekday[0],
            date: value[0].weekday[1],
            weatherIcon: <WeatherIcon data={createIconId(defineCommonWeatherPerDay(value), 'd')} 
                description = {defineCommonWeatherPerDay(value)} className={styles.weather}/>,
            popr: getMaxPoP(value),
            wind: getMaxWindSpeed(value),
            tempExtr: getTempExtremums(value),
        }
    }
    return groupedList;
}

export default function Main({ currentLocation, API_URL, handleError, handlePending }) {

    const navigate = useNavigate();

    const params = currentLocation && new URLSearchParams({
        lat: currentLocation[0]["lat"],
        lon: currentLocation[0]["lon"],
        appid: process.env.REACT_APP_API_KEY,
        units: 'metric',
    })

    const [currentWeather, fetchWeather] = useFetch(handleError, handlePending, API_URL.weather, params);
    const [forecast, fetchForecast] = useFetch(handleError, handlePending, API_URL.forecast, params);
    const [airPollut, fetchAirPollut] = useFetch(handleError, handlePending, API_URL.airPollution, params);
    const [cityId, setCityId] = useState(null);

    useEffect(() => {
        if (!currentWeather) return;
        setCityId(currentWeather.id);
    }, [currentWeather]);

    useEffect(() => {
        if (!cityId) return;
        navigate(`/${cityId}/main`);
    }, [cityId]);

    const currentData = currentWeather && {
        date: formatDateFullDate(new Date(Date.now()), currentWeather.timezone),
        timezone: currentWeather.timezone * 1000,
        time: formatTime(new Date(Date.now()), currentWeather.timezone),
        cityID: currentWeather.id,
        isToday: true,
        temp: Math.round(currentWeather.main.temp),
        weather: currentWeather.weather[0].description,
        weatherIcon: createIconId(currentWeather.weather[0].description, currentWeather.weather[0].icon.slice(-1)),
        briefWeather: currentWeather.weather[0].main,
        partOfDay: currentWeather.weather[0].icon.slice(-1),
        windDirWords: defineWindDirection(currentWeather?.wind.deg),
        sun: {
            sunrise: formatTime(new Date(currentWeather.sys.sunrise * 1000), currentWeather.timezone),
            sunset: formatTime(new Date(currentWeather.sys.sunset * 1000), currentWeather.timezone)
        },
        details: createDataArr(currentWeather, airPollut?.list?.[0]),
    }

    const forecastData = forecast && forecast.list.map((elem) => {
        const date = new Date(elem.dt * 1000);
        return {
            date: formatDateFullDate(date, forecast.city.timezone),
            timezone: forecast.city.timezone * 1000,
            time: formatTime(date, forecast.city.timezone),
            cityID: forecast.city.id,
            isToday: formatDateFullDate(date, forecast.city.timezone) === currentData.date,
            temp: Math.round(elem.main.temp),
            weather: elem.weather[0].description,
            weatherIcon: createIconId(elem?.weather?.[0].description, elem?.sys.pod),
            briefWeather: elem.weather[0].main,
            partOfDay: elem.sys.pod,
            windSpeed: elem.wind.speed,
            windDirWords: defineWindDirection(elem?.wind.deg),
            weekday: formatDateFullWeekdayShortDate(elem.dt, forecast.city.timezone),
            precipitationIcon: definePrecipitationType(elem.main.temp, elem.rain ? "rain" : elem.snow ? 'snow' : ''),
            sun: {
                sunrise: formatTime(new Date(forecast.city.sunrise * 1000), forecast.city.timezone),
                sunset: formatTime(new Date(forecast.city.sunset * 1000), forecast.city.timezone),
            },
            details: createDataArr(elem, airPollut?.list?.[0]),
        }
    });


    useEffect(() => {
        if (!currentData) return;
        setBgImage(currentData.briefWeather, currentData.partOfDay);
    }, [currentWeather]);

    const hourlyForecast = forecastData?.slice(0, 9);

    const dailyForecast = forecastData && addDetailsForDay(forecastData);

    const ctx = {
        currentData: currentData,
        hourlyForecast: hourlyForecast,
        dailyForecast: dailyForecast,
        airPollut: airPollut,
    }

    return dailyForecast && (
        <main className={styles.main}>
            <Container className={styles.container}>
                <Outlet context={ctx} />
            </Container>
        </main>
    )
}