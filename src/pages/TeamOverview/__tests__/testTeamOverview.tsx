import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import {TeamOverviewPage} from '..';
import * as API from '../../../api';

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        state: {
            teamName: 'Some Team',
        },
    }),
    useNavigate: () => ({}),
    useParams: () => ({
        teamId: '1',
    }),
}));

describe('TeamOverview', () => {
  it('should render team overview users', async () => {
    const teamOverview = {
      id: '1',
      teamLeadId: '2',
      teamMemberIds: ['3', '4', '5'],
    };
    const userData = {
      id: '2',
      firstName: 'userData',
      lastName: 'userData',
      displayName: 'userData',
      location: '',
      avatar: '',
    };

    jest.spyOn(API, 'getTeamOverview').mockResolvedValue(teamOverview);
    jest.spyOn(API, 'getUserData').mockResolvedValue(userData);

    render(<TeamOverviewPage />);

    await waitFor(() => {
      expect(screen.getAllByText('userData')).toHaveLength(4);
    });
  });
});
