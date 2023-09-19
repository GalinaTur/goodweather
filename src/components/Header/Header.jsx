import { useEffect, useState, useRef } from 'react';
import { useFetch } from '../../useFetch';
import Container from '../Container/Container';
import styles from './Header.module.scss';
import InputForm from './InputForm/InputForm';
import icons from '../../assets/sprite.svg';
import classNames from 'classnames';

const API_LIMIT = '&limit=5';

const setLocationText = (location, isPending) => {
    if (!location && isPending) {
        return 'Loading...';
    } else if (!location && !isPending) {
        return 'No location';
    }
}

export default function Header({ currentLocation, handleChangeLocation, API_URL, inputRef }) {
    const [searchResult, isPending, error, fetchSearch] = useFetch();
    const [searchTerm, setSearchTerm] = useState(null);
    const clearBtn = useRef(null);
    const logo = useRef(null);

    const city = currentLocation?.[0]['name'];
    const state = currentLocation?.[0]['state'] || '';
    const country = currentLocation?.[0]['country'];
    const locText = currentLocation && `${city}${state ? ', ' + state : ''}${country ? ', ' + country : ''}`;

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

    useEffect(() => {
        searchTerm && fetchSearch(`${API_URL.locationDir}q=${searchTerm}&${API_LIMIT}&appid=${process.env.REACT_APP_API_KEY}`);
    }, [searchTerm])

    return (
        <header className={styles.header}>
            <Container className={styles.container}>
                <p ref={logo} className={classNames(styles.logo)}>GOODWEATHER</p>
                <p className={styles.location}>
                    <svg width='16' height='20' viewBox="0 0 100 100" role="img" aria-roledescription={`Location: ${locText}`}>
                        <use href={`${icons}#location`} />
                    </svg>
                    {locText || setLocationText(currentLocation, isPending)}
                </p>
                <div className={styles.btn_container}>
                    <InputForm handleChange={handleChange} searchTerm={searchTerm} searchResult={searchResult} handleSelect={handleSelect} handleClear={handleClear} inputRef={inputRef} logoRef={logo} clearBtnRef={clearBtn}/>
                    <svg role='button' width='30' height='30' viewBox="0 0 30 30" className={styles.settings}>
                        <use href={`${icons}#settings`} />
                    </svg>
                    <svg role='button' width='30' height='30' viewBox="0 0 30 30" className={styles.menu}>
                        <use href={`${icons}#menu`} />
                    </svg>
                </div>
            </Container>
        </header>
    )
}

