import { useOutletContext } from 'react-router-dom';
import LineChart from '../../charts/LineChart/LineChart';
import CurrentWeather from '../CurrentWeather/CurrentWeather';
import DailyTable from '../DailyTable/DailyTable';

export default function HomePage() {

    const {currentData, hourlyForecast, dailyForecast} = useOutletContext();

    return (
        <>
            <CurrentWeather data={currentData} />
            <LineChart data={hourlyForecast} />
            <DailyTable data={dailyForecast} />
        </>
    )
}

