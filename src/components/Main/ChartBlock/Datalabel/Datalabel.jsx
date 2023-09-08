import styles from './Datalabel.module.scss';
import icons from '../../../../assets/sprite.svg';
import classNames from 'classnames';
import { Routes, Route, NavLink, Link } from 'react-router-dom';

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
            <NavLink to={`${elem.isToday ? 'today/' : ''}${elem.time.replace(':', '')}`} className={({isActive})=>  isActive ? styles.active : styles.navlink}>
                <div className={classNames(styles.weather, styles.weather_id)} style={{ left: (97 * id + 10) }} data-testid={`datalabel_${id}`} >
                    <p className={styles.time}>{elem.time}</p>
                    <svg className={styles.icon} width='40' height='40' viewBox="0 0 100 100" role="img" aria-label={`Weather at ${elem.time}: ${elem.weather}`} data-testid={elem.weatherIcon} >
                        <use href={`${icons}#${elem.weatherIcon}`} />
                    </svg>
                    <p>{`${elem.precipitationIcon}\u00a0${elem.details?.[7].value}`}</p>
                </div>
            </NavLink>
    )
}

