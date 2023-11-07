import React, {useEffect, useState, useMemo} from 'react';
import {ListItem} from 'components/List/types';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import _ from 'lodash';
import {getTeams as fetchTeams} from '../../api';
import {Header} from '../../components/Header';
import {List} from '../../components/List';
import {Container} from '../../components/GlobalComponents';
import {Team} from './types';

const teamMap = (teams: Team[]): ListItem[] => {
    return teams.map(team => ({
        id: team.id,
        url: `/team/${team.id}`,
        name: team.name,
        isTeam: true,
        columns: [],
        navigationProps: team,
    }));
};

export function TeamsPage(): JSX.Element {
    const [teams, setTeams] = useState<Team[]>([]);
    const [originalTeamList, setOriginalTeamList] = useState<Team[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const getTeams = async () => {
            try {
                const response = await fetchTeams();
                setTeams(response);
                setIsLoading(false);
                setOriginalTeamList(response);
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error('Error trying to fetchTeams!');
            }
        };
        getTeams();
    }, []);

    const teamsList = useMemo(() => {
        return <List items={teamMap(teams)} isLoading={isLoading} />;
    }, [teams, isLoading]);

    const handleKeyUp = e => {
        const teamsMatched = [];
        _.find(originalTeamList, team => {
            const typedName = e.target.value;
            if (team.name.toLowerCase().includes(typedName.toLowerCase())) {
                teamsMatched.push(team);
            }
        });
        setTeams(teamsMatched);
    };

    return (
        <Container>
            <Header title="Teams" />
            <TextField
                id="outlined-basic"
                label="Search Teams"
                placeholder="Type something to search teams here"
                variant="outlined"
                sx={{width: '600px', margin: '30px'}}
                InputProps={{
                    startAdornment: <InputAdornment position="start">🔎</InputAdornment>,
                }}
                onKeyUp={handleKeyUp}
            />
            {teamsList}
        </Container>
    );
}
