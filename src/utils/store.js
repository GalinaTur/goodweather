const units = {
    temp: {
        metric: '°C',
        imperial: '°F'
    },
    humidity: '%',
    pressure: {
        en: 'mmHg',
        uk: 'мм рт. ст.',
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
            en: 'm/s',
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
        en: 'km of\u00a010',
        uk: 'км з\u00a010',
    },
    pop: '%',
    airPollutants: 'µg/m3',
}

const airComponentsRanges = {
    qualitativeNames: ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'],
    colors: ['#CCFFCC', '#009900', '#FF9900', '#FF0000', '#870000'],
    messages: ['Enjoy your usual outdoor activities.',
        'Enjoy your usual outdoor activities.',
        'Anyone experiencing discomfort such as sore eyes, cough or sore throat should consider reducing activity, particularly outdoors.',
        'Reduce physical exertion, particularly outdoors, especially if you experience symptoms such as cough or sore throat.'],
    aqi: [1, 2, 3, 4, 5],
    so2: {
        ranges: [0, 20, 80, 250, 350],
        full: 'Sulphur dioxide',
    },
    no2: {
        ranges: [0, 40, 70, 150, 200],
        full: 'Nitrogen dioxide',
    },
    pm10: {
        ranges: [0, 20, 50, 100, 200],
        full: 'Particulate matter less than 10 microns',
    },
    pm2_5: {
        ranges: [0, 10, 25, 50, 75],
        full: 'Particulate matter less than 2.5 microns',
    },
    o3: {
        ranges: [0, 60, 100, 140, 180],
        full: 'Ozone',
    },
    co: {
        ranges: [0, 4400, 9400, 12400, 15400],
        full: 'Carbon monoxide',
    },
    nh3: {
        ranges: [0, 50, 100, 150, 200],
        full: 'Ammonia',
    },
    no: {
        ranges: [0, 25, 50, 75, 100],
        full: 'Nitrogen monoxide',
    },
}

export { units, airComponentsRanges };