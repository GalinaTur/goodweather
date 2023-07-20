import styles from './TableBlock.module.scss';
import TableRow from './TableRow/TableRow';
import classNames from 'classnames';

export default function TableBlock({ forecast, iconIdCreator, formatDT, definePrecip, defineWindDirection, className }) {

    const groupedList = !forecast ? '' : forecast.list.reduce((newList, elem) => {
        const key = elem['dt_txt'].slice(0, 10);
        if (!newList[key]) newList[key] = [];
        newList[key].push(elem);
        return newList;
    }, {});

    return (
        <div className={classNames(className, styles.tableBlock)}>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <tbody>
                    {Object.values(groupedList).map((value, id)=> {
                        if (Object.keys(value).length < 2) return; 
                    return <TableRow key={id} day={value} iconIdCreator={iconIdCreator} formatDT={formatDT} definePrecip={definePrecip}/>
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

