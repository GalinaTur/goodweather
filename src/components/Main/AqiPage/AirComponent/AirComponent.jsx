import styles from './AirComponent.module.scss';

export default function AirComponent({ data }) {

    return data && (
        <div className={styles.airComponent}>
            {data.chart}
            <div className={styles.description}>
                <p className={styles.full}><span>{data.full}</span><span>({data.key})</span></p>
                <p className={styles.message}>{data.message}</p>
                {data.units && <p className={styles.value}>{data.value} {data.units}</p>}
            </div>
        </div>
    )
}

