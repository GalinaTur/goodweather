import styles from './AqiPage.module.scss';
import { airComponentsRanges } from '../../../utils/store';
import { useOutletContext } from 'react-router-dom';
import DoughnutChart from '../../charts/DoughnutChart/DoughnutChart';
import ExtendedTable from '../ExtendedTable/ExtendedTable';

const defineColor = (key, value) => {
    const list = airComponentsRanges.colors;
    const index = airComponentsRanges[key].ranges.findIndex((elem) => elem > value);
    return index !== -1 ? list[index-1] : list[list.length - 1];
}

const formatData = (data) => {
    const list = data.list[0];
    const aqiLimit = airComponentsRanges.aqi[airComponentsRanges.aqi.length - 1]; 
    return {
        main: {
            key: 'aqi',
            value: list.main.aqi,
            limit: aqiLimit,
            message: airComponentsRanges.messages[list.main.aqi - 1],
            full: 'Air Quality Index',
            chart: <DoughnutChart value={list.main.aqi} 
            limit={aqiLimit}
                color={airComponentsRanges.colors[list.main.aqi - 1]}
            />
        },
        components: Object.entries(list.components).map(([key, value]) => {
            const componentLimit = airComponentsRanges[key].ranges[airComponentsRanges[key].ranges.length - 1];
            const componentPercents = Math.round(value / componentLimit * 200)/2
            return {
                key: key,
                value: value,
                limit: componentLimit,
                percents: componentPercents,
                full: airComponentsRanges[key].full,
                chart: <DoughnutChart value={componentPercents} 
                limit='100' color={defineColor(key, value)}
                />
            }
        })
    }
}

export default function AqiPage() {

    const { airPollut } = useOutletContext();

    console.log(formatData(airPollut))

    return airPollut && (
        <div className={styles.aqiPage}>AQIPAGE
            <ExtendedTable data={formatData(airPollut)}/>
        </div>
    )
}

