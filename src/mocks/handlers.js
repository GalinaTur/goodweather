import { rest } from 'msw';

const API_URL = {
    weather: "https://api.openweathermap.org/data/2.5/weather",
    forecast: "https://api.openweathermap.org/data/2.5/forecast",
    locationDir: "http://api.openweathermap.org/geo/1.0/direct",
    locationRev: "https://api.openweathermap.org/geo/1.0/reverse",
    airPollution: "http://api.openweathermap.org/data/2.5/air_pollution"
};

export const handlers = [
    rest.get('https://api.openweathermap.org/data/2.5/weather', (req, res, ctx) => {
        return res(ctx.status(200),
            ctx.json({
                "coord": {
                    "lon": 10.99,
                    "lat": 44.34
                },
                "weather": [
                    {
                        "id": 501,
                        "main": "Rain",
                        "description": "good weather test",
                        "icon": "10d"
                    }
                ],
                "base": "stations",
                "main": {
                    "temp": 598.48,
                    "feels_like": 888.88,
                    "temp_min": 297.56,
                    "temp_max": 300.05,
                    "pressure": 1015,
                    "humidity": 64,
                    "sea_level": 1015,
                    "grnd_level": 933
                },
                "visibility": 10000,
                "wind": {
                    "speed": 0.62,
                    "deg": 349,
                    "gust": 1.18
                },
                "rain": {
                    "1h": 3.16
                },
                "clouds": {
                    "all": 100
                },
                "dt": 1661870592,
                "sys": {
                    "type": 2,
                    "id": 2075663,
                    "country": "IT",
                    "sunrise": 1661834187,
                    "sunset": 1661882248
                },
                "timezone": 7200,
                "id": 3163858,
                "name": "Zocca",
                "cod": 200
            }))
    }),
    rest.get('https://api.openweathermap.org/data/2.5/forecast', (req, res, ctx) => {
        return res(ctx.status(200),
            ctx.json({
                "cod": "200",
                "message": 0,
                "cnt": 40,
                "list": [
                    {
                        "dt": 1692824400,
                        "main": {
                            "temp": 296.04,
                            "feels_like": 296,
                            "temp_min": 294.61,
                            "temp_max": 296.04,
                            "pressure": 1017,
                            "sea_level": 1017,
                            "grnd_level": 1015,
                            "humidity": 62,
                            "temp_kf": 1.43
                        },
                        "weather": [
                            {
                                "id": 802,
                                "main": "Clouds",
                                "description": "test weather",
                                "icon": "03n"
                            }
                        ],
                        "clouds": {
                            "all": 33
                        },
                        "wind": {
                            "speed": 1.5,
                            "deg": 193,
                            "gust": 2.69
                        },
                        "visibility": 10000,
                        "pop": 0,
                        "sys": {
                            "pod": "n"
                        },
                        "dt_txt": "2023-08-23 21:00:00"
                    },
                    {
                        "dt": 1692835200,
                        "main": {
                            "temp": 294,
                            "feels_like": 293.79,
                            "temp_min": 292.62,
                            "temp_max": 294,
                            "pressure": 1016,
                            "sea_level": 1016,
                            "grnd_level": 1014,
                            "humidity": 63,
                            "temp_kf": 1.38
                        },
                        "weather": [
                            {
                                "id": 803,
                                "main": "Clouds",
                                "description": "scattered clouds",
                                "icon": "04n"
                            }
                        ],
                        "clouds": {
                            "all": 54
                        },
                        "wind": {
                            "speed": 1.43,
                            "deg": 139,
                            "gust": 2.92
                        },
                        "visibility": 10000,
                        "pop": 0,
                        "sys": {
                            "pod": "n"
                        },
                        "dt_txt": "2023-08-24 00:00:00"
                    },
                    {
                        "dt": 1692846000,
                        "main": {
                            "temp": 292.33,
                            "feels_like": 291.82,
                            "temp_min": 292.33,
                            "temp_max": 292.33,
                            "pressure": 1015,
                            "sea_level": 1015,
                            "grnd_level": 1013,
                            "humidity": 58,
                            "temp_kf": 0
                        },
                        "weather": [
                            {
                                "id": 803,
                                "main": "Clouds",
                                "description": "broken clouds",
                                "icon": "04n"
                            }
                        ],
                        "clouds": {
                            "all": 67
                        },
                        "wind": {
                            "speed": 1.2,
                            "deg": 267,
                            "gust": 2.6
                        },
                        "visibility": 10000,
                        "pop": 0.31,
                        "sys": {
                            "pod": "n"
                        },
                        "dt_txt": "2023-08-24 03:00:00"
                    },
                    {
                        "dt": 1692856800,
                        "main": {
                            "temp": 292.35,
                            "feels_like": 291.89,
                            "temp_min": 292.35,
                            "temp_max": 292.35,
                            "pressure": 1013,
                            "sea_level": 1013,
                            "grnd_level": 1011,
                            "humidity": 60,
                            "temp_kf": 0
                        },
                        "weather": [
                            {
                                "id": 500,
                                "main": "Rain",
                                "description": "light rain",
                                "icon": "10d"
                            }
                        ],
                        "clouds": {
                            "all": 84
                        },
                        "wind": {
                            "speed": 1.15,
                            "deg": 136,
                            "gust": 1.28
                        },
                        "visibility": 10000,
                        "pop": 0.39,
                        "rain": {
                            "3h": 0.27
                        },
                        "sys": {
                            "pod": "d"
                        },
                        "dt_txt": "2023-08-24 06:00:00"
                    },
                    {
                        "dt": 1692867600,
                        "main": {
                            "temp": 292.26,
                            "feels_like": 292,
                            "temp_min": 292.26,
                            "temp_max": 292.26,
                            "pressure": 1013,
                            "sea_level": 1013,
                            "grnd_level": 1011,
                            "humidity": 68,
                            "temp_kf": 0
                        },
                        "weather": [
                            {
                                "id": 500,
                                "main": "Rain",
                                "description": "light rain",
                                "icon": "10d"
                            }
                        ],
                        "clouds": {
                            "all": 100
                        },
                        "wind": {
                            "speed": 0.7,
                            "deg": 140,
                            "gust": 1.31
                        },
                        "visibility": 10000,
                        "pop": 0.94,
                        "rain": {
                            "3h": 0.59
                        },
                        "sys": {
                            "pod": "d"
                        },
                        "dt_txt": "2023-08-24 09:00:00"
                    },
                    {
                        "dt": 1692878400,
                        "main": {
                            "temp": 292.98,
                            "feels_like": 292.9,
                            "temp_min": 292.98,
                            "temp_max": 292.98,
                            "pressure": 1012,
                            "sea_level": 1012,
                            "grnd_level": 1010,
                            "humidity": 72,
                            "temp_kf": 0
                        },
                        "weather": [
                            {
                                "id": 500,
                                "main": "Rain",
                                "description": "light rain",
                                "icon": "10d"
                            }
                        ],
                        "clouds": {
                            "all": 100
                        },
                        "wind": {
                            "speed": 0.67,
                            "deg": 332,
                            "gust": 0.87
                        },
                        "visibility": 10000,
                        "pop": 0.78,
                        "rain": {
                            "3h": 0.49
                        },
                        "sys": {
                            "pod": "d"
                        },
                        "dt_txt": "2023-08-24 12:00:00"
                    },
                    {
                        "dt": 1692889200,
                        "main": {
                            "temp": 296.4,
                            "feels_like": 296.37,
                            "temp_min": 296.4,
                            "temp_max": 296.4,
                            "pressure": 1010,
                            "sea_level": 1010,
                            "grnd_level": 1008,
                            "humidity": 61,
                            "temp_kf": 0
                        },
                        "weather": [
                            {
                                "id": 500,
                                "main": "Rain",
                                "description": "light rain",
                                "icon": "10d"
                            }
                        ],
                        "clouds": {
                            "all": 98
                        },
                        "wind": {
                            "speed": 1.92,
                            "deg": 295,
                            "gust": 3.35
                        },
                        "visibility": 8657,
                        "pop": 0.68,
                        "rain": {
                            "3h": 0.91
                        },
                        "sys": {
                            "pod": "d"
                        },
                        "dt_txt": "2023-08-24 15:00:00"
                    },
                    {
                        "dt": 1692900000,
                        "main": {
                            "temp": 294.05,
                            "feels_like": 294.23,
                            "temp_min": 294.05,
                            "temp_max": 294.05,
                            "pressure": 1010,
                            "sea_level": 1010,
                            "grnd_level": 1008,
                            "humidity": 78,
                            "temp_kf": 0
                        },
                        "weather": [
                            {
                                "id": 500,
                                "main": "Rain",
                                "description": "light rain",
                                "icon": "10d"
                            }
                        ],
                        "clouds": {
                            "all": 99
                        },
                        "wind": {
                            "speed": 1.45,
                            "deg": 290,
                            "gust": 2.75
                        },
                        "visibility": 10000,
                        "pop": 0.79,
                        "rain": {
                            "3h": 1.43
                        },
                        "sys": {
                            "pod": "d"
                        },
                        "dt_txt": "2023-08-24 18:00:00"
                    },
                    {
                        "dt": 1692921600,
                        "main": {
                            "temp": 291.89,
                            "feels_like": 291.93,
                            "temp_min": 291.89,
                            "temp_max": 291.89,
                            "pressure": 1010,
                            "sea_level": 1010,
                            "grnd_level": 1008,
                            "humidity": 81,
                            "temp_kf": 0
                        },
                        "weather": [
                            {
                                "id": 803,
                                "main": "Clouds",
                                "description": "bad weather",
                                "icon": "04n"
                            }
                        ],
                        "clouds": {
                            "all": 76
                        },
                        "wind": {
                            "speed": 1.58,
                            "deg": 316,
                            "gust": 2.49
                        },
                        "visibility": 10000,
                        "pop": 0,
                        "sys": {
                            "pod": "g"
                        },
                        "dt_txt": "2023-08-24 21:00:00"
                    },
                    {
                        "dt": 1692921600,
                        "main": {
                            "temp": 290.53,
                            "feels_like": 290.54,
                            "temp_min": 290.53,
                            "temp_max": 290.53,
                            "pressure": 1010,
                            "sea_level": 1010,
                            "grnd_level": 1008,
                            "humidity": 85,
                            "temp_kf": 0
                        },
                        "weather": [
                            {
                                "id": 803,
                                "main": "Clouds",
                                "description": "broken clouds",
                                "icon": "04n"
                            }
                        ],
                        "clouds": {
                            "all": 65
                        },
                        "wind": {
                            "speed": 1.41,
                            "deg": 333,
                            "gust": 2.28
                        },
                        "visibility": 10000,
                        "pop": 0,
                        "sys": {
                            "pod": "n"
                        },
                        "dt_txt": "2023-08-25 00:00:00"
                    },
                    {
                        "dt": 1692932400,
                        "main": {
                            "temp": 289.12,
                            "feels_like": 288.76,
                            "temp_min": 289.12,
                            "temp_max": 289.12,
                            "pressure": 1010,
                            "sea_level": 1010,
                            "grnd_level": 1008,
                            "humidity": 76,
                            "temp_kf": 0
                        },
                        "weather": [
                            {
                                "id": 804,
                                "main": "Clouds",
                                "description": "overcast clouds",
                                "icon": "04n"
                            }
                        ],
                        "clouds": {
                            "all": 100
                        },
                        "wind": {
                            "speed": 2.77,
                            "deg": 342,
                            "gust": 5.28
                        },
                        "visibility": 10000,
                        "pop": 0,
                        "sys": {
                            "pod": "n"
                        },
                        "dt_txt": "2023-08-25 03:00:00"
                    },
                    {
                        "dt": 1692943200,
                        "main": {
                            "temp": 289.03,
                            "feels_like": 288.32,
                            "temp_min": 289.03,
                            "temp_max": 289.03,
                            "pressure": 1010,
                            "sea_level": 1010,
                            "grnd_level": 1008,
                            "humidity": 63,
                            "temp_kf": 0
                        },
                        "weather": [
                            {
                                "id": 804,
                                "main": "Clouds",
                                "description": "overcast clouds",
                                "icon": "04d"
                            }
                        ],
                        "clouds": {
                            "all": 100
                        },
                        "wind": {
                            "speed": 2.37,
                            "deg": 339,
                            "gust": 3.82
                        },
                        "visibility": 10000,
                        "pop": 0,
                        "sys": {
                            "pod": "d"
                        },
                        "dt_txt": "2023-08-25 06:00:00"
                    },
                    {
                        "dt": 1692954000,
                        "main": {
                            "temp": 291.33,
                            "feels_like": 290.46,
                            "temp_min": 291.33,
                            "temp_max": 291.33,
                            "pressure": 1010,
                            "sea_level": 1010,
                            "grnd_level": 1008,
                            "humidity": 48,
                            "temp_kf": 0
                        },
                        "weather": [
                            {
                                "id": 802,
                                "main": "Clouds",
                                "description": "scattered clouds",
                                "icon": "03d"
                            }
                        ],
                        "clouds": {
                            "all": 50
                        },
                        "wind": {
                            "speed": 2.51,
                            "deg": 305,
                            "gust": 2.92
                        },
                        "visibility": 10000,
                        "pop": 0,
                        "sys": {
                            "pod": "d"
                        },
                        "dt_txt": "2023-08-25 09:00:00"
                    },
                    {
                        "dt": 1692964800,
                        "main": {
                            "temp": 293.28,
                            "feels_like": 292.39,
                            "temp_min": 293.28,
                            "temp_max": 293.28,
                            "pressure": 1010,
                            "sea_level": 1010,
                            "grnd_level": 1009,
                            "humidity": 40,
                            "temp_kf": 0
                        },
                        "weather": [
                            {
                                "id": 803,
                                "main": "Clouds",
                                "description": "broken clouds",
                                "icon": "04d"
                            }
                        ],
                        "clouds": {
                            "all": 72
                        },
                        "wind": {
                            "speed": 3.6,
                            "deg": 267,
                            "gust": 4.43
                        },
                        "visibility": 10000,
                        "pop": 0,
                        "sys": {
                            "pod": "d"
                        },
                        "dt_txt": "2023-08-25 12:00:00"
                    },
                    {
                        "dt": 1692975600,
                        "main": {
                            "temp": 295.03,
                            "feels_like": 294.21,
                            "temp_min": 295.03,
                            "temp_max": 295.03,
                            "pressure": 1009,
                            "sea_level": 1009,
                            "grnd_level": 1007,
                            "humidity": 36,
                            "temp_kf": 0
                        },
                        "weather": [
                            {
                                "id": 804,
                                "main": "Clouds",
                                "description": "overcast clouds",
                                "icon": "04d"
                            }
                        ],
                        "clouds": {
                            "all": 98
                        },
                        "wind": {
                            "speed": 4.19,
                            "deg": 251,
                            "gust": 5.86
                        },
                        "visibility": 10000,
                        "pop": 0.01,
                        "sys": {
                            "pod": "d"
                        },
                        "dt_txt": "2023-08-25 15:00:00"
                    },
                    {
                        "dt": 1692986400,
                        "main": {
                            "temp": 292.07,
                            "feels_like": 291.48,
                            "temp_min": 292.07,
                            "temp_max": 292.07,
                            "pressure": 1009,
                            "sea_level": 1009,
                            "grnd_level": 1007,
                            "humidity": 56,
                            "temp_kf": 0
                        },
                        "weather": [
                            {
                                "id": 803,
                                "main": "Clouds",
                                "description": "broken clouds",
                                "icon": "04d"
                            }
                        ],
                        "clouds": {
                            "all": 81
                        },
                        "wind": {
                            "speed": 5.22,
                            "deg": 236,
                            "gust": 7.57
                        },
                        "visibility": 10000,
                        "pop": 0.2,
                        "sys": {
                            "pod": "d"
                        },
                        "dt_txt": "2023-08-25 18:00:00"
                    },
                    {
                        "dt": 1692997200,
                        "main": {
                            "temp": 288.88,
                            "feels_like": 288.52,
                            "temp_min": 288.88,
                            "temp_max": 288.88,
                            "pressure": 1010,
                            "sea_level": 1010,
                            "grnd_level": 1008,
                            "humidity": 77,
                            "temp_kf": 0
                        },
                        "weather": [
                            {
                                "id": 500,
                                "main": "Rain",
                                "description": "light rain",
                                "icon": "10n"
                            }
                        ],
                        "clouds": {
                            "all": 17
                        },
                        "wind": {
                            "speed": 4.11,
                            "deg": 238,
                            "gust": 8.8
                        },
                        "visibility": 10000,
                        "pop": 0.25,
                        "rain": {
                            "3h": 0.38
                        },
                        "sys": {
                            "pod": "n"
                        },
                        "dt_txt": "2023-08-25 21:00:00"
                    },
                    {
                        "dt": 1693008000,
                        "main": {
                            "temp": 287.35,
                            "feels_like": 287.05,
                            "temp_min": 287.35,
                            "temp_max": 287.35,
                            "pressure": 1010,
                            "sea_level": 1010,
                            "grnd_level": 1008,
                            "humidity": 85,
                            "temp_kf": 0
                        },
                        "weather": [
                            {
                                "id": 801,
                                "main": "Clouds",
                                "description": "few clouds",
                                "icon": "02n"
                            }
                        ],
                        "clouds": {
                            "all": 14
                        },
                        "wind": {
                            "speed": 2.94,
                            "deg": 237,
                            "gust": 6.83
                        },
                        "visibility": 10000,
                        "pop": 0.17,
                        "sys": {
                            "pod": "n"
                        },
                        "dt_txt": "2023-08-26 00:00:00"
                    },
                    {
                        "dt": 1693018800,
                        "main": {
                            "temp": 286.23,
                            "feels_like": 285.81,
                            "temp_min": 286.23,
                            "temp_max": 286.23,
                            "pressure": 1009,
                            "sea_level": 1009,
                            "grnd_level": 1007,
                            "humidity": 85,
                            "temp_kf": 0
                        },
                        "weather": [
                            {
                                "id": 800,
                                "main": "Clear",
                                "description": "clear sky",
                                "icon": "01n"
                            }
                        ],
                        "clouds": {
                            "all": 10
                        },
                        "wind": {
                            "speed": 2.74,
                            "deg": 235,
                            "gust": 6.55
                        },
                        "visibility": 10000,
                        "pop": 0.03,
                        "sys": {
                            "pod": "n"
                        },
                        "dt_txt": "2023-08-26 03:00:00"
                    },
                    {
                        "dt": 1693029600,
                        "main": {
                            "temp": 286.03,
                            "feels_like": 285.57,
                            "temp_min": 286.03,
                            "temp_max": 286.03,
                            "pressure": 1009,
                            "sea_level": 1009,
                            "grnd_level": 1007,
                            "humidity": 84,
                            "temp_kf": 0
                        },
                        "weather": [
                            {
                                "id": 801,
                                "main": "Clouds",
                                "description": "few clouds",
                                "icon": "02d"
                            }
                        ],
                        "clouds": {
                            "all": 18
                        },
                        "wind": {
                            "speed": 2.76,
                            "deg": 232,
                            "gust": 6.62
                        },
                        "visibility": 10000,
                        "pop": 0.03,
                        "sys": {
                            "pod": "d"
                        },
                        "dt_txt": "2023-08-26 06:00:00"
                    },
                    {
                        "dt": 1693040400,
                        "main": {
                            "temp": 290.59,
                            "feels_like": 290.01,
                            "temp_min": 290.59,
                            "temp_max": 290.59,
                            "pressure": 1010,
                            "sea_level": 1010,
                            "grnd_level": 1008,
                            "humidity": 62,
                            "temp_kf": 0
                        },
                        "weather": [
                            {
                                "id": 801,
                                "main": "Clouds",
                                "description": "few clouds",
                                "icon": "02d"
                            }
                        ],
                        "clouds": {
                            "all": 16
                        },
                        "wind": {
                            "speed": 3.6,
                            "deg": 249,
                            "gust": 5.38
                        },
                        "visibility": 10000,
                        "pop": 0.15,
                        "sys": {
                            "pod": "d"
                        },
                        "dt_txt": "2023-08-26 09:00:00"
                    },
                    {
                        "dt": 1693051200,
                        "main": {
                            "temp": 292.73,
                            "feels_like": 292.02,
                            "temp_min": 292.73,
                            "temp_max": 292.73,
                            "pressure": 1009,
                            "sea_level": 1009,
                            "grnd_level": 1008,
                            "humidity": 49,
                            "temp_kf": 0
                        },
                        "weather": [
                            {
                                "id": 500,
                                "main": "Rain",
                                "description": "light rain",
                                "icon": "10d"
                            }
                        ],
                        "clouds": {
                            "all": 43
                        },
                        "wind": {
                            "speed": 3.97,
                            "deg": 261,
                            "gust": 5.7
                        },
                        "visibility": 10000,
                        "pop": 0.39,
                        "rain": {
                            "3h": 0.33
                        },
                        "sys": {
                            "pod": "d"
                        },
                        "dt_txt": "2023-08-26 12:00:00"
                    },
                    {
                        "dt": 1693062000,
                        "main": {
                            "temp": 292.29,
                            "feels_like": 291.59,
                            "temp_min": 292.29,
                            "temp_max": 292.29,
                            "pressure": 1009,
                            "sea_level": 1009,
                            "grnd_level": 1008,
                            "humidity": 51,
                            "temp_kf": 0
                        },
                        "weather": [
                            {
                                "id": 500,
                                "main": "Rain",
                                "description": "light rain",
                                "icon": "10d"
                            }
                        ],
                        "clouds": {
                            "all": 100
                        },
                        "wind": {
                            "speed": 3.91,
                            "deg": 270,
                            "gust": 5.03
                        },
                        "visibility": 10000,
                        "pop": 0.42,
                        "rain": {
                            "3h": 0.13
                        },
                        "sys": {
                            "pod": "d"
                        },
                        "dt_txt": "2023-08-26 15:00:00"
                    },
                    {
                        "dt": 1693072800,
                        "main": {
                            "temp": 291.31,
                            "feels_like": 290.59,
                            "temp_min": 291.31,
                            "temp_max": 291.31,
                            "pressure": 1010,
                            "sea_level": 1010,
                            "grnd_level": 1008,
                            "humidity": 54,
                            "temp_kf": 0
                        },
                        "weather": [
                            {
                                "id": 500,
                                "main": "Rain",
                                "description": "light rain",
                                "icon": "10d"
                            }
                        ],
                        "clouds": {
                            "all": 100
                        },
                        "wind": {
                            "speed": 3.55,
                            "deg": 279,
                            "gust": 5.1
                        },
                        "visibility": 10000,
                        "pop": 0.43,
                        "rain": {
                            "3h": 0.14
                        },
                        "sys": {
                            "pod": "d"
                        },
                        "dt_txt": "2023-08-26 18:00:00"
                    },
                    {
                        "dt": 1693083600,
                        "main": {
                            "temp": 288.97,
                            "feels_like": 288.33,
                            "temp_min": 288.97,
                            "temp_max": 288.97,
                            "pressure": 1011,
                            "sea_level": 1011,
                            "grnd_level": 1009,
                            "humidity": 66,
                            "temp_kf": 0
                        },
                        "weather": [
                            {
                                "id": 804,
                                "main": "Clouds",
                                "description": "overcast clouds",
                                "icon": "04n"
                            }
                        ],
                        "clouds": {
                            "all": 97
                        },
                        "wind": {
                            "speed": 2.41,
                            "deg": 287,
                            "gust": 4.66
                        },
                        "visibility": 10000,
                        "pop": 0.07,
                        "sys": {
                            "pod": "n"
                        },
                        "dt_txt": "2023-08-26 21:00:00"
                    },
                    {
                        "dt": 1693094400,
                        "main": {
                            "temp": 287.27,
                            "feels_like": 286.64,
                            "temp_min": 287.27,
                            "temp_max": 287.27,
                            "pressure": 1012,
                            "sea_level": 1012,
                            "grnd_level": 1010,
                            "humidity": 73,
                            "temp_kf": 0
                        },
                        "weather": [
                            {
                                "id": 803,
                                "main": "Clouds",
                                "description": "broken clouds",
                                "icon": "04n"
                            }
                        ],
                        "clouds": {
                            "all": 71
                        },
                        "wind": {
                            "speed": 2.08,
                            "deg": 282,
                            "gust": 4.66
                        },
                        "visibility": 10000,
                        "pop": 0.04,
                        "sys": {
                            "pod": "n"
                        },
                        "dt_txt": "2023-08-27 00:00:00"
                    },
                    {
                        "dt": 1693105200,
                        "main": {
                            "temp": 285.9,
                            "feels_like": 285.35,
                            "temp_min": 285.9,
                            "temp_max": 285.9,
                            "pressure": 1012,
                            "sea_level": 1012,
                            "grnd_level": 1010,
                            "humidity": 81,
                            "temp_kf": 0
                        },
                        "weather": [
                            {
                                "id": 800,
                                "main": "Clear",
                                "description": "clear sky",
                                "icon": "01n"
                            }
                        ],
                        "clouds": {
                            "all": 9
                        },
                        "wind": {
                            "speed": 2.1,
                            "deg": 270,
                            "gust": 3.99
                        },
                        "visibility": 10000,
                        "pop": 0,
                        "sys": {
                            "pod": "n"
                        },
                        "dt_txt": "2023-08-27 03:00:00"
                    },
                    {
                        "dt": 1693116000,
                        "main": {
                            "temp": 285.33,
                            "feels_like": 284.8,
                            "temp_min": 285.33,
                            "temp_max": 285.33,
                            "pressure": 1013,
                            "sea_level": 1013,
                            "grnd_level": 1011,
                            "humidity": 84,
                            "temp_kf": 0
                        },
                        "weather": [
                            {
                                "id": 800,
                                "main": "Clear",
                                "description": "clear sky",
                                "icon": "01d"
                            }
                        ],
                        "clouds": {
                            "all": 5
                        },
                        "wind": {
                            "speed": 2.41,
                            "deg": 284,
                            "gust": 4.29
                        },
                        "visibility": 10000,
                        "pop": 0,
                        "sys": {
                            "pod": "d"
                        },
                        "dt_txt": "2023-08-27 06:00:00"
                    },
                    {
                        "dt": 1693126800,
                        "main": {
                            "temp": 289.5,
                            "feels_like": 288.86,
                            "temp_min": 289.5,
                            "temp_max": 289.5,
                            "pressure": 1013,
                            "sea_level": 1013,
                            "grnd_level": 1012,
                            "humidity": 64,
                            "temp_kf": 0
                        },
                        "weather": [
                            {
                                "id": 801,
                                "main": "Clouds",
                                "description": "few clouds",
                                "icon": "02d"
                            }
                        ],
                        "clouds": {
                            "all": 15
                        },
                        "wind": {
                            "speed": 3.12,
                            "deg": 323,
                            "gust": 4.48
                        },
                        "visibility": 10000,
                        "pop": 0,
                        "sys": {
                            "pod": "d"
                        },
                        "dt_txt": "2023-08-27 09:00:00"
                    },
                    {
                        "dt": 1693137600,
                        "main": {
                            "temp": 293.45,
                            "feels_like": 292.76,
                            "temp_min": 293.45,
                            "temp_max": 293.45,
                            "pressure": 1014,
                            "sea_level": 1014,
                            "grnd_level": 1012,
                            "humidity": 47,
                            "temp_kf": 0
                        },
                        "weather": [
                            {
                                "id": 802,
                                "main": "Clouds",
                                "description": "scattered clouds",
                                "icon": "03d"
                            }
                        ],
                        "clouds": {
                            "all": 25
                        },
                        "wind": {
                            "speed": 3.98,
                            "deg": 307,
                            "gust": 4.98
                        },
                        "visibility": 10000,
                        "pop": 0,
                        "sys": {
                            "pod": "d"
                        },
                        "dt_txt": "2023-08-27 12:00:00"
                    },
                    {
                        "dt": 1693148400,
                        "main": {
                            "temp": 292.4,
                            "feels_like": 291.61,
                            "temp_min": 292.4,
                            "temp_max": 292.4,
                            "pressure": 1014,
                            "sea_level": 1014,
                            "grnd_level": 1012,
                            "humidity": 47,
                            "temp_kf": 0
                        },
                        "weather": [
                            {
                                "id": 804,
                                "main": "Clouds",
                                "description": "overcast clouds",
                                "icon": "04d"
                            }
                        ],
                        "clouds": {
                            "all": 92
                        },
                        "wind": {
                            "speed": 3.97,
                            "deg": 314,
                            "gust": 5.46
                        },
                        "visibility": 10000,
                        "pop": 0,
                        "sys": {
                            "pod": "d"
                        },
                        "dt_txt": "2023-08-27 15:00:00"
                    },
                    {
                        "dt": 1693159200,
                        "main": {
                            "temp": 291.26,
                            "feels_like": 290.51,
                            "temp_min": 291.26,
                            "temp_max": 291.26,
                            "pressure": 1015,
                            "sea_level": 1015,
                            "grnd_level": 1013,
                            "humidity": 53,
                            "temp_kf": 0
                        },
                        "weather": [
                            {
                                "id": 804,
                                "main": "Clouds",
                                "description": "overcast clouds",
                                "icon": "04d"
                            }
                        ],
                        "clouds": {
                            "all": 88
                        },
                        "wind": {
                            "speed": 3.9,
                            "deg": 303,
                            "gust": 5.45
                        },
                        "visibility": 10000,
                        "pop": 0,
                        "sys": {
                            "pod": "d"
                        },
                        "dt_txt": "2023-08-27 18:00:00"
                    },
                    {
                        "dt": 1693170000,
                        "main": {
                            "temp": 288.82,
                            "feels_like": 288.14,
                            "temp_min": 288.82,
                            "temp_max": 288.82,
                            "pressure": 1016,
                            "sea_level": 1016,
                            "grnd_level": 1014,
                            "humidity": 65,
                            "temp_kf": 0
                        },
                        "weather": [
                            {
                                "id": 803,
                                "main": "Clouds",
                                "description": "broken clouds",
                                "icon": "04n"
                            }
                        ],
                        "clouds": {
                            "all": 76
                        },
                        "wind": {
                            "speed": 2.4,
                            "deg": 309,
                            "gust": 5.1
                        },
                        "visibility": 10000,
                        "pop": 0,
                        "sys": {
                            "pod": "n"
                        },
                        "dt_txt": "2023-08-27 21:00:00"
                    },
                    {
                        "dt": 1693180800,
                        "main": {
                            "temp": 287.55,
                            "feels_like": 286.85,
                            "temp_min": 287.55,
                            "temp_max": 287.55,
                            "pressure": 1016,
                            "sea_level": 1016,
                            "grnd_level": 1014,
                            "humidity": 69,
                            "temp_kf": 0
                        },
                        "weather": [
                            {
                                "id": 802,
                                "main": "Clouds",
                                "description": "scattered clouds",
                                "icon": "03n"
                            }
                        ],
                        "clouds": {
                            "all": 48
                        },
                        "wind": {
                            "speed": 1.15,
                            "deg": 274,
                            "gust": 1.6
                        },
                        "visibility": 10000,
                        "pop": 0,
                        "sys": {
                            "pod": "n"
                        },
                        "dt_txt": "2023-08-28 00:00:00"
                    },
                    {
                        "dt": 1693191600,
                        "main": {
                            "temp": 287.55,
                            "feels_like": 286.8,
                            "temp_min": 287.55,
                            "temp_max": 287.55,
                            "pressure": 1015,
                            "sea_level": 1015,
                            "grnd_level": 1013,
                            "humidity": 67,
                            "temp_kf": 0
                        },
                        "weather": [
                            {
                                "id": 802,
                                "main": "Clouds",
                                "description": "scattered clouds",
                                "icon": "03n"
                            }
                        ],
                        "clouds": {
                            "all": 40
                        },
                        "wind": {
                            "speed": 1.52,
                            "deg": 243,
                            "gust": 3.02
                        },
                        "visibility": 10000,
                        "pop": 0,
                        "sys": {
                            "pod": "n"
                        },
                        "dt_txt": "2023-08-28 03:00:00"
                    },
                    {
                        "dt": 1693202400,
                        "main": {
                            "temp": 287.2,
                            "feels_like": 286.57,
                            "temp_min": 287.2,
                            "temp_max": 287.2,
                            "pressure": 1015,
                            "sea_level": 1015,
                            "grnd_level": 1013,
                            "humidity": 73,
                            "temp_kf": 0
                        },
                        "weather": [
                            {
                                "id": 803,
                                "main": "Clouds",
                                "description": "broken clouds",
                                "icon": "04d"
                            }
                        ],
                        "clouds": {
                            "all": 60
                        },
                        "wind": {
                            "speed": 2.39,
                            "deg": 251,
                            "gust": 4.6
                        },
                        "visibility": 10000,
                        "pop": 0,
                        "sys": {
                            "pod": "d"
                        },
                        "dt_txt": "2023-08-28 06:00:00"
                    },
                    {
                        "dt": 1693213200,
                        "main": {
                            "temp": 289.7,
                            "feels_like": 289.16,
                            "temp_min": 289.7,
                            "temp_max": 289.7,
                            "pressure": 1014,
                            "sea_level": 1014,
                            "grnd_level": 1013,
                            "humidity": 67,
                            "temp_kf": 0
                        },
                        "weather": [
                            {
                                "id": 804,
                                "main": "Clouds",
                                "description": "overcast clouds",
                                "icon": "04d"
                            }
                        ],
                        "clouds": {
                            "all": 100
                        },
                        "wind": {
                            "speed": 2.31,
                            "deg": 255,
                            "gust": 3.73
                        },
                        "visibility": 10000,
                        "pop": 0,
                        "sys": {
                            "pod": "d"
                        },
                        "dt_txt": "2023-08-28 09:00:00"
                    },
                    {
                        "dt": 1693224000,
                        "main": {
                            "temp": 292.65,
                            "feels_like": 292.12,
                            "temp_min": 292.65,
                            "temp_max": 292.65,
                            "pressure": 1013,
                            "sea_level": 1013,
                            "grnd_level": 1011,
                            "humidity": 56,
                            "temp_kf": 0
                        },
                        "weather": [
                            {
                                "id": 804,
                                "main": "Clouds",
                                "description": "overcast clouds",
                                "icon": "04d"
                            }
                        ],
                        "clouds": {
                            "all": 100
                        },
                        "wind": {
                            "speed": 3.49,
                            "deg": 254,
                            "gust": 4.19
                        },
                        "visibility": 10000,
                        "pop": 0,
                        "sys": {
                            "pod": "d"
                        },
                        "dt_txt": "2023-08-28 12:00:00"
                    },
                    {
                        "dt": 1693234800,
                        "main": {
                            "temp": 294.25,
                            "feels_like": 293.62,
                            "temp_min": 294.25,
                            "temp_max": 294.25,
                            "pressure": 1011,
                            "sea_level": 1011,
                            "grnd_level": 1009,
                            "humidity": 46,
                            "temp_kf": 0
                        },
                        "weather": [
                            {
                                "id": 804,
                                "main": "Clouds",
                                "description": "overcast clouds",
                                "icon": "04d"
                            }
                        ],
                        "clouds": {
                            "all": 100
                        },
                        "wind": {
                            "speed": 2.84,
                            "deg": 241,
                            "gust": 4.44
                        },
                        "visibility": 10000,
                        "pop": 0,
                        "sys": {
                            "pod": "d"
                        },
                        "dt_txt": "2023-08-28 15:00:00"
                    },
                    {
                        "dt": 1693245600,
                        "main": {
                            "temp": 292.92,
                            "feels_like": 292.31,
                            "temp_min": 292.92,
                            "temp_max": 292.92,
                            "pressure": 1010,
                            "sea_level": 1010,
                            "grnd_level": 1008,
                            "humidity": 52,
                            "temp_kf": 0
                        },
                        "weather": [
                            {
                                "id": 804,
                                "main": "Clouds",
                                "description": "overcast clouds",
                                "icon": "04d"
                            }
                        ],
                        "clouds": {
                            "all": 100
                        },
                        "wind": {
                            "speed": 2.68,
                            "deg": 218,
                            "gust": 4.94
                        },
                        "visibility": 10000,
                        "pop": 0,
                        "sys": {
                            "pod": "d"
                        },
                        "dt_txt": "2023-08-28 18:00:00"
                    }
                ],
                "city": {
                    "id": 3333166,
                    "name": "Lewisham",
                    "coord": {
                        "lat": 51.4535,
                        "lon": -0.018
                    },
                    "country": "GB",
                    "population": 261600,
                    "timezone": 3600,
                    "sunrise": 1692766676,
                    "sunset": 1692817686
                }
            }))
    }),
    rest.get('https://api.openweathermap.org/geo/1.0/reverse', (req, res, ctx) => {
        return res(ctx.status(200),
            ctx.json([
                {
                    "name": "City of London",
                    "local_names": {
                        "ar": "مدينة لندن",
                        "ascii": "City of London",
                        "bg": "Сити",
                        "ca": "La City",
                        "de": "London City",
                        "el": "Σίτι του Λονδίνου",
                        "en": "City of London",
                        "fa": "سیتی لندن",
                        "feature_name": "City of London",
                        "fi": "Lontoon City",
                        "fr": "Cité de Londres",
                        "gl": "Cidade de Londres",
                        "he": "הסיטי של לונדון",
                        "hi": "सिटी ऑफ़ लंदन",
                        "id": "Kota London",
                        "it": "Londra",
                        "ja": "シティ・オブ・ロンドン",
                        "la": "Civitas Londinium",
                        "lt": "Londono Sitis",
                        "pt": "Cidade de Londres",
                        "ru": "Сити",
                        "sr": "Сити",
                        "th": "นครลอนดอน",
                        "tr": "Londra Şehri",
                        "vi": "Thành phố Luân Đôn",
                        "zu": "Idolobha weLondon"
                    },
                    "lat": 51.4535,
                    "lon": -0.018,
                    "country": "GB"
                },
            ])
        )
    }),
    rest.get('http://api.openweathermap.org/data/2.5/air_pollution', (req, res, ctx) => {
        return res(ctx.status(200),
            ctx.json({
                "coord": [
                    50.0,
                    50.0
                ],
                "list": [
                    {
                        "dt": 1606147200,
                        "main": {
                            "aqi": 4.0
                        },
                        "components": {
                            "co": 203.609,
                            "no": 0.0,
                            "no2": 0.396,
                            "o3": 75.102,
                            "so2": 0.648,
                            "pm2_5": 23.253,
                            "pm10": 92.214,
                            "nh3": 0.117
                        }
                    }
                ]
            }))
    })
]
