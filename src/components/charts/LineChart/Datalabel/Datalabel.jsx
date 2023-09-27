import styles from './Datalabel.module.scss';
import { NavLink } from 'react-router-dom';
import WeatherIcon from '../../../Main/WeatherIcon/WeatherIcon';

const containerWidth = 830;
const datalabelWidth = 50;
const offset = 10;

const calculateStyleLeft = (id, length) => {
    return (((containerWidth-(length*datalabelWidth))/(length-1)) * id + id*(datalabelWidth) + offset);
}

export default function Datalabel({ elem, id, length }) {

    return !elem ? 'Loading..' : (
        <NavLink to={`${elem.isToday ? `../details/today` : `../details/${elem.date.slice(0,3).toLowerCase()}`}/${elem.time.replace(':', '-')}`} 
        className={({isActive}) => isActive ? styles.active : styles.navlink}
        style={{ left: calculateStyleLeft(id, length) }} data-testid={`datalabel_${id}`}>
                    <p className={styles.time}>{elem.time}</p>
                    <WeatherIcon data={elem.weatherIcon} className={styles.icon}/>
                    <p>{`${elem.precipitationIcon}\u00a0${elem.details?.[6].value}`}</p>
            </NavLink>
    )
}

