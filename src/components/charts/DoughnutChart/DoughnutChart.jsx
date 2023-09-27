import styles from './DoughnutChart.module.scss';
import { Doughnut } from 'react-chartjs-2';

const setMinimalizedData = (value, limit) => {
    const minimalFragmentSize = 0.19;
    if (value > limit) return [value];
    if(value/limit > minimalFragmentSize) return [value, limit - value];
    return [minimalFragmentSize, 1 - minimalFragmentSize];
}

const setDataToDoughnut = (value, limit, color) => {
    return {
        labels: [],
        datasets: [{
            data: setMinimalizedData(value, limit),
            backgroundColor: [
                color, 'rgba(70, 70, 70, 0.4)'
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

export default function DoughnutChart({ value, limit, color }) {

    return value && (
        <div className={styles.doughnut}>
            <Doughnut data={setDataToDoughnut(value, limit, color)}
                options={setOptionsToDoughnut(value)}
            />
            <p className={styles.percents}>{value}</p>
        </div>
    )
}