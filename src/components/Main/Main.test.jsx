import { render, screen, waitFor } from '@testing-library/react';
import Main from './Main';

const props = {
    API_URL: {
        weather: "https://api.openweathermap.org/data/2.5/weather?",
        forecast: "https://api.openweathermap.org/data/2.5/forecast?",
        locationDir: "http://api.openweathermap.org/geo/1.0/direct?",
        locationRev: "https://api.openweathermap.org/geo/1.0/reverse?",
        airPollution: "http://api.openweathermap.org/data/2.5/air_pollution?"
    },
    currentLocation: [{
        "lat": 51.4535,
        "lon": -0.018,
    }]
}

jest.mock('react-chartjs-2', ()=> ({
    Line: () => null,
}))

describe('Main', () => {
    test('renders correct current temperature', async () => {
        render(<Main {...props} />);
        await waitFor(() => expect(screen.getByTestId('currTemp')).toHaveTextContent('598'));
    });
    test('renders correct current date and time', () => {
        render(<Main {...props} />);
        expect(screen.getByTestId('currTime')).toHaveTextContent('05:06');
        expect(screen.getByTestId('currDate')).toHaveTextContent('Tue - Aug 22, 2023');
    });
    test('renders correct icon with current weather', async () => {
        render(<Main {...props} />);
        const icon = await screen.findByTestId('good_weather_test_d')
        expect(icon).toBeInTheDocument();
    });
    test('renders correct count of datalabels', async () => {
        render(<Main {...props} />);
        await waitFor(() => expect(screen.queryAllByTestId('datalabel', {exact: false})).toHaveLength(9));
    });
    test('renders correct first datalabel time', async () => {
        render(<Main {...props} />);
        await waitFor(() => expect(screen.getByTestId('datalabel_0')).toHaveTextContent('00:00', {exact: true}));
    });
    test('renders correct first datalabel weather icon', async () => {
        render(<Main {...props} />);
        const icon = await screen.findByTestId('test_weather_n')
        await waitFor(() => expect(screen.getByTestId('datalabel_0')).toContainElement(icon));
    });
    test('renders correct last datalabel time', async () => {
        render(<Main {...props} />);
        await waitFor(() => expect(screen.getByTestId('datalabel_8')).toHaveTextContent('03:00', {exact: true}));
    });
    test('renders correct last datalabel weather icon', async () => {
        render(<Main {...props} />);
        const icon = await screen.findByTestId('bad_weather_g')
        await waitFor(() => expect(screen.getByTestId('datalabel_8')).toContainElement(icon));
    });
    test('renders correct PoP icon in datalabel', async () => {
        render(<Main {...props} />);
        const icon = await screen.findByTestId('bad_weather_g')
        await waitFor(() => expect(screen.getByTestId('datalabel_8')).toContainElement(icon));
    });
})
