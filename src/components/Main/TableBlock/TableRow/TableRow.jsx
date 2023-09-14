import styles from './TableRow.module.scss';
import TableCell from '../TableCell/TableCell';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

export default function TableRow({ data, className }) {

    return data && (
        <tr className={classNames(styles.row, className)}>
                {Object.entries(data).map(([key, value], i) => {
                    return <TableCell key={i} className={key} data={value} />
                })}
        </tr>
    )
}

