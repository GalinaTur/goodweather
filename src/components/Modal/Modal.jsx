import "@reach/combobox/styles.css";
import { useEffect } from 'react';
import styles from './Modal.module.scss';
import TableRow from "../Main/TableRow/TableRow";
import icons from '../../assets/sprite.svg';
import { useParams } from "react-router-dom";

const navs = [{
    icon: 'location',
    key: 'home',
    link: 'main',
},
{
    icon: 'details',
    key: 'details',
    link: 'details/today',
},
{
    icon: 'favorite',
    key: 'favorite cities',
    link: 'favorite-cities',
},
{
    icon: 'radar',
    key: 'radar',
    link: 'radar',
},
{
    icon: 'aqi',
    key: 'air quality',
    link: 'aqi',
},
{
    icon: 'about',
    key: 'about',
    link: 'about',
}];

export default function Modal({ modalRef, modalWindowRef, closeModalBtnRef, activeModal, handleModalClose }) {

const {cityId} = useParams();

    useEffect(() => {
        if (activeModal === 'menu') {
            modalRef.current.classList.add(styles.modalContainer_active);
        } else if (!activeModal) {
            modalRef.current.classList.remove(styles.modalContainer_active)
        }
    }, [activeModal])

useEffect(()=> {
    
})

    return (
        <div ref={modalRef} className={styles.modalContainer} onClick={handleModalClose}>
            <div ref={modalWindowRef} className={styles.modal}>
                <svg ref={closeModalBtnRef} role='button' viewBox="7 7 18 18" className={styles.close} onClick={handleModalClose}>
                    <use ref={closeModalBtnRef} href={`${icons}#clearForm`} />
                </svg>
                {navs.map((elem, id) => <TableRow data={elem} key={id} link={`${elem.link}`} className={styles.row} handleModalClose={handleModalClose}/>)}
            </div>
        </div>
    )
}