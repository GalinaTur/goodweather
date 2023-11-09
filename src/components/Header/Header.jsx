import { useEffect, useState, useRef } from 'react';
import { useFetch } from '../../useFetch';
import Container from '../Container/Container';
import styles from './Header.module.scss';
import InputForm from './InputForm/InputForm';
import icons from '../../assets/sprite.svg';
import Logo from '../Logo/Logo';

const API_LIMIT = '&limit=5';

let activeBtn;

export default function Header({ locationText, handleChangeLocation, handleModalOpen, API_URL, inputRef, menuBtnRef, activeModal }) {
    const [searchResult, isPending, setIsPending, error, setError, fetchSearch] = useFetch();
    const [searchTerm, setSearchTerm] = useState(null);
    const clearBtn = useRef(null);
    const logo = useRef(null);

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleSelect = (item) => {
        if (!item) return;
        let locationArr = item.split(', ');
        if (locationArr.length === 2) locationArr.splice(1, 0, '');
        setSearchTerm(null);
        inputRef.current.blur();
        handleChangeLocation(locationArr);
    }

    const handleClear = (e) => {
        inputRef.current.focus();
        inputRef.current.value = '';
        setSearchTerm(null);
    }

    const handleClick = (e) => {
        if (e.currentTarget === menuBtnRef.current && activeModal !== 'menu') {
            menuBtnRef.current.classList.add(styles.menu_active);
            activeBtn = [menuBtnRef.current, 'menu'];
            handleModalOpen(e)
        }
    }

    useEffect(() => {
        searchTerm && fetchSearch(`${API_URL.locationDir}q=${searchTerm}&${API_LIMIT}&appid=${process.env.REACT_APP_API_KEY}`);
    }, [searchTerm]);

    useEffect(() => {
        if (!activeModal) {
            menuBtnRef.current.classList.remove(styles.menu_disabled);
        } else if (!activeModal && activeBtn) {
            activeBtn[0].classList.remove(styles[`${activeBtn[1]}_active`])
        } else if (activeModal === 'disabled') {
            menuBtnRef.current.classList.add(styles.menu_disabled);
        }
    }, [activeModal])

    return (
        <header className={styles.header}>
            <Container className={styles.container}>
                <Logo className={styles.logo} logoRef={logo}/>
                <p className={styles.location}>
                    <svg width='16' height='20' viewBox="0 0 100 100" role="img" aria-roledescription={`Location: ${locationText}`}>
                        <use href={`${icons}#location`} />
                    </svg>
                    {locationText}
                </p>
                <div className={styles.btn_container}>
                    <InputForm handleChange={handleChange} searchTerm={searchTerm} searchResult={searchResult} handleSelect={handleSelect} handleClear={handleClear} inputRef={inputRef} logoRef={logo} clearBtnRef={clearBtn} />
                    <svg ref={menuBtnRef} role='button' width='30' height='30' viewBox="0 0 30 30" className={styles.menu} onClick={handleClick}>
                        <use href={`${icons}#menu`} />
                    </svg>
                </div>
            </Container>
        </header>
    )
}

