import ChartBlock from '../ChartBlock/ChartBlock';
import CurrentWeather from '../CurrentWeather/CurrentWeather';
import styles from './HomeBlock.module.scss';
import TableBlock from '../TableBlock/TableBlock';

export default function HomeBlock({ currentData, hourlyForecast, dailyForecast }) {
    return (
        <>
            <CurrentWeather data={currentData} />
            <ChartBlock data={hourlyForecast} datalabel={true} weatherKey='temp' />
            <TableBlock data={dailyForecast} />
        </>
    )
}

