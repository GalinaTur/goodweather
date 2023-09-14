import { useEffect } from 'react';
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

const formatDateFullDate = (date, offset) => {
    const options = {
        timeZone: 'UTC',
        weekday: 'short',
        day: '2-digit',
        month: "short",
        year: 'numeric',
    }
    const oldDate = new Date(date.getTime() + offset * 1000);
    const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(oldDate);
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
    const weekday = new Intl.DateTimeFormat("en-GB", optionsWeekday).format(date);
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
    let bgUrl;
    if (weather === 'Clear' && partOfDay === 'd') {
        bgUrl = `url(${bgClearD})`;
    } else if (weather === 'Clear' && partOfDay === 'n') {
        bgUrl = `url(${bgClearN})`;
    } else if (weather === 'Clouds' && partOfDay === 'd') {
        bgUrl = `url(${bgCloudsD})`;
    } else if (weather === 'Clouds' && partOfDay === 'n') {
        bgUrl = `url(${bgCloudsN})`;
    } else if (weather === 'Rain' || weather === 'Drizzle') {
        bgUrl = `url(${bgRain})`;
    } else if (weather === 'Snow' && partOfDay === 'd') {
        bgUrl = `url(${bgSnowD})`;
    } else if (weather === 'Snow' && partOfDay === 'n') {
        bgUrl = `url(${bgSnowN})`;
    } else if (weather === 'Thunderstorm') {
        bgUrl = `url(${bgThunder})`;
    } else if (weather === 'Tornado') {
        bgUrl = `url(${bgTornado})`;
    } else {
        bgUrl = `url(${bgMist})`;
    }

    document.body.style.backgroundImage = bgUrl;
}

const defineAqiDescription = (aqi) => {
    let aqiDescription;
    switch (aqi) {
        case 1: aqiDescription = 'Good';
            break;
        case 2: aqiDescription = 'Fair';
            break;
        case 3: aqiDescription = 'Moderate';
            break;
        case 4: aqiDescription = 'Poor';
            break;
        case 5: aqiDescription = 'Very Poor';
            break;
    }
    return aqiDescription;
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
            icon: 'humidity',
            key: 'Humidity',
            value: data.main.humidity + '\u00a0' + units.humidity,
        },
        {
            icon: 'cloudiness',
            key: 'Cloudiness',
            value: data.clouds.all + '\u00a0' + units.cloudiness,
        },
        {
            icon: 'visibility',
            key: 'Visibility',
            value: data.visibility / 1000 + '\u00a0' + units.visibility.en,
        },
        {
            icon: 'wind',
            key: 'Wind',
            value: <p>
                <svg width='20' height='20' viewBox="0 0 100 100" role="img" aria-roledescription="Wind direction" style={{ transform: `rotate(${data.wind.deg}deg)` }}  className={styles.wind}>
                    <use href={`${icons}#wind_dir`} />
                </svg>
                {' ' + Math.round(data.wind.speed) + '\u00a0' + units.speed.metric.en}
            </p>,
        },
        {
            icon: 'gust',
            key: 'Gust',
            value: data.wind.gust ? Math.round(data.wind.gust) + '\u00a0' + units.gust.metric.en : '—',
        },
        {
            icon: 'chance',
            key: `Chance of ${data.rain ? 'rain' : data.snow ? 'snow' : 'precipitation'}`,
            value: (Math.round(data.pop) * 100 || 0) + '\u00a0' + units.pop,
        },
        {
            icon: 'volume',
            key: 'Precipitation volume',
            value: data.rain ? (data.rain?.['1h'] || data.rain?.['3h']) + '\u00a0' + units.precipitation.en :
                data.snow ? (data.snow?.['1h'] || data.snow?.['3h']) + '\u00a0' + units.precipitation.en : '—',
        },
        {
            icon: 'aqi',
            key: 'Air quality index',
            value: aqi && `${aqi.main.aqi} (${defineAqiDescription(aqi.main.aqi)})`,
        },
    ]
    return dataArr;
}

