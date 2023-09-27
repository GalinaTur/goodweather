import styles from './WeatherIcon.module.scss';
import icons from '../../../assets/sprite.svg';
import classNames from 'classnames';

export default function WeatherIcon({ data, className, description }) {

    return (
        <div className={classNames(styles.weather, className)}>
            <svg viewBox="0 0 100 100" role="img" className={styles.icon} aria-label={data}>
                <use href={`${icons}#${data}`} />
            </svg>
            {description && <p className={styles.weather_text}>{description}</p> }
        </div>
    )
}

