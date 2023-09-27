import styles from './TableHeader.module.scss';
import TableHeaderPart from './TableHeaderPart/TableHeaderPart';

export default function TableHeader({data}) {

    return data && (
        <>
            <div className={styles.datetime}><p>{data.datetime[0]}</p><p>{data.datetime[1]}</p></div>
            <div className={styles.header}>
                {data.parts.map((value, id) => {
                    return <TableHeaderPart data={value} key={id} />
                })}
            </div>
        </>
    )
}

