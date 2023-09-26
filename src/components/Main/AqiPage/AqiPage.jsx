import styles from './AqiPage.module.scss';
import { airComponentsRanges } from '../../../utils/store';
import { useOutletContext } from 'react-router-dom';
import DoughnutChart from '../../charts/DoughnutChart/DoughnutChart';

const defineColor = (key, value) => {
    const list = airComponentsRanges.colors;
    const index = airComponentsRanges[key].ranges.findIndex((elem) => elem > value);
    return index !== -1 ? list[index-1] : list[list.length - 1];
}

const formatData = (data) => {
    const list = data.list[0];
    return {
        main: {
            key: 'aqi',
            value: list.main.aqi,
            limit: airComponentsRanges.aqi[4],
            message: airComponentsRanges.messages[list.main.aqi - 1],
            color: airComponentsRanges.colors[list.main.aqi - 1],
            full: 'Air Quality Index',
        },
        components: Object.entries(list.components).map(([key, value]) => {
            return {
                key: key,
                value: value,
                limit: airComponentsRanges[key].ranges[airComponentsRanges[key].ranges.length - 1],
                percents: Math.round(value / airComponentsRanges[key].ranges[airComponentsRanges[key].ranges.length - 1] * 200)/2,
                color: defineColor(key, value),
                full: airComponentsRanges[key].full,
            }
        })
    }
}

export default function AqiPage() {

    const { airPollut } = useOutletContext();
    const formattedAqi = formatData(airPollut);

console.log(formattedAqi)

    return airPollut && (
        <div className={styles.aqiPage}>AQIPAGE
            <DoughnutChart data={formattedAqi.main} />
            {formattedAqi.components.map((elem, id) => {
                return <DoughnutChart data={elem} key={id}/>
            })}
        </div>
    )
}

