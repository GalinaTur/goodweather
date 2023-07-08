import Container from '../Container/Container';
import styles from './Header.module.scss';

export default function Header({ currentLocation }) {
const city = currentLocation?.[0]['name'];
const state = currentLocation?.[0]['state'] || '';
const country = currentLocation?.[0]['country'];

    return (
        <header className={styles.header}>

            <Container className={styles.container}>
                <p className={styles.logo}>GOODWEATHER</p>
                {!currentLocation? 'loading' :
                <p className={styles.location}>{`${city}, ${state}, ${country}`}</p>
                }
                <input className={styles.input} type='text'  />
                <button type='submit' className={styles.button}></button>
            </Container>
        </header>
    )
}

