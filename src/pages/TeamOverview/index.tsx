import * as React from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {UserData} from 'pages/UserOverview/types';
import {ListItem} from 'components/List/types';
import {getTeamOverview, getUserData} from '../../api';
import {Container} from '../../components/GlobalComponents';
import {Header} from '../../components/Header';
import {List} from '../../components/List';
import {TeamLeadCard} from './TeamLeadCard';

interface PageState {
    teamLead?: UserData;
    teamMembers?: UserData[];
}

const userMap = (users: UserData[]) => {
    return users.map(u => {
        const columns = [
            {
                key: 'Name',
                value: `${u.firstName} ${u.lastName}`,
            },
            {
                key: 'Display Name',
                value: u.displayName,
            },
            {
                key: 'Location',
                value: u.location,
            },
        ];
        return {
            id: u.id,
            url: `/user/${u.id}`,
            columns,
            navigationProps: u,
        };
    }) as ListItem[];
};

export function TeamOverviewPage(): JSX.Element {
    const location = useLocation();
    const {teamId} = useParams();
    const [pageData, setPageData] = React.useState<PageState>({});
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        try {
            const getTeamUsers = async () => {
                const {teamLeadId, teamMemberIds = []} = await getTeamOverview(teamId);
                const teamLead = await getUserData(teamLeadId);

                const teamMembers = [];
                for (const teamMemberId of teamMemberIds) {
                    const data = await getUserData(teamMemberId);
                    teamMembers.push(data);
                }
                setPageData({
                    teamLead,
                    teamMembers,
                });
                setIsLoading(false);
            };
            getTeamUsers();
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Error trying to fetch Team Overview Members', error);
        }
    }, [teamId]);

    const teamMembersList = React.useMemo(() => {
        return <List items={userMap(pageData?.teamMembers ?? [])} isLoading={isLoading} />;
    }, [pageData, isLoading]);

    return (
        <Container>
            <Header title={`Team ${location.state.name}`} />
            {!isLoading && <TeamLeadCard teamLead={pageData.teamLead} />}
            {teamMembersList}
        </Container>
    );
}
