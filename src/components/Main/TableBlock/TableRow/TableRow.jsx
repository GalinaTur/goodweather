import styles from './TableRow.module.scss';
import icons from '../../../../assets/sprite.svg';


const getByMaxValue = (obj) => {
    let maxKey = '';
    let maxValue = 0;
    for (const [key, value] of Object.entries(obj)) {
        if (value > maxValue) {
            maxValue = value;
            maxKey = key;
        }
    }
    return maxKey;
}

const getMaxPoP = (list) => {
    let precipType, tempWhilePrecip;
    let precipitation = list.reduce((maxPoP, elem) => {
        if (maxPoP < elem.pop * 100) {
            maxPoP = Math.round(elem.pop * 100);
            precipType = elem.rain ? "rain" : elem.snow ? 'snow' : '';
            tempWhilePrecip = elem.main.temp;
        }
        return maxPoP;
    }, 0);
    return [precipType, tempWhilePrecip, precipitation];
}

const getMaxWindSpeed = (list) => {
    let windDeg = 0;
    let maxWindSpeed = list.reduce((maxWind, elem) => {
        if (elem.wind.speed > maxWind) {
            maxWind = Math.round(elem.wind.speed);
            windDeg = elem.wind.deg;
        }
        return maxWind;
    }, 0);
    return [maxWindSpeed, windDeg];
}

export default function TableRow({ day, iconIdCreator, formatDT, definePrecip }) {
    console.log(day);
    const [dayOfWeek, date] = day ? formatDT(day[0].dt) : '';

    const temps = [...day.map((e) => Math.round(e.main.temp))];
    const weathers = [...day.map((e) => e.weather[0].description)].reduce((acc, weath) => {
        acc[weath] ? acc[weath] = acc[weath] + 1 : acc[weath] = 1;
        return acc;
    }, {});

    const dailyWeather = getByMaxValue(weathers);
    const [presipType, tempWhilePrecip, maxPoP] = getMaxPoP(day);
    const [windSpeed, windDeg] = getMaxWindSpeed(day);

    return (

        <tr className={styles.row}>
            <td className={styles.day}>{dayOfWeek}</td>
            <td className={styles.date}>{date}</td>
            <td className={styles.image}>
                <svg width='50' height='50' viewBox="0 0 100 100" role="img" aria-roledescription="">
                    <use href={`${icons}#${iconIdCreator(dailyWeather, 'd')}`} />
                </svg>
            </td>
            <td className={styles.weather}>{dailyWeather}</td>
            <td className={styles.precipitation}>{`${definePrecip(tempWhilePrecip, presipType)} ${maxPoP}%`}</td>
            <td className={styles.wind}>
                <p className={styles.wind_speed}>{`${windSpeed} km/h`}</p>
                <p className={styles.wind_deg}>
                <svg width='20' height='20' viewBox="0 0 100 100" role="img" aria-roledescription="" style={{ transform: `rotate(${windDeg}deg)` }}>
                    <use href={`${icons}#wind_dir`} />
                </svg>
                </p>
                </td>
            <td className={styles.temperature}>{`${Math.min(...temps)}° / ${Math.max(...temps)}°`}</td>
        </tr>
    )
}

