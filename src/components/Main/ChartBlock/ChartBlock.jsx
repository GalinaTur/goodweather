import styles from './ChartBlock.module.scss';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Datalabel from './Datalabel/Datalabel';
Chart.register(...registerables);

let amountOfHours = 17;
let tempExtremes = { min: '', max: '' };

const checkIfMinOrMaxTemp = (temp) => {
    tempExtremes.min = Math.min(temp, tempExtremes.min || temp);
    tempExtremes.max = Math.max(temp, tempExtremes.max || temp);
}

export default function ChartBlock({ forecast, iconIdCreator, definePrecip }) {
    const list = forecast? forecast.list.slice(0, (amountOfHours+1)) : '';

    return !forecast ? 'Loading' : (
        <div className={styles.chartBlock}>
            <p className={styles.title}>48 hours next → </p>
            <p className={styles.tip}><span>💧Chance of rain</span><span>❄Chance of snow</span></p>
            <p className={styles.details}></p>

            <div className={styles.chart}>
                {list?.map((elem, id) => {
                    return <Datalabel elem={elem} id={id} key={id} iconIdCreator={iconIdCreator} definePrecip={definePrecip}/>
                })}
                <Line width="2300" datasetIdKey="tempByHoursChart" data={{
                    labels: list?.map((elem) => {
                        return elem.dt
                    }),
                    datasets: [
                        {
                            data: list?.map((elem) => {
                                checkIfMinOrMaxTemp(elem.main.temp);
                                return Math.round(elem.main.temp);
                            }),
         
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
    )
}

