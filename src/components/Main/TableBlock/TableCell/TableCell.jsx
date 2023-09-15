import styles from './TableCell.module.scss';
import icons from '../../../../assets/sprite.svg';
import classNames from 'classnames';

const defineCellData = (className, data) => {
    if (className === 'icon') {
        return (
            <svg width='20' height='20' viewBox="0 0 100 100" role="img" aria-roledescription="">
                <use href={`${icons}#${data}`} />
            </svg>
        )
    } else {
        return data;
    }
}

export default function TableCell({ data, className }) {
    return data ? (
        <div className={classNames(styles.cell, styles[`${className}`])}>{defineCellData(className, data)}</div>
    ) : ''
}

