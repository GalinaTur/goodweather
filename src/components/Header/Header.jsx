import Container from '../Container/Container';
import styles from './Header.module.scss';
import InputForm from './InputForm/InputForm';
import icons from '../../assets/sprite.svg';
import classNames from 'classnames';

const setLocationText = (location, isPending, locText) => {
    if (!location && isPending) {
        return 'Lodaing...';
    } else if (!location && !isPending) {
        return 'No location';
    } else return locText;
}

export default function Header({ currentLocation, isPending, handleChange, handleSubmit, searchResult, handleSelect }) {

    const city = currentLocation?.[0]['name'];
    const state = currentLocation?.[0]['state'] || '';
    const country = currentLocation?.[0]['country'];
    const locText = `${city}, ${state ? state + ', ' : ''}${country}`;


    return (
        <header className={styles.header}>
            <Container className={styles.container}>
                <p id='hdrlg' className={classNames('logo', styles.logo)}>GOODWEATHER</p>
                <p className={styles.location}>
                    <svg width='16' height='20' viewBox="0 0 100 100" role="img" aria-roledescription={`Location: ${locText}`}>
                        <use href={`${icons}#location`} />
                    </svg>
                    {setLocationText(currentLocation, isPending, locText)}
                </p>
                <div className={styles.btn_container}>
                    <InputForm handleChange={handleChange} handleSubmit={handleSubmit} searchResult={searchResult} handleSelect={handleSelect} />
                    <svg role='button' width='30' height='30' viewBox="0 0 30 30" className={styles.settings}>
                        <use href={`${icons}#settings`} />
                    </svg>
                    <svg role='button' width='30' height='30' viewBox="-3 -3 30 30" className={styles.menu}>
                        <use href={`${icons}#menu`} />
                    </svg>
                </div>
            </Container>
        </header>
    )
}

