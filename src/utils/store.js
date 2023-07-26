const units = {
    temp: {
        metric: '°C',
        imperial: '°F'
    },
    humidity: '%',
    pressure: {
        en: 'hPa',
        uk: 'гПа',
    },
    speed: {
        metric: {
            en: 'm/s',
            uk: 'м/с',
        },
        imperial: {
            en: 'miles/hour',
            uk: 'миль/год',
        }
    },
    gust: {
        metric: {
            en: 'meter/sec',
            uk: 'м/с',
        },
        imperial: {
            en: 'miles/hour',
            uk: 'миль/год',
        }
    },
    cloudiness: '%',
    precipitation: {
        en: 'mm',
        uk: 'мм'
    },
    visibility: {
        en: 'km of 10',
        uk: 'км з 10',
    },
    pop: '%',
}

export default units;