import { render, screen } from '@testing-library/react';
import { geolocationMock_1, geolocationMock_2, geolocationMock_3 } from './__mocks__/header';
import Header from './Header';

describe('Header', () => {
    test('renders correct full location', async () => {
        render(<Header currentLocation={geolocationMock_1} />);
        expect(await screen.findByText('Brovary, Kyiv Oblast, UA')).toBeInTheDocument();
    });
    test('renders correct location without state', async () => {
        render(<Header currentLocation={geolocationMock_2} />);
        expect(await screen.findByText('City of London, GB')).toBeInTheDocument();
    });
    test('renders correct location without state and country', async () => {
        render(<Header currentLocation={geolocationMock_3} />);
        expect(await screen.findByText("Henryk Arctowski Polish Antarctic Station")).toBeInTheDocument();
    });
})
