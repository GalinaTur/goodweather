import styles from './LineChart.module.scss';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Datalabel from './Datalabel/Datalabel';

Chart.register(...registerables);

export default function LineChart({ data, dayId }) {

    let extremes = { min: '', max: '' };

    const checkIfMinOrMaxTemp = (key) => {
        extremes.min = Math.min(key, extremes.min || key);
        extremes.max = Math.max(key, extremes.max || key);
    }

const chartData = {
    labels: data?.map((elem) => {
        return elem.time
    }),
    datasets: [
        {
            data: data?.map((elem) => {
                checkIfMinOrMaxTemp(elem.temp)
                return elem.temp;
            }),
            indexAxis: 'x',
            fill: {
                target: 'origin',
                below: 'rgba(255, 255, 255, 0.2)'
            },
            borderColor: 'rgba(255, 255, 255, 1)',
            backgroundColor: 'rgba(255, 255, 255, 0.3)'
        }
    ]
}

const chartOptions = {
    responsive: false,
    maintainAspectRatio: false,
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
            min: (extremes.min - 5),
            max: (extremes.max + 40),
            ticks: {
                beginAtZero: false,
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
            grid: {
                display: false,
            },
            border: {
                display: false,
            },

            ticks: {
                color: 'transparent',
                padding: 20
            },
        }
    }
}

    return !data ? 'Loading' : (
        <div className={styles.chartBlockContainer}>
            <div className={styles.chartBlock} tabIndex='-1'>
                <div className={styles.chart}>
                    {data?.map((elem, id, arr) => {
                        return <Datalabel elem={elem} id={id} key={id} length={arr.length} dayId={dayId || 'd0'}/>
                    })}
                    <Line width='850' datasetIdKey="tempByHoursChart" className={styles.line} 
                    data={chartData} options={chartOptions} plugins={[ChartDataLabels]}/>
                </div>
            </div>
            <p className={styles.title}>{(data.length-1) * 3} hours</p>
            <p className={styles.tip}><span>💧Chance of rain</span><span>❄Chance of snow</span></p>
            <p className={styles.details}></p>
        </div>
    )
}

