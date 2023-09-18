import styles from './TemperatureBig.module.scss';
import classNames from 'classnames';

export default function TemperatureBig({ data, className }) {
    return (
        <p className={classNames(styles.temperature, className)} data-testid='currTemp'><span>{data}</span>°C</p>
    )
}

