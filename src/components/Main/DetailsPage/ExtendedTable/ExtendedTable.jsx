import styles from './ExtendedTable.module.scss';
import TableRow from '../../TableRow/TableRow';
import TemperatureBig from '../../TemperatureBig/TemperatureBig';
import WeatherIcon from '../../WeatherIcon/WeatherIcon';
import { useOutletContext } from 'react-router-dom';
import SunInfo from '../SunInfo/SunInfo';
import TableHeader from './TableHeader/TableHeader';

export default function ExtendedTable() {

    const { data } = useOutletContext();

    const headerPartLeft = <>
        <TemperatureBig data={data.temp} />
        <WeatherIcon data={data.weatherIcon} className={styles.weather} description={data.weather} />
    </>;

    const headerPartRigt = <>
        {Object.entries(data.sun).map(([key, value], id) => {
            return <SunInfo type={key} data={value} key={id} />
        })}</>

    const headerData = {
        datetime: [data.date, data.time],
        parts: [headerPartLeft, headerPartRigt]
    }

    return data && (
        <div className={styles.extended}>
            <TableHeader data={headerData} />
            <div className={styles.body}>
                <div className={styles.table}>
                    <div className={styles.subtable}>
                        {data?.details?.slice(0, 5).map((item, id) => {
                            return <TableRow key={id} data={item} className={styles.row} link={'#'} />
                        })}
                    </div>
                    <div className={styles.subtable}>
                        {data?.details?.slice(5).map((item, id) => {
                            return <TableRow key={id} data={item} className={styles.row} link={'#'} />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

