import React from 'react';
import {render, screen} from '@testing-library/react';
import {UserOverviewPage} from '..';

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        state: {
            firstName: 'Test',
            lastName: 'User',
            displayName: 'userName',
            location: 'location',
        },
    }),
    useNavigate: () => jest.fn(),
}));

describe('UserOverview', () => {
    it('should render UserOverview', () => {
        render(<UserOverviewPage />);

        const expectedTexts = ['Test User', 'userName', 'location'];

        expectedTexts.forEach(text => {
            expect(screen.getByText(text)).toBeInTheDocument();
        });
    });
});
