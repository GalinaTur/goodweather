import styles from './DoughnutChart.module.scss';
import { Doughnut } from 'react-chartjs-2';
import classNames from 'classnames';

const setMinimalizedData = (value, limit) => {
    const minimalFragmentSize = 19;
    if (value > limit) return [value];
    if (value < minimalFragmentSize) return [minimalFragmentSize, 100 - minimalFragmentSize];
    return [value, limit - value];
}

const setDataToDoughnut = (value, limit, color) => {
    console.log(value, limit, setMinimalizedData(value, limit))
    return {
        labels: [],
        datasets: [{
            data: setMinimalizedData(value, limit),
            backgroundColor: [
                color, 'rgba(0, 0, 0, 0.2)'
            ],
            rotation: 180,
        }],
    };
}

const setOptionsToDoughnut = (data) => {
    return {
        borderRadius: 1,
        cutout: '75%',
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

export default function DoughnutChart({ value, limit, color, className }) {

    return (
        <div className={classNames(styles.doughnut, className)}>
            <Doughnut data={setDataToDoughnut(value, limit, color)}
                options={setOptionsToDoughnut(value)}
            />
            <p className={styles.percents}>{value}</p>
        </div>
    )
}