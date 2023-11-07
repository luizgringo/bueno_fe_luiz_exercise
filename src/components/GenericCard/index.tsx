import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import {UserData} from 'pages/UserOverview/types';
import {Team} from 'pages/Teams/types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Zoom from '@mui/material/Zoom';
import {Container} from './styles';
import avatarImg from './avatar.jpg';
import teamImg from './team.png';

interface CardProps {
    id?: string;
    url?: string;
    columns?: Array<{
        key: string;
        value: string;
    }>;
    hasNavigation?: boolean;
    navigationProps?: UserData | Team;
    name?: string;
    avatar?: string;
    isTeamLeader?: boolean;
    isTeam?: boolean;
}

export function GenericCard(props: CardProps): JSX.Element {
    const {
        id,
        columns,
        url,
        hasNavigation = true,
        navigationProps = null,
        avatar,
        name,
        isTeamLeader = false,
        isTeam = false,
    } = props;
    const navigate = useNavigate();

    return (
        <Container
            data-testid={`cardContainer-${id}`}
            hasNavigation={hasNavigation}
            onClick={(e: Event) => {
                if (hasNavigation) {
                    navigate(url, {
                        state: navigationProps,
                    });
                }
                e.preventDefault();
            }}
        >
            <Zoom in>
                <Card sx={{maxWidth: 345, height: isTeam ? 240 : 280}}>
                    <CardMedia
                        sx={{height: 140}}
                        image={isTeam ? teamImg : avatar || avatarImg}
                        title="Avatar"
                    />
                    <CardContent>
                        {isTeamLeader && <Chip label="Team Leader" />}
                        <Typography gutterBottom variant="h5" component="div">
                            {name}
                        </Typography>
                        {columns.map(({key: columnKey, value}) => (
                            <Typography key={columnKey} variant="body2" color="text.secondary">
                                <strong>{columnKey}:</strong>&nbsp;{value}
                            </Typography>
                        ))}
                    </CardContent>
                </Card>
            </Zoom>
        </Container>
    );
}
