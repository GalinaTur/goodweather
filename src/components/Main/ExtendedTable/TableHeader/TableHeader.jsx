import styles from './TableHeader.module.scss';
import TableHeaderPart from './TableHeaderPart/TableHeaderPart';
import classNames from 'classnames';

export default function TableHeader({data, className}) {

    return data && (
        <>
            {data.datetime && <div className={styles.datetime}><p>{data.datetime[0]}</p><p>{data.datetime[1]}</p></div>}
            <div className={classNames(styles.header, className)}>
                {data.parts.map((value, id) => {
                    return <TableHeaderPart data={value} key={id} />
                })}
            </div>
        </>
    )
}

