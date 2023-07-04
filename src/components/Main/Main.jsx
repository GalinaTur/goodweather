import Container from '../Container/Container';
import ChartBlock from './ChartBlock/ChartBlock';
import CurrentWeather from './CurrentWeather/CurrentWeather';
import styles from './Main.module.scss';
import TableBlock from './TableBlock/TableBlock';

export default function Main() {

    return (
        <main className={styles.main}>
            <Container className={styles.container}>
                    <CurrentWeather />
                    <ChartBlock/>
                    <TableBlock/>
            </Container>
        </main>
    )
}

