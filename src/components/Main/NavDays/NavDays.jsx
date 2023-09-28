import styles from './NavDays.module.scss';
import icons from '../../../assets/sprite.svg';
import { NavLink, Link, } from 'react-router-dom';

export default function NavDays({ data }) {

    return data && (
        <>
            <nav className={styles.navigation}>
                <Link to={`../main`} className={styles.back}>
                    <svg width='30' height='30' viewBox="0 0 100 100" role="img" aria-label="back to main page">
                        <use href={`${icons}#back`} />
                    </svg>
                </Link>
                <NavLink to={`today`} className={({ isActive }) => isActive ? styles.active : styles.navlink}>Today</NavLink>
                {Object.entries(data).map(([key, value], id) => {
                    if (value.length < 8 && id === 0) return;
                    return <NavLink to={`${key}`} key={id} className={({ isActive }) => isActive ? styles.active : styles.navlink}>{key}</NavLink>
                })}
            </nav>
        </>
    )
}

