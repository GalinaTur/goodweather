import styles from './DoughnutChart.module.scss';
import { Doughnut } from 'react-chartjs-2';

const setMinimalizedData = (data, limit) => {
    const minimalFragmentSize = 0.19;
    if (data > limit) return [data];
    if (data/limit > minimalFragmentSize) return [data, limit - data];
    return [minimalFragmentSize, 1 - minimalFragmentSize];
}

const setDataToDoughnut = (data) => {
    return {
        labels: [],
        datasets: [{
            data: setMinimalizedData(data.value, data.limit),
            backgroundColor: [
                data.color, 'rgba(70, 70, 70, 0.4)'
            ],
            rotation: 180,
        }],
    };
}

const setOptionsToDoughnut = (data) => {
    return {
        cutout: '70%',
        legend: {
            display: false,
        },
        plugins: {
            tooltip: {
                enabled: false,
            }
        }
    }
}

export default function DoughnutChart({ data }) {

    return data && (
        <div className={styles.doughnut}>
            <Doughnut data={setDataToDoughnut(data)}
                options={setOptionsToDoughnut(data)}
            />
            <p className={styles.percents}>{data.percents || data.value}</p>
        </div>
    )
}