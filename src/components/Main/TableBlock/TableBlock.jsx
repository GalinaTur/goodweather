import styles from './TableBlock.module.scss';
import TableRow from './TableRow/TableRow';

const setLinkPath = (elem) => {
    return elem[0].isToday ? `/details/${elem[0].cityID}/today` : `/details/${elem[0].cityID}/${elem[0].date.slice(0,3)}`;
}

export default function TableBlock({ data }) {

    return data && (
        <div className={styles.tableBlock}>
            <div className={styles.tableContainer}>
                {Object.values(data).map((value, id) => {
                    if (id !== 0 && Object.keys(value).length < 2) return;
                    return <TableRow key={id} data={value.detailsForTable} link={setLinkPath(value)} />
                })}
            </div>
        </div>
    )
}

