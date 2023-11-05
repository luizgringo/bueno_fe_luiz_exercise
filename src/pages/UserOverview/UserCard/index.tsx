import React from 'react';
import {Card} from 'components/Card';
import {UserData} from '../types';

interface UserCardProps {
    user: UserData;
}

export function UserCard(props: UserCardProps): JSX.Element {
    const {user} = props;

    const columns = [
        {key: 'Name', value: `${user.firstName} ${user.lastName}`},
        {key: 'Display Name', value: user.displayName},
        {key: 'Location', value: user.location},
    ];

    return <Card columns={columns} hasNavigation={false} navigationProps={user} />;
}
