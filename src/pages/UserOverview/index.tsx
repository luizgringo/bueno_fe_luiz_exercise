import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {Container} from '../../components/GlobalComponents';
import {Header} from '../../components/Header';
import {UserData} from './types';
import {UserCard} from './UserCard';

export function UserOverviewPage(): JSX.Element {
    const navigate = useNavigate();
    const location = useLocation();
    const user: UserData | undefined = location.state;

    if (!user) {
        // eslint-disable-next-line no-console
        console.error('User Not Found!');
        return null;
    }

    return (
        <Container>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
                <Link
                    underline="hover"
                    key="2"
                    href="/"
                >
                    🏠 Home / Teams Page
                </Link>
                <Link
                    underline="hover"
                    key="2"
                    href="#"
                    onClick={() => navigate(-1)}
                >
                    👪 Team
                </Link>
                <Typography key="3">
                    👤 User - {user.firstName} {user.lastName}
                </Typography>
            </Breadcrumbs>
            <Header title={`User ${user.firstName} ${user.lastName}`} />
            <UserCard user={user} />
        </Container>
    );
}
