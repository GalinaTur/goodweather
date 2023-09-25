import styles from './ExtendedTable.module.scss';
import icons from '../../../../assets/sprite.svg';
import TableRow from '../../TableBlock/TableRow/TableRow';
import TemperatureBig from '../../TemperatureBig/TemperatureBig';
import WeatherIcon from '../../WeatherIcon/WeatherIcon';
import { useOutletContext } from 'react-router-dom';

export default function ExtendedTable() {

    const {data} = useOutletContext();

    return data && (
        <>
            <div className={styles.extended}>
                <div className={styles.datetime}><p>{data.date}</p><p>{data.time}</p></div>
                <div className={styles.header}>
                    <div className={styles.part}>
                        <TemperatureBig data={data.temp} />
                        <div className={styles.weather}>
                        <WeatherIcon data={data.weatherIcon} className={styles.icon}/>
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
                    <div className={styles.table}>
                        <div className={styles.subtable}>
                            {data?.details?.slice(0, 5).map((item, id) => {
                                return <TableRow key={id} data={item} className={styles.row} link={'#'}/>
                            })}
                        </div>
                        <div className={styles.subtable}>
                            {data?.details?.slice(5).map((item, id) => {
                                return <TableRow key={id} data={item} className={styles.row} link={'#'}/>
                            })}
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}

