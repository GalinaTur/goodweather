import styles from './AqiPage.module.scss';
import { airComponentsRanges, units } from '../../../utils/store';
import { Outlet, useOutletContext } from 'react-router-dom';
import DoughnutChart from '../../charts/DoughnutChart/DoughnutChart';
import ExtendedTable from '../ExtendedTable/ExtendedTable';
import AirComponent from './AirComponent/AirComponent';

const defineIndex = (key, value) => {
    const index = airComponentsRanges[key].ranges.findIndex((elem) => elem > value);
    return index;
}

const defineRange = (index, list) => {
    return index !== -1 ? list[index - 1] : list[list.length - 1];
}

const definePrimatyPollutant = (data) => {
    const primaryPollutant = Object.entries(data.components).reduce((primary, elem) => {
        if (elem.percents > primary) primary = elem;
        return primary;
    })
    return primaryPollutant;
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
                className = {styles.chartMain}
            />
        },
        components: Object.entries(list.components).map(([key, value]) => {
            const componentLimit = airComponentsRanges[key].ranges[airComponentsRanges[key].ranges.length - 1];
            const componentPercents = Math.round(value / componentLimit * 200) / 2;
            return {
                key: key,
                value: value,
                limit: componentLimit,
                percents: componentPercents,
                message: defineRange(defineIndex(key, value), airComponentsRanges.qualitativeNames),
                full: airComponentsRanges[key].full,
                units: units.airPollutants,
                chart: <DoughnutChart value={componentPercents}
                    limit='100' color={defineRange(defineIndex(key, value), airComponentsRanges.colors)}
                    className = {styles.chartTable}
                />
            }
        })
    }
}

const formatTableData = (data) => {
    const primaryPollutant = definePrimatyPollutant(data);

    const headerPartLeft = <>
        <AirComponent data={data.main} />
    </>;

    const headerPartRigt = <>
        <p className={styles.primaryPollutant}>Primary Pollutant:</p>
        <p>{primaryPollutant.key} ({primaryPollutant.full})</p></>

    const formatedData = {
        headerData: {
            datetime: ['date', 'time'],
            parts: [headerPartLeft, headerPartRigt],
        },
        details: data.components.map((item) => {
            return {
                component: <AirComponent data={item} />
            }
    })
    }
    return formatedData;
}

export default function AqiPage() {

    const { airPollut } = useOutletContext();

    const ctx = {
        data: formatTableData(formatData(airPollut)),
    }

    return airPollut && (
        <div className={styles.aqiPage}>AQIPAGE
            <Outlet context={ctx} />
        </div>
    )
}

