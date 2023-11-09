import styles from './DetailsPage.module.scss';
import { useOutletContext, useParams, Outlet } from 'react-router-dom';
import LineChart from '../../charts/LineChart/LineChart';
import TemperatureBig from '../TemperatureBig/TemperatureBig';
import WeatherIcon from '../WeatherIcon/WeatherIcon';
import SunInfo from '../DetailsPage/SunInfo/SunInfo';
import NavDays from '../NavDays/NavDays';

export default function DetailsPage() {

    const { currentData, hourlyForecast, dailyForecast } = useOutletContext();

    const { cityId, day, time } = useParams();

    const defineOutletContext = (day, time) => {
        if (!day && !time) return currentData;
        if (day && !time) return dailyForecast[day][3];
        if (time) return Object.values(dailyForecast[day || currentData.date.slice(0, 3)]).find((e) => e.time.slice(0, 2) === time.slice(0, 2));
    }

    const formatTableData = (data) => {
        const headerPartLeft = <>
            <TemperatureBig data={data.temp} />
            <WeatherIcon data={data.weatherIcon} className={styles.weather} description={data.weather} />
        </>;

        const headerPartRigt = <>
            {Object.entries(data.sun).map(([key, value], id) => {
                return <SunInfo type={key} data={value} key={id} />
            })}</>

        const formatedData = {
            headerData: {
                datetime: [data.date, data.time],
                parts: [headerPartLeft, headerPartRigt],
            },
            details: data.details,
        }

        return formatedData;
    }

    const ctx = {
        data: formatTableData(defineOutletContext(day, time)),
    }

    return currentData && (
        <>
            <NavDays data={dailyForecast} />
            <Outlet context={ctx} />
            <LineChart data={day ? dailyForecast[day] : hourlyForecast} />
        </>
    )
}

