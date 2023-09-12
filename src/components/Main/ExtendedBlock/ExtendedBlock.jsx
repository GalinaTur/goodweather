import styles from './ExtendedBlock.module.scss';
import icons from '../../../assets/sprite.svg';
import ChartBlock from '../ChartBlock/ChartBlock';
import { Routes, Route, NavLink, Link } from 'react-router-dom';
import ExtendedTable from './ExtendedTable/ExtendedTable';

export default function ExtendedBlock({ data, hourlyForecast, dailyForecast }) {

    return data && (
        <>
            <Link to='/' className={styles.back}>
                <svg width='30' height='30' viewBox="0 0 100 100" role="img" aria-label="back to main page">
                    <use href={`${icons}#back`} />
                </svg>
            </Link>
            
            <Routes>
                {hourlyForecast && hourlyForecast.map((hour, id) => {
                    return <Route path={`${hour.isToday? '/today/' : ''}${hour.time.replace(':', '')}`} element={<ExtendedTable data={hour} />} key={id} />
                })}

                <Route path='today' element={<ExtendedTable data={data} />} />
                <Route path='' element={<ExtendedTable data={data} />} />

            </Routes>
            <ChartBlock data={hourlyForecast} />

            <nav className={styles.navigation}>
                <NavLink to='/details/today' className={({ isActive }) => isActive ? styles.active : styles.navlink}>Today</NavLink>
                {dailyForecast && Object.values(dailyForecast).map((value, id) => {
                    if (value.length < 8 && id === 0) return;
                    return <NavLink to={`/details/${value[0].weekday[0].toLowerCase()}`} key={id} className={({ isActive }) => isActive ? styles.active : styles.navlink}>{value[0].date.slice(0, 3)}</NavLink>
                })}
            </nav>
        </>
    )
}

