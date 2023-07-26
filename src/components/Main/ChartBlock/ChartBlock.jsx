import styles from './ChartBlock.module.scss';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Datalabel from './Datalabel/Datalabel';

Chart.register(...registerables);

let amountOfHours = 8;

export default function ChartBlock({ data, definePrecip }) {

    let tempExtremes = { min: '', max: '' };

    const checkIfMinOrMaxTemp = (temp) => {
        tempExtremes.min = Math.min(temp, tempExtremes.min || temp);
        tempExtremes.max = Math.max(temp, tempExtremes.max || temp);
    }

    return !data ? 'Loading' : (
        <div className={styles.chartBlockContainer}>
            <div className={styles.chartBlock}>
                <div className={styles.chart}>
                    {data?.map((elem, id) => {
                        return <Datalabel elem={elem} id={id} key={id} iconId={elem.weatherIcon} definePrecip={definePrecip} />
                    })}
                    <Line width="850" datasetIdKey="tempByHoursChart" data={{
                        labels: data?.map((elem) => {
                            return elem.time
                        }),
                        datasets: [
                            {
                                data: data?.map((elem) => {
                                    checkIfMinOrMaxTemp(elem.temp);
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
                    }} options={{
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
                                suggestedMin: (tempExtremes.min - 1),
                                suggestedMax: (tempExtremes.max + 25),
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
                    }}
                        plugins={[ChartDataLabels]} />
                </div>
            </div>
            <p className={styles.title}>24 hours next</p>
            <p className={styles.tip}><span>💧Chance of rain</span><span>❄Chance of snow</span></p>
            <p className={styles.details}></p>
        </div>
    )
}

