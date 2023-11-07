import React from 'react';
import {GenericCard} from 'components/GenericCard';
import {UserData} from 'pages/UserOverview/types';

interface TeamLeadCardProps {
    teamLead: UserData;
}

export function TeamLeadCard(props: TeamLeadCardProps): JSX.Element {
    const {teamLead} = props;

    const columns = [
        {key: 'Display Name', value: teamLead.displayName},
        {key: 'Location', value: teamLead.location},
    ];

    return (
        <GenericCard
            columns={columns}
            url={`/user/${teamLead.id}`}
            name={`${teamLead.firstName} ${teamLead.lastName}`}
            navigationProps={teamLead}
            isTeamLeader
        />
    );
}
