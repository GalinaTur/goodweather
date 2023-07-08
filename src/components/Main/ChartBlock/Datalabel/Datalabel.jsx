import styles from './Datalabel.module.scss';
import icons from '../../../../assets/sprite.svg';
import classNames from 'classnames';

const definePrecip = (temp) => {
    return temp < 0 ? '❄' : '💧';
}

export default function Datalabel({elem, id, iconIdCreator}) {
    const time = elem? elem.dt_txt.slice(11, 16) : '';
    const temp = elem?.main.temp;
    const weather = elem?.weather[0].description;
    const partOfDay = elem?.sys.pod;
    const precipProbab = elem?.pop*100;

    return !elem? 'Loading..' : (
        <div className={classNames(styles.weather, styles.weather_id)} style={{left: (126.8*id + 10)}}>
        <p>{time}</p>
            <svg width='40' height='40' viewBox="0 0 100 100" role="img" aria-roledescription="">
                <use href={`${icons}#${!elem? '' : iconIdCreator(weather, partOfDay)}`} />
            </svg>
            <p>{`${definePrecip(temp)} ${precipProbab}%`}</p>
        </div>
    )
}

