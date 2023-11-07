import React from 'react';
import {GenericCard} from 'components/GenericCard';
import {UserData} from '../types';

interface UserCardProps {
    user: UserData;
}

export function UserCard(props: UserCardProps): JSX.Element {
    const {user} = props;

    const columns = [
        {key: 'Display Name', value: user.displayName},
        {key: 'Location', value: user.location},
    ];

    return (
        <GenericCard
            columns={columns}
            hasNavigation={false}
            navigationProps={user}
            name={`${user.firstName} ${user.lastName}`}
            avatar="https://i.pravatar.cc/345"
        />
    );
}
