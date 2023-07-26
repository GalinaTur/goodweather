import styles from './Datalabel.module.scss';
import icons from '../../../../assets/sprite.svg';
import classNames from 'classnames';

export default function Datalabel({elem, id, iconId, definePrecip}) {
    const presipType = elem.rain ? "rain" : elem.snow ? 'snow' : '';
    
    return !elem? 'Loading..' : (
        <div className={classNames(styles.weather, styles.weather_id)} style={{left: (97*id + 10)}}>
        <p>{elem.time}</p>
            <svg width='40' height='40' viewBox="0 0 100 100" role="img" aria-roledescription="">
                <use href={`${icons}#${iconId}`} />
            </svg>
            <p>{`${definePrecip(elem.temp, presipType)} ${elem.details?.[7].value}%`}</p>
        </div>
    )
}

