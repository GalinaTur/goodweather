import styles from './TableHeaderPart.module.scss';

export default function TableHeaderPart({data}) {

    return data && (
        <div className={styles.part}>{data}</div>
    )
}