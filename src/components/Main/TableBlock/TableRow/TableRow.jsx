import styles from './TableRow.module.scss';
import TableCell from '../TableCell/TableCell';

export default function TableRow({ data }) {

    return data && (
        <tr className={styles.row}>
            {Object.entries(data.detailsForTable).map(([key, value], i) => {
                return <TableCell key={i} className={key} data={value} />
            })}
        </tr>
    )
}

