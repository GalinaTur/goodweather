import styles from './TableRow.module.scss';
import TableCell from '../TableCell/TableCell';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

export default function TableRow({ id, data, className, link }) {
    
    return data && (
        <Link to={!link ? '#' : id === 0 ? '/details/today' : `/details/${data.weekday}`} className={classNames(styles.row, className)} tabIndex={link? '0' : '-1'}>
                {Object.entries(data).map(([key, value], i) => {
                    return <TableCell key={i} className={key} data={value} />
                })}
        </Link>)
}

