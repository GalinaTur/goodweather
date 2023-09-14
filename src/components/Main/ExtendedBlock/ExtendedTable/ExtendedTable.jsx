import styles from './ExtendedTable.module.scss';
import icons from '../../../../assets/sprite.svg';
import TableRow from '../../TableBlock/TableRow/TableRow';

export default function ExtendedTable({ data }) {

    return data && (
        <>
            <div className={styles.extended}>
                <div className={styles.datetime}><p>{data.date}</p><p>{data.time}</p></div>
                <div className={styles.header}>
                    <div className={styles.part}>
                        <p className={styles.temperature}><span>{data.temp}</span> °C</p>
                        <div className={styles.weather}>
                            <svg width='70' height='70' viewBox="0 0 100 100" role="img" aria-label={`Current weather: ${data.weather}`}>
                                <use href={`${icons}#${data.weatherIcon}`} />
                            </svg>
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
                    <table className={styles.table}>
                        <tbody>
                            {data?.details?.slice(0, 5).map((item, id) => {
                                return <TableRow key={id} data={item} className={styles.row}/>
                            })}
                        </tbody>
                        <tbody>
                            {data?.details?.slice(5).map((item, id) => {
                                return <TableRow key={id} data={item} className={styles.row}/>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

