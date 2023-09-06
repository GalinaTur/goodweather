import styles from './ExtendedBlock.module.scss';
import icons from '../../../assets/sprite.svg';
import TableRow from '../TableBlock/TableRow/TableRow';
import ChartBlock from '../ChartBlock/ChartBlock';
import { HashRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { useState } from 'react';

export default function ExtendedBlock({ data, hourlyForecast, dailyForecast }) {

    const [keyForChart, setKeyForChart] = useState('temp')

    return data && (
        <>
        <nav className={styles.navigation}>
        <NavLink tp='/' className={styles.navlink}>Today</NavLink>
        {dailyForecast && Object.values(dailyForecast).map((value, id)=> {
            if(value[0].date.slice(0,3) === data.date.slice(0,3)) return;
                    return <NavLink to={`/details/${value[0].date.slice(0,3).toLowerCase()}`} key={id} className={styles.navlink}>{value[0].date.slice(0,3)}</NavLink>
                    })}
        </nav>
            <div className={styles.extended}>
                <div className={styles.header}>
                    <div className={styles.part}>
                        <p className={styles.temperature}><span>{data.temp}</span> °C</p>
                        <div className={styles.weather}>
                            <svg width='70' height='70' viewBox="0 0 100 100" role="img" aria-label={`Current weather: ${data.weather}`}>
                                <use href={`${icons}#${data.weatherIcon}`} />
                            </svg>
                            <p className={styles.weather_text}>{data.weather}</p>
                        </div>
                    </div>

                    <div className={styles.part}>
                        <p className={styles.sun}>
                            <svg width='50' height='50' viewBox="0 0 100 100" role="img" aria-label="sunrise">
                                <use href={`${icons}#sunrise`} />
                            </svg>
                            {data.sunrise}
                        </p>
                        <p className={styles.sun}>
                            <svg width='50' height='50' viewBox="0 0 100 100" role="img" aria-label="sunset">
                                <use href={`${icons}#sunset`} />
                            </svg>
                            {data.sunset}
                        </p>
                    </div>
                </div>
                <div className={styles.body}>
                    <table className={styles.table}>
                        <tbody>
                            {data?.details?.slice(0, 5).map((item, id) => {
                                return <TableRow key={id} data={item} />
                            })}
                        </tbody>
                        <tbody>
                            {data?.details?.slice(5).map((item, id) => {
                                return <TableRow key={id} data={item} />
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <ChartBlock data={hourlyForecast} datalabel={false} weatherKey={keyForChart}/>
        </>
    )
}

