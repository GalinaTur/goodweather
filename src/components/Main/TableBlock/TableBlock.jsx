import styles from './TableBlock.module.scss';
import icons from '../../../assets/sprite.svg';

export default function TableBlock() {

    return (
        <div className={styles.tableBlock}>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <tbody>
                        <tr><td className={styles.date}>Thursday 29.06</td>
                            <td className={styles.image}>
                                <svg width='50' height='50' viewBox="0 0 100 100" role="img" aria-roledescription="">
                                    <use href={`${icons}#overcast`} />
                                </svg>
                            </td>
                            <td className={styles.weather}>Sunny</td>
                            <td className={styles.precipitation}>💧 10%</td>
                            <td className={styles.wind}>West south</td>
                            <td className={styles.temperature}>0° / 5°</td>
                        </tr>
                        <tr><td className={styles.date}>Thursday 29.06</td>
                            <td className={styles.image}>
                                <svg width='50' height='50' viewBox="0 0 100 100" role="img" aria-roledescription="">
                                    <use href={`${icons}#sleet`} />
                                </svg>
                            </td>
                            <td className={styles.weather}>Sunny</td>
                            <td className={styles.precipitation}>💧 10%</td>
                            <td className={styles.wind}>West south</td>
                            <td className={styles.temperature}>0° / 5°</td>
                        </tr>
                        <tr><td className={styles.date}>Thursday 29.06</td>
                            <td className={styles.image}>
                                <svg width='50' height='50' viewBox="0 0 100 100" role="img" aria-roledescription="">
                                    <use href={`${icons}#fog`} />
                                </svg>
                            </td>
                            <td className={styles.weather}>Sunny</td>
                            <td className={styles.precipitation}>💧 10%</td>
                            <td className={styles.wind}>West south</td>
                            <td className={styles.temperature}>0° / 5°</td>
                        </tr>
                        <tr><td className={styles.date}>Thursday 29.06</td>
                            <td className={styles.image}>
                                <svg width='50' height='50' viewBox="0 0 100 100" role="img" aria-roledescription="">
                                    <use href={`${icons}#mist`} />
                                </svg>
                            </td>
                            <td className={styles.weather}>Sunny</td>
                            <td className={styles.precipitation}>💧 10%</td>
                            <td className={styles.wind}>West south</td>
                            <td className={styles.temperature}>0° / 5°</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

