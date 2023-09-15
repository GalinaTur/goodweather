import styles from './Datalabel.module.scss';
import icons from '../../../../assets/sprite.svg';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export default function Datalabel({ elem, id, length }) {

    return !elem ? 'Loading..' : (
        <NavLink to={`${elem.isToday ? '/details/today/' : `/details/${elem.weekday[0].toLowerCase()}/`}${elem.time.replace(':', '')}`} 
        className={({isActive})=>  isActive ? styles.active : styles.navlink}
        style={{ left: (((830-(length*50))/(length-1)) * id + id*(50) + 10) }} data-testid={`datalabel_${id}`}>
                    <p className={styles.time}>{elem.time}</p>
                    <svg className={styles.icon} width='40' height='40' viewBox="0 0 100 100" role="img" aria-label={`Weather at ${elem.time}: ${elem.weather}`} data-testid={elem.weatherIcon} >
                        <use href={`${icons}#${elem.weatherIcon}`} />
                    </svg>
                    <p>{`${elem.precipitationIcon}\u00a0${elem.details?.[7].value}`}</p>
            </NavLink>
    )
}

