import styles from './ExtendedTable.module.scss';
import TableRow from '../TableRow/TableRow';
import { useOutletContext } from 'react-router-dom';
import TableHeader from './TableHeader/TableHeader';

export default function ExtendedTable() {

    const { data, className } = useOutletContext();

    return data && (
        <div className={styles.extended}>
            <TableHeader data={data.headerData} className={className}/>
            <div className={styles.body}>
                <div className={styles.table}>
                    {data?.details?.map((item, id) => {
                        return <TableRow key={id} data={item} className={styles.row} link={'#'} />
                    })}
                </div>
            </div>
        </div>
    )
}

