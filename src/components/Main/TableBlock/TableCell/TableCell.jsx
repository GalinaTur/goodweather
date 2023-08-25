import styles from './TableCell.module.scss';

export default function TableCell({ data, className }) {

    return (
        <td className={styles[`${className}`]}>{data}</td>
    )
}

