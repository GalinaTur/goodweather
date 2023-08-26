import ChartBlock from '../ChartBlock/ChartBlock';
import CurrentWeather from '../CurrentWeather/CurrentWeather';
import styles from './HomeBlock.module.scss';
import TableBlock from '../TableBlock/TableBlock';
import { Link } from 'react-router-dom';

export default function HomeBlock({ currentData, hourlyForecast, dailyForecast }) {
    return (
        <>
            <Link to='/details'>
                <CurrentWeather data={currentData} />
            </Link>
            <ChartBlock data={hourlyForecast} />
            <TableBlock data={dailyForecast} />
        </>
    )
}

