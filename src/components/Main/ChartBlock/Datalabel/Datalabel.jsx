import styles from './Datalabel.module.scss';
import icons from '../../../../assets/sprite.svg';
import classNames from 'classnames';

export default function Datalabel({ elem, id }) {

    return !elem ? 'Loading..' : (
        elem.temp === '?' ?
            <div className={classNames(styles.weather, styles.weather_id)} style={{ left: (97 * id + 10) }} data-testid={`datalabel_${id}`} >
                <p>{elem.time}</p>
                <svg width='40' height='40' viewBox="0 0 100 100" role="img" aria-label={"Don't know yet"} data-testid={elem.weatherIcon} >
                    <use href={`${icons}#unknown`} />
                </svg>
                <p>too far</p>
            </div>
            :
            <div className={classNames(styles.weather, styles.weather_id)} style={{ left: (97 * id + 10) }} data-testid={`datalabel_${id}`} >
                <p>{elem.time}</p>
                <svg width='40' height='40' viewBox="0 0 100 100" role="img" aria-label={`Weather at ${elem.time}: ${elem.weather}`} data-testid={elem.weatherIcon} >
                    <use href={`${icons}#${elem.weatherIcon}`} />
                </svg>
                <p>{`${elem.precipitationIcon} ${elem.details?.[7].value}`}</p>
            </div>
    )
}

