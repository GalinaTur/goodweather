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
    qualitativeNames: ['Good', 'Moderate', 'Unhealthy for sensitive groups', 'Unhealthy', 'Very unhealthy', 'Hazardous'],
    colors: ['#008000', '#FFFF00', '#FFA500', '#FF0000', '#800080', '#800000'],
    messages: ['Air quality is satisfactory, and air pollution poses little or no risk. Enjoy your usual outdoor activities.',
        'Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.',
        'Members of sensitive groups may experience health effects. The general public is less likely to be affected.',
        'Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.',
        'Health alert: The risk of health effects is increased for everyone.',
        'Health warning of emergency conditions: everyone is more likely to be affected.'],
    aqi: [0, 50, 100, 150, 200, 300, 500],
    so2: {
        full: 'Sulphur dioxide',
        ranges: [0, 91.7, 196.5, 484.7, 796.5, 1582.5, 2106.48, 2630.5],

    },
    no2: {
        ranges: [0, 99.6, 188, 676.8, 1220.1, 2348.1, 3100, 3852.1],
        full: 'Nitrogen dioxide',
    },
    pm10: {
        ranges: [0, 54, 154, 254, 354, 424, 504, 604],
        full: 'Particulate matter < 10 μms',
    },
    pm2_5: {
        // ranges: [0, 10, 25, 50, 75],
        ranges: [0, 12.0, 35.4, 55.4, 150.4, 250.4, 350.4, 500.5],
        full: 'Particulate matter < 2.5 μms',
    },
    o3: {
        ranges: [0, 105.8, 137.2, 205.8, 392, 791.8, 987.8, 1183,8],
        full: 'Ozone',
    },
    co: {
        ranges: [0, 4400, 9400, 12400, 15400, 30400, 40400, 50400],
        full: 'Carbon monoxide',
    },
    nh3: {
        ranges: [0, 200, 250, 350, 400, 500],
        full: 'Ammonia',
    },
    no: {
        ranges: [0, 200, 250, 350, 400, 500],
        full: 'Nitrogen monoxide',
    },
}

export { units, airComponentsRanges };