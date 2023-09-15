import styles from './TableBlock.module.scss';
import TableRow from './TableRow/TableRow';

export default function TableBlock({ data }) {

    return data && (
        <div className={styles.tableBlock}>
            <div className={styles.tableContainer}>
                {Object.values(data).map((value, id) => {
                    if (value[0].isToday) return;
                    if (Object.keys(value).length < 2) return;
                    return <TableRow key={id} data={value.detailsForTable} link={true} />
                })}
            </div>
        </div>
    )
}

