import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import {UserData} from 'pages/UserOverview/types';
import {Team} from 'pages/Teams/types';
import {Container} from './styles';

interface CardProps {
    id?: string;
    url?: string;
    columns: Array<{
        key: string;
        value: string;
    }>;
    hasNavigation?: boolean;
    navigationProps?: UserData | Team;
}

export function Card(props: CardProps): JSX.Element {
    const {id, columns, url, hasNavigation = true, navigationProps = null} = props;
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
            {columns.map(({key: columnKey, value}) => (
                <p key={columnKey}>
                    <strong>{columnKey}</strong>&nbsp;{value}
                </p>
            ))}
        </Container>
    );
}
