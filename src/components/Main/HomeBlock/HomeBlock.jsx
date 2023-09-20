
import ChartBlock from '../ChartBlock/ChartBlock';
import CurrentWeather from '../CurrentWeather/CurrentWeather';
import TableBlock from '../TableBlock/TableBlock';

export default function HomeBlock({ currentData, hourlyForecast, dailyForecast }) {
    return (
        <>
            <CurrentWeather data={currentData} />
            <ChartBlock data={hourlyForecast} />
            <TableBlock data={dailyForecast} />
        </>
    )
}

