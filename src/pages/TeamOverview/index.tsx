import * as React from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {UserData} from 'pages/UserOverview/types';
import {ListItem} from 'components/List/types';
import {getTeamOverview, getUserData} from '../../api';
import {Card} from '../../components/Card';
import {Container} from '../../components/GlobalComponents';
import {Header} from '../../components/Header';
import {List} from '../../components/List';

const mapArray = (users: UserData[]) => {
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

const mapTLead = tlead => {
    const columns = [
        {
            key: 'Team Lead',
            value: '',
        },
        {
            key: 'Name',
            value: `${tlead.firstName} ${tlead.lastName}`,
        },
        {
            key: 'Display Name',
            value: tlead.displayName,
        },
        {
            key: 'Location',
            value: tlead.location,
        },
    ];
    return <Card columns={columns} url={`/user/${tlead.id}`} navigationProps={tlead} />;
};

interface PageState {
    teamLead?: UserData;
    teamMembers?: UserData[];
}

export function TeamOverviewPage(): JSX.Element {
    const location = useLocation();
    const {teamId} = useParams();
    const [pageData, setPageData] = React.useState<PageState>({});
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        const getTeamUsers = async () => {
            const {teamLeadId, teamMemberIds = []} = await getTeamOverview(teamId);
            const teamLead = await getUserData(teamLeadId);

            const teamMembers = [];
            for(const teamMemberId of teamMemberIds) {
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
    }, [teamId]);

    const teamOverviewList = React.useMemo(() => {
        return <List items={mapArray(pageData?.teamMembers ?? [])} isLoading={isLoading} />;
      }, [pageData, isLoading]);

    return (
        <Container>
            <Header title={`Team ${location.state.name}`} />
            {!isLoading && mapTLead(pageData.teamLead)}
            {teamOverviewList}
        </Container>
    );
}
