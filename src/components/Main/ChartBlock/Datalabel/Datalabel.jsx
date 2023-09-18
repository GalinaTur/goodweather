import styles from './Datalabel.module.scss';
import { NavLink } from 'react-router-dom';
import WeatherIcon from '../../WeatherIcon/WeatherIcon';

export default function Datalabel({ elem, id, length }) {

    return !elem ? 'Loading..' : (
        <NavLink to={`${elem.isToday ? '/details/today/' : `/details/${elem.weekday[0].toLowerCase()}/`}${elem.time.replace(':', '')}`} 
        className={({isActive}) => isActive ? styles.active : styles.navlink}
        style={{ left: (((830-(length*50))/(length-1)) * id + id*(50) + 10) }} data-testid={`datalabel_${id}`}>
                    <p className={styles.time}>{elem.time}</p>
                    <WeatherIcon data={elem.weatherIcon} className={styles.icon}/>
                    <p>{`${elem.precipitationIcon}\u00a0${elem.details?.[7].value}`}</p>
            </NavLink>
    )
}

