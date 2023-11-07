import React from 'react';
import {Card} from 'components/Card';
import {UserData} from 'pages/UserOverview/types';

interface TeamLeadCardProps {
    teamLead: UserData;
}

export function TeamLeadCard(props: TeamLeadCardProps): JSX.Element {
    const {teamLead} = props;

    const columns = [
        {key: 'Team Lead', value: ''},
        {key: 'Name', value: `${teamLead.firstName} ${teamLead.lastName}`},
        {key: 'Display Name', value: teamLead.displayName},
        {key: 'Location', value: teamLead.location},
    ];

    return <Card columns={columns} url={`/user/${teamLead.id}`} navigationProps={teamLead} />;
}
