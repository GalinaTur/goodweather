import styles from './Datalabel.module.scss';
import icons from '../../../../assets/sprite.svg';
import classNames from 'classnames';

export default function Datalabel({elem, id, iconId}) {
    const presipType = elem.rain ? "rain" : elem.snow ? 'snow' : '';
    
    return !elem? 'Loading..' : (
        <div className={classNames(styles.weather, styles.weather_id)} style={{left: (97*id + 10)}} data-testid={`datalabel_${id}`} >
        <p>{elem.time}</p>
            <svg width='40' height='40' viewBox="0 0 100 100" role="img" aria-label={`Weather at ${elem.time}: ${elem.weather}`} data-testid={iconId} >
                <use href={`${icons}#${iconId}`} />
            </svg>
            <p>{`${elem.precipitationIcon} ${elem.details?.[7].value}`}</p>
        </div>
    )
}

