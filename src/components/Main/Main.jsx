import { useState, useEffect } from 'react';
import Container from '../Container/Container';
import ChartBlock from './ChartBlock/ChartBlock';
import CurrentWeather from './CurrentWeather/CurrentWeather';
import styles from './Main.module.scss';
import TableBlock from './TableBlock/TableBlock';

let dateTime = new Date();

const formatDate=(date)=> {
    let oldDate = date.toDateString();
    let newDate = `${oldDate.slice(0,3)} - ${oldDate.slice(4,10)}, ${oldDate.slice(11)}`;
    return newDate;
}

const formatTime=(time)=> {
    let oldTime = time.toTimeString();
    let newTime = oldTime.slice(0,5);
    return newTime;
}

export default function Main({currentWeather}) {
    const [date, setDate] = useState(formatDate(dateTime));
    const [time, setTime] = useState(formatTime(dateTime));
    const [timeOfDay, setTimeOfDay] = useState();

    useEffect(()=> {
        let dateTime;
        setInterval(()=> {
            dateTime = new Date();
            setDate(formatDate(dateTime));
            setTime(formatTime(dateTime));
        }, 60000);
    },[]);

    return (
        <main className={styles.main}>
            <Container className={styles.container}>
                    <CurrentWeather currentWeather={currentWeather} date={date} time={time}/>
                    <ChartBlock/>
                    <TableBlock/>
            </Container>
        </main>
    )
}

