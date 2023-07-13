import Container from '../Container/Container';
import styles from './Header.module.scss';
import InputForm from './InputForm/InputForm';

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
                <p className={styles.logo}>GOODWEATHER</p>
                <p className={styles.location}><span>{setLocationText(currentLocation, isPending, locText)}</span></p>
                <InputForm handleChange={handleChange} handleSubmit={handleSubmit} searchResult={searchResult} handleSelect={handleSelect} />
            </Container>
        </header>
    )
}

