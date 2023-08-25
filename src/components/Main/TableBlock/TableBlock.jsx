import styles from './TableBlock.module.scss';
import TableRow from './TableRow/TableRow';

export default function TableBlock({ data }) {

    return data && (
        <div className={styles.tableBlock}>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <tbody>
                    {Object.values(data).map((value, id)=> {
                        if (Object.keys(value).length < 2) return; 
                    return <TableRow key={id} data={value}/>
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

