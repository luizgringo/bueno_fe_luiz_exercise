/* eslint-disable testing-library/no-unnecessary-act */
import * as React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import {act} from 'react-dom/test-utils'; // Importe a função 'act' do React
import * as API from '../../../api';
import {TeamsPage} from '..';

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        state: {
            firstName: 'Test',
            lastName: 'User',
            displayName: 'userName',
            location: 'location',
        },
    }),
    useNavigate: () => ({}),
}));

describe('Teams', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('should render spinner while loading', async () => {
        const teamsData = [
            {id: '1', name: 'Team1'},
            {id: '2', name: 'Team2'},
        ];

        jest.spyOn(API, 'getTeams').mockResolvedValue(teamsData);

        render(<TeamsPage />);

        await act(async () => {
            await waitFor(() => {
                expect(screen.getByTestId('spinner')).toBeInTheDocument();
            });
        });
    });

    it('should render teams list', async () => {
        const teamsData = [
            {id: '1', name: 'Team1'},
            {id: '2', name: 'Team2'},
        ];

        jest.spyOn(API, 'getTeams').mockResolvedValue(teamsData);

        // Use 'act' para envolver a renderização do componente
        await act(async () => {
            render(<TeamsPage />);
        });

        await waitFor(() => {
            teamsData.forEach(team => {
                expect(screen.getByText(team.name)).toBeInTheDocument();
            });
        });
    });
});
