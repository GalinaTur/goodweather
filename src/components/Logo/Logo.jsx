import styles from './Logo.module.scss';
import classNames from 'classnames';

export default function Logo({ className, logoRef }) {

    return (
        <p ref={logoRef} className={classNames(styles.logo, className)}>GOODWEATHER</p>
    )
}

