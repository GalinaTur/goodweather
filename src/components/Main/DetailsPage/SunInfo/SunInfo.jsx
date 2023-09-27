import styles from './SunInfo.module.scss';
import icons from '../../../../assets/sprite.svg';

export default function SunInfo({ type, data }) {

    return data && (
        <p className={styles.sun}>
            <svg width='50' height='50' viewBox="0 0 100 100" role="img" aria-label={`${type}`}>
                <use href={`${icons}#${type}`} />
            </svg>
            {data}
        </p>
    )
}

