import "@reach/combobox/styles.css";
import { useEffect } from 'react';
import styles from './Modal.module.scss';
import TableRow from "../Main/TableBlock/TableRow/TableRow";
import icons from '../../assets/sprite.svg';

const navs = [{
    icon: 'location',
    key: 'home',
},
{
    icon: 'details',
    key: 'details'
},
{
    icon: 'favorite',
    key: 'favorite cities'
},
{
    icon: 'radar',
    key: 'radar'
},
{
    icon: 'aqi',
    key: 'air quality'
},
{
    icon: 'about',
    key: 'about'
}];

export default function Modal({ modalRef, modalWindowRef, closeModalBtnRef, activeModal, handleModalClose }) {

    useEffect(() => {
        if (activeModal === 'menu') {
            modalRef.current.classList.add(styles.modalContainer_active);
        } else if (!activeModal) {
            modalRef.current.classList.remove(styles.modalContainer_active)
        }
    }, [activeModal])

    return (
        <div ref={modalRef} className={styles.modalContainer} onClick={handleModalClose}>
            <div ref={modalWindowRef} className={styles.modal}>
                <svg ref={closeModalBtnRef} role='button' viewBox="7 7 18 18" className={styles.close} onClick={handleModalClose}>
                    <use ref={closeModalBtnRef} href={`${icons}#clearForm`} />
                </svg>
                {navs.map((elem, id) => <TableRow data={elem} key={id} link={'#'} className={styles.row} />)}
            </div>
        </div>
    )
}