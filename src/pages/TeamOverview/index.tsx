import * as React from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {UserData} from 'pages/UserOverview/types';
import {ListItem} from 'components/List/types';
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
    const navigate = useNavigate();
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
        return <List items={teamMemberMap(pageData?.teamMembers ?? [])} isLoading={isLoading} />;
    }, [pageData, isLoading]);

    return (
        <Container>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
                <Link
                    underline="hover"
                    key="2"
                    href="/"
                >
                    🏠 Home / Teams Page
                </Link>
                <Typography key="3">
                    👪 Team - {location.state.name}
                </Typography>
            </Breadcrumbs>
            <Header title={`Team ${location.state.name}`} />
            <TextField
                id="outlined-basic"
                label="Search Members"
                placeholder='Type something to search team members here'
                variant="outlined"
                sx={{width: '600px', margin: '30px'}}
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        🔎
                      </InputAdornment>
                    ),
                  }}
            />
            {!isLoading && <TeamLeadCard teamLead={pageData.teamLead} />}
            {teamMembersList}
        </Container>
    );
}
