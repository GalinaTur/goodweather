import styles from './TableRow.module.scss';
import TableCell from '../TableCell/TableCell';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

export default function TableRow({ data, className, link }) {

    const isLink = (link) => {
        if (link) {
            return (
                <tr>
                    <Link to={`/details/${data.weekday.toLowerCase()}/1500`}  className={classNames(styles.row, className)}>
                        {Object.entries(data).map(([key, value], i) => {
                            return <TableCell key={i} className={key} data={value} />
                        })}
                    </Link>
                </tr>)
        } else {
            return(
            <tr className={classNames(styles.row, className)}>
                {Object.entries(data).map(([key, value], i) => {
                    return <TableCell key={i} className={key} data={value} />
                })}
            </tr>
            )
        }
    }

    return data && isLink(link)
}

