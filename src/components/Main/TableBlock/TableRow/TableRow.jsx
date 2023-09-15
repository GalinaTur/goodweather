import styles from './TableRow.module.scss';
import TableCell from '../TableCell/TableCell';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

export default function TableRow({ data, className, link }) {

    return data && (
        <Link to={link ? `/details/${data.weekday.toLowerCase()}` : '#'} className={classNames(styles.row, className)} tabIndex={link? '0' : '-1'}>
                {Object.entries(data).map(([key, value], i) => {
                    return <TableCell key={i} className={key} data={value} />
                })}
        </Link>)
}

