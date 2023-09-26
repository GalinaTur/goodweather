import styles from './DetailsPage.module.scss';
import icons from '../../../assets/sprite.svg';
import LineChart from '../../charts/LineChart/LineChart';
import { NavLink, Link, useOutletContext, useParams, Outlet } from 'react-router-dom';

export default function DetailsPage() {

    const { currentData, hourlyForecast, dailyForecast } = useOutletContext();

    const { cityId, day, time } = useParams();

const defineOutletContext = (day, time)=> {
if (!day && !time) return currentData; 
if (day && !time) return dailyForecast[day][4];
if (time) return Object.values(dailyForecast[day || currentData.date.slice(0,3)]).find((e) => e.time.slice(0, 2) === time.slice(0, 2));
}

    const ctx = {
        data: defineOutletContext(day, time),
    }

    return currentData && (
        <>
            <nav className={styles.navigation}>
                <Link to={`../main`} className={styles.back}>
                    <svg width='30' height='30' viewBox="0 0 100 100" role="img" aria-label="back to main page">
                        <use href={`${icons}#back`} />
                    </svg>
                </Link>
                <NavLink to={`today`} className={({ isActive }) => isActive ? styles.active : styles.navlink}>Today</NavLink>
                {dailyForecast && Object.entries(dailyForecast).map(([key, value], id) => {
                    if (value.length < 8 && id === 0) return;
                    return <NavLink to={`${key}`} key={id} className={({ isActive }) => isActive ? styles.active : styles.navlink}>{key}</NavLink>
                })}
            </nav>
            <Outlet context={ctx} />
            <LineChart data={day ? dailyForecast[day] : hourlyForecast} />
        </>
    )
}

