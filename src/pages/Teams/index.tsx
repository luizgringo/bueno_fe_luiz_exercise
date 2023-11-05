import * as React from 'react';
import {ListItem} from 'components/List/types';
import {getTeams as fetchTeams} from '../../api';
import {Header} from '../../components/Header';
import {List} from '../../components/List';
import {Container} from '../../components/GlobalComponents';
import {Team} from './types';

const teamList = (teams: Team[]) => {
    return teams.map(team => {
        const columns = [
            {
                key: 'Name',
                value: team.name,
            },
        ];
        return {
            id: team.id,
            url: `/team/${team.id}`,
            columns,
            navigationProps: team,
        } as ListItem;
    });
};

export function TeamsPage(): JSX.Element {
    const [teams, setTeams] = React.useState<any>([]);
    const [isLoading, setIsLoading] = React.useState<any>(true);

    React.useEffect(() => {
        const getTeams = async () => {
            const response = await fetchTeams();
            setTeams(response);
            setIsLoading(false);
        };
        getTeams();
    }, []);

    const teamsList = React.useMemo(() => {
        return <List items={teamList(teams)} isLoading={isLoading} />;
      }, [teams, isLoading]);

    return (
        <Container>
            <Header title="Teams" showBackButton={false} />
            {teamsList}
        </Container>
    );
}
