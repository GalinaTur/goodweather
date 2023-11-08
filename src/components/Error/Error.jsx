import styles from './Error.module.scss';
import Container from '../Container/Container';

export default function Error({ error }) {

    return (
        <>
            <Container>
                <div className={styles.error}>
                    <h3>Can't get your geolocation... :(</h3>
                    <p>Please, allow access to your geolocation and refresh the page</p>
                    <p>OR</p>
                    <p>Enter the city name in the searh field (🔍)</p>
                </div>
            </Container>
        </>
    )
}

