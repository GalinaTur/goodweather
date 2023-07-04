import { useEffect } from 'react';
import Container from '../Container/Container';
import styles from './Header.module.scss';

export default function Header({ currentLocation }) {

    return (
        <header className={styles.header}>
            <Container className={styles.container}>
                <p className={styles.logo}>GOODWEATHER</p>
                <p className={styles.location}>{currentLocation? `${currentLocation[0]}, ${currentLocation[1]}` : 'Loading...'}</p>
                <input className={styles.input} type='text'  />
                <button type='submit' className={styles.button}></button>
            </Container>
        </header>
    )
}

