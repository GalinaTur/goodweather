import { useOutletContext } from 'react-router-dom';
import ChartBlock from '../ChartBlock/ChartBlock';
import CurrentWeather from '../CurrentWeather/CurrentWeather';
import TableBlock from '../TableBlock/TableBlock';

export default function HomeBlock() {

    const {currentData, hourlyForecast, dailyForecast} = useOutletContext();

    return (
        <>
            <CurrentWeather data={currentData} />
            <ChartBlock data={hourlyForecast} />
            <TableBlock data={dailyForecast} />
        </>
    )
}

