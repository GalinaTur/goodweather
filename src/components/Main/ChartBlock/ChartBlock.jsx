import styles from './ChartBlock.module.scss';
import icons from '../../../assets/sprite.svg';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(...registerables);


const data = [
    { hour: '12:00', temperature: 20 },
    { hour: '13:00', temperature: 28 },
    { hour: '14:00', temperature: 29 },
    { hour: '15:00', temperature: 28 },
    { hour: '16:00', temperature: 28 },
    { hour: '17:00', temperature: 28 },
    { hour: '18:00', temperature: 28 },
    { hour: '19:00', temperature: 29 },
    { hour: '20:00', temperature: 29 },
    { hour: '21:00', temperature: 29 },
    { hour: '22:00', temperature: 29 },
    { hour: '23:00', temperature: 29 },
    { hour: '00:00', temperature: 28 },
    { hour: '01:00', temperature: 28 },
    { hour: '02:00', temperature: 28 },
    { hour: '18:00', temperature: 29 },
    { hour: '18:00', temperature: 28 },
    { hour: '18:00', temperature: 29 },
    { hour: '18:00', temperature: 28 },
    { hour: '18:00', temperature: 29 },
    { hour: '18:00', temperature: 28 },
    { hour: '18:00', temperature: 29 },
    { hour: '18:00', temperature: 29 },
    { hour: '12:00', temperature: 30 },
];

export default function ChartBlock() {

    return (
        <div className={styles.chartBlock}>
            <p className={styles.title}>24 hours next → </p>
            <div className={styles.chart}>
                <Line width="4000" height="260" datasetIdKey="tempByHoursChart" data={{
                    labels: data.map(row => row.hour),
                    datasets: [
                        {
                            data: data.map(row => row.temperature),
                            indexAxis: 'x',
                            fill: {
                                target: 'origin',
                                below: 'rgba(255, 255, 255, 0.2)'
                            },
                            line: {
                                borderColor: 'rgba(255, 255, 255, 1)'
                            },
                        }
                    ]
                }} options={{
                    plugins: {
                        tooltip: {
                            enabled: false,
                        },

                        legend: {
                            display: false
                        },

                        datalabels: {
                            color: 'white',
                            align: 'top',
                            formatter: function (value) {
                                return value + '°';
                            },
                            font: {
                                family: 'Oxygen'
                            },

                        }
                    },

                    scales: {
                        y: {
                            min: 18, //min -2
                            max: 40, //todo! max +10 ??
                            ticks: {
                                display: false,
                            },
                            grid: {
                                display: false,
                            },
                            border: {
                                display: false,
                            },
                        },

                        x: {
                            display: true,
                            position: 'top',
                            grid: {
                                display: false,
                            },
                            border: {
                                display: false,
                            },

                            ticks: {
                                color: 'transparent',
                                family: 'Oxygen',
                                padding: 30
                            },
                        }
                    }
                }}
                    plugins={[ChartDataLabels]} />
            </div>
            <footer className={styles.footer}>
                <p className={styles.details}></p></footer>
        </div>
    )
}