const getMaxPoP = (list) => {
    let precipitation = list.reduce((maxPoP, elem) => {
        const PoPValue = parseInt(elem.details[7].value);
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
        const key = elem.date;
        if (!newList[key]) newList[key] = [];
        newList[key].push(elem);
        if (newList[key].length === 8 && arr[id + 1]) {
            newList[key].push(arr[id + 1]);
        } else if (newList[key].length < 9 && !arr[id + 1]) {
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
            weatherIcon: <svg width='50' height='50' viewBox="0 0 100 100" role="img" aria-roledescription="">
                <use href={`${icons}#${createIconId(defineCommonWeatherPerDay(value), 'd')}`} />
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

    const currentData = currentWeather && {
        date: formatDateFullDate(new Date(Date.now()), currentWeather.timezone),
        time: formatTime(new Date(Date.now()), currentWeather.timezone),
        isToday: true,
        timezone: currentWeather.timezone * 1000,
        temp: Math.round(currentWeather.main.temp),
        weather: currentWeather.weather[0].description,
        weatherIcon: createIconId(currentWeather.weather[0].description, currentWeather.weather[0].icon.slice(-1)),
        briefWeather: currentWeather.weather[0].main,
        partOfDay: currentWeather.weather[0].icon.slice(-1),
        windDirWords: defineWindDirection(currentWeather?.wind.deg),
        sunrise: formatTime(new Date(currentWeather.sys.sunrise * 1000), currentWeather.timezone),
        sunset: formatTime(new Date(currentWeather.sys.sunset * 1000), currentWeather.timezone),
        details: createDataArr(currentWeather, airPollut?.list?.[0]),
    }

    const forecastData = forecast && forecast.list.map((elem) => {
        const date = new Date(elem.dt * 1000);
        return {
            date: elem && formatDateFullDate(date, forecast.city.timezone),
            timezone: elem && forecast.city.timezone * 1000,
            time: elem && formatTime(date, forecast.city.timezone),
            isToday: formatDateFullDate(date, forecast.city.timezone) === currentData.date,
            temp: Math.round(elem.main.temp),
            weather: elem?.weather[0].description,
            weatherIcon: elem && createIconId(elem?.weather?.[0].description, elem?.sys.pod),
            briefWeather: elem?.weather[0].main,
            partOfDay: elem && elem.sys.pod,
            windSpeed: elem && elem.wind.speed,
            windDirWords: elem && defineWindDirection(elem?.wind.deg),
            weekday: elem && formatDateFullWeekdayShortDate(elem.dt, forecast.city.timezone),
            precipitationIcon: elem && definePrecipitationType(elem.main.temp, elem.rain ? "rain" : elem.snow ? 'snow' : ''),
            sunrise: elem && formatTime(new Date(forecast.city.sunrise * 1000), forecast.city.timezone),
            sunset: elem && formatTime(new Date(forecast.city.sunset * 1000), forecast.city.timezone),
            details: elem && createDataArr(elem, airPollut?.list?.[0]),
        }
    });

    useEffect(() => {
        if (!currentData) return;
        setBgImage(currentData.briefWeather, currentData.partOfDay);
    }, [currentWeather]);

    const hourlyForecast = forecastData?.slice(0, 9);

    const dailyForecast = forecastData && addDetailsForDay(forecastData);

    return currentWeather && (
        <Router>
            <main className={styles.main}>
                <Container className={styles.container}>
                    <Routes>
                        <Route path="/" element={
                            <HomeBlock currentData={currentData} hourlyForecast={hourlyForecast} dailyForecast={dailyForecast} />
                        } />
                        <Route path="/details/*" element={<ExtendedBlock data={currentData} hourlyForecast={hourlyForecast} dailyForecast={dailyForecast} />} />
                        {forecast && Object.values(dailyForecast).map((elem, id) => {
                            return <Route path={`/details/${elem[0].weekday[0].toLowerCase()}/*`} element={<ExtendedBlock data={elem[4]} hourlyForecast={elem} dailyForecast={dailyForecast} />} key={id} />
                        })}
                    </Routes>
                </Container>
            </main>
        </Router>
    )
}