import styles from './Datalabel.module.scss';
import icons from '../../../../assets/sprite.svg';
import classNames from 'classnames';

export default function Datalabel({elem, id, iconIdCreator, definePrecip}) {
    const time = elem? elem.dt_txt.slice(11, 16) : '';
    const temp = elem?.main.temp;
    const weather = elem?.weather[0].description;
    const partOfDay = elem?.sys.pod;
    const precipProbab = Math.round(elem?.pop*100);
    const presipType = elem.rain? "rain" : elem.snow? 'snow' : '';
    

    return !elem? 'Loading..' : (
        <div className={classNames(styles.weather, styles.weather_id)} style={{left: (132.5*id + 27)}}>
        <p>{time}</p>
            <svg width='40' height='40' viewBox="0 0 100 100" role="img" aria-roledescription="">
                <use href={`${icons}#${!elem? '' : iconIdCreator(weather, partOfDay)}`} />
            </svg>
            <p>{`${definePrecip(temp, presipType)} ${precipProbab}%`}</p>
        </div>
    )
}

