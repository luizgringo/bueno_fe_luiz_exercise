import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import TeamOverviewPage from './pages/TeamOverview';
import TeamsPage from './pages/Teams';
import UserOverviewPage from './pages/UserOverview';

const router = createBrowserRouter([
  {
      path: '/',
      element: <TeamsPage />,
  },
  {
      path: '/team/:teamId',
      element: <TeamOverviewPage />,
  },
  {
      path: '/user/:useId',
      element: <UserOverviewPage />,
  },
]);

export default router;
