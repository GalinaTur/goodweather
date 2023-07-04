import styles from './TableBlock.module.scss';
import icons from '../../../assets/sprite.svg';

export default function TableBlock() {

    return (
        <div class={styles.tableBlock}>
            <div class={styles.tableContainer}>
                <table class={styles.table}>
                    <tbody>
                        <tr><td class={styles.date}>Thursday 29.06</td>
                            <td class={styles.image}>
                                <svg width='50' height='50' viewBox="0 0 100 100" role="img" aria-roledescription="">
                                    <use href={`${icons}#day_rain_thunder`} />
                                </svg>
                            </td>
                            <td class={styles.for_lg}>Sunny</td>
                            <td class={styles.precipitation}>💧 10%</td>
                            <td class={styles.for_lg}>West south</td>
                            <td class={styles.temperature}>0° / 5°</td>
                        </tr>
                        <tr><td class={styles.date}>Thursday 29.06</td>
                            <td class={styles.image}>
                                <svg width='50' height='50' viewBox="0 0 100 100" role="img" aria-roledescription="">
                                    <use href={`${icons}#sleet`} />
                                </svg>
                            </td>
                            <td class={styles.for_lg}>Sunny</td>
                            <td class={styles.precipitation}>💧 10%</td>
                            <td class={styles.for_lg}>West south</td>
                            <td class={styles.temperature}>0° / 5°</td>
                        </tr>
                        <tr><td class={styles.date}>Thursday 29.06</td>
                            <td class={styles.image}>
                                <svg width='50' height='50' viewBox="0 0 100 100" role="img" aria-roledescription="">
                                    <use href={`${icons}#fog`} />
                                </svg>
                            </td>
                            <td class={styles.for_lg}>Sunny</td>
                            <td class={styles.precipitation}>💧 10%</td>
                            <td class={styles.for_lg}>West south</td>
                            <td class={styles.temperature}>0° / 5°</td>
                        </tr>
                        <tr><td class={styles.date}>Thursday 29.06</td>
                            <td class={styles.image}>
                                <svg width='50' height='50' viewBox="0 0 100 100" role="img" aria-roledescription="">
                                    <use href={`${icons}#mist`} />
                                </svg>
                            </td>
                            <td class={styles.for_lg}>Sunny</td>
                            <td class={styles.precipitation}>💧 10%</td>
                            <td class={styles.for_lg}>West south</td>
                            <td class={styles.temperature}>0° / 5°</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

