import React from 'react';
import {useLocation} from 'react-router-dom';
import {Container} from '../../components/GlobalComponents';
import {Header} from '../../components/Header';
import {UserData} from './types';
import {UserCard} from './UserCard';

export function UserOverviewPage(): JSX.Element {
    const location = useLocation();
    const user: UserData | undefined = location.state;

    if (!user) {
        // eslint-disable-next-line no-console
        console.error('User Not Found!');
        return null;
    }

    return (
        <Container>
            <Header title={`User ${user.firstName} ${user.lastName}`} />
            <UserCard user={user} />
        </Container>
    );
}
