import styles from './AqiPage.module.scss';
import { airComponentsRanges, units } from '../../../utils/store';
import { Outlet, useOutletContext } from 'react-router-dom';
import DoughnutChart from '../../charts/DoughnutChart/DoughnutChart';
import AirComponent from './AirComponent/AirComponent';

const defineIndex = (key, value) => {
    const index = airComponentsRanges[key].ranges.findIndex((elem) => elem > value);
    return index;
}

const defineRange = (index, list) => {
    return index !== -1 ? list[index - 1] : list[list.length - 1];
}

const definePrimatyPollutant = (data) => {
    const primaryPollutant = data.reduce((primary, elem) => {
        if (elem.aqi > primary.aqi) primary = elem;
        return primary;
    })
    return primaryPollutant;
}

const maxAqi = 1000;
        const aqiLimit = 500;

const formatData = (data) => {
    const list = data.list[0];
    const components = Object.entries(list.components).map(([key, value]) => {
        const index = defineIndex(key, value);
        const componentLimit = airComponentsRanges[key].ranges[airComponentsRanges[key].ranges.length - 1];
        const IHigh = airComponentsRanges.aqi[index] || maxAqi;
        const ILow = airComponentsRanges.aqi[index - 1];
        const CHigh = airComponentsRanges[key].ranges[index];
        const CLow = airComponentsRanges[key].ranges[index - 1];
        const componentAqi = Math.round(((IHigh - ILow)/(CHigh - CLow)) * (value - CLow) + ILow);
        return {
            key: key,
            value: value,
            limit: componentLimit,
            index: index,
            message: defineRange(index, airComponentsRanges.qualitativeNames),
            full: airComponentsRanges[key].full,
            aqi: componentAqi,
            units: units.airPollutants,
            chart: <DoughnutChart value={componentAqi}
                limit={aqiLimit} color={defineRange(index, airComponentsRanges.colors)}
                className={styles.chartTable}
            />
        }
    });
    return components;
}

const formatMainAqiData = (data) => {
    return {
        key: 'AQI',
        value: data.value,
        message: defineRange(data.index, airComponentsRanges.messages),
        full: 'Air Quality Index',
        aqi: data.aqi,
        chart: <DoughnutChart value={data.aqi}
        limit={aqiLimit} color={defineRange(data.index, airComponentsRanges.colors)}
        className={styles.chartMain}
    />
    }
}

const formatTableData = (data) => {

    const primaryPollutant = definePrimatyPollutant(data);

    const headerPartLeft = <>
        <AirComponent data={formatMainAqiData(primaryPollutant)} />
    </>;

    const headerPartRigt = <div className={styles.primaryPollutant}>
        <p className={styles.title}>Primary pollutant:</p>
        <p>{primaryPollutant.full} ({primaryPollutant.key.replace('_', '.').toUpperCase()})</p></div>

    const formatedData = {
        headerData: {
            // datetime: ['date', 'time'],
            parts: [headerPartLeft, headerPartRigt],
        },
        details: data.map((item) => {
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
        className: styles.flexDirectionColumn,
    }

    return airPollut && (
        <div className={styles.aqiPage}>
            <Outlet context={ctx} />
        </div>
    )
}

