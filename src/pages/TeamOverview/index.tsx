import React, {useEffect, useState, useMemo} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {UserData} from 'pages/UserOverview/types';
import {ListItem} from 'components/List/types';
import _ from 'lodash';
import Link from '@mui/material/Link';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import {getTeamOverview, getUserData} from '../../api';
import {Container} from '../../components/GlobalComponents';
import {Header} from '../../components/Header';
import {List} from '../../components/List';
import {TeamLeadCard} from './TeamLeadCard';

interface PageState {
    teamLead?: UserData;
    teamMembers?: UserData[];
}

const teamMemberMap = (users: UserData[]): ListItem[] => {
    return users.map(u => {
        return {
            id: u.id,
            url: `/user/${u.id}`,
            columns: [
                {
                    key: 'Display Name',
                    value: u.displayName,
                },
                {
                    key: 'Location',
                    value: u.location,
                },
            ],
            navigationProps: u,
            name: `${u.firstName} ${u.lastName}`,
        };
    });
};

export function TeamOverviewPage(): JSX.Element {
    const location = useLocation();
    const {teamId} = useParams();
    const [teamLead, setTeamLead] = useState<UserData>();
    const [teamMemberList, setTeamMemberList] = useState<UserData[]>([]);
    const [originalTeamMemberList, setOriginalMemberTeamList] = useState<UserData[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    useEffect(() => {
        try {
            const getTeamUsers = async () => {
                const {teamLeadId, teamMemberIds = []} = await getTeamOverview(teamId);
                const teamLeadData = await getUserData(teamLeadId);

                const teamMembers = [];
                for (const teamMemberId of teamMemberIds) {
                    const data = await getUserData(teamMemberId);
                    teamMembers.push(data);
                }

                setTeamLead(teamLeadData);
                setTeamMemberList(teamMembers);
                setOriginalMemberTeamList(teamMembers);
                setIsLoading(false);
            };
            getTeamUsers();
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Error trying to fetch Team Overview Members', error);
        }
    }, [teamId]);

    const teamMembersList = useMemo(() => {
        return <List items={teamMemberMap(teamMemberList)} isLoading={isLoading} />;
    }, [teamMemberList, isLoading]);

    const handleKeyUp = (e: any) => {
        const teamMembersMatched = [];
        _.find(originalTeamMemberList, (teamMember: {firstName: string; lastName: string}) => {
            const typedName = e.target.value;
            if (
                teamMember.firstName.toLowerCase().includes(typedName.toLowerCase()) ||
                teamMember.lastName.toLowerCase().includes(typedName.toLowerCase())
            ) {
                teamMembersMatched.push(teamMember);
            }
        });
        setTeamMemberList(teamMembersMatched);
    };

    return (
        <Container>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
                <Link underline="hover" key="2" href="/">
                    🏠 Home / Teams Page
                </Link>
                <Typography key="3">👪 Team - {location.state.name}</Typography>
            </Breadcrumbs>
            <Header title={`Team ${location.state.name}`} />
            <TextField
                id="outlined-basic"
                label="Search Members"
                placeholder="Type something to search team members here"
                variant="outlined"
                sx={{width: '600px', margin: '30px'}}
                InputProps={{
                    startAdornment: <InputAdornment position="start">🔎</InputAdornment>,
                }}
                onKeyUp={handleKeyUp}
            />
            {!isLoading && <TeamLeadCard teamLead={teamLead} />}
            {teamMembersList}
        </Container>
    );
}
