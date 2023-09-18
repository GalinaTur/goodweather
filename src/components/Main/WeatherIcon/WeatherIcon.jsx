import styles from './WeatherIcon.module.scss';
import icons from '../../../assets/sprite.svg';
import classNames from 'classnames';

export default function WeatherIcon({ data, className }) {

    return (
        <svg viewBox="0 0 100 100" role="img" className={classNames(styles.icon, className)} aria-label={data}>
            <use href={`${icons}#${data}`} />
        </svg>
    )
}

