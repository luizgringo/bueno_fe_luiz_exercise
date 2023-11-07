import * as React from 'react';
import {GenericCard} from 'components/GenericCard';
import {Spinner} from '../Spinner';
import {Container} from './styles';
import {ListItem} from './types';

interface ListProps {
    items?: ListItem[];
    hasNavigation?: boolean;
    isLoading: boolean;
}

export function List(props: ListProps): JSX.Element {
    const {items, hasNavigation = true, isLoading} = props;

    return (
        <Container>
            {isLoading && <Spinner />}
            {!isLoading &&
                items.map(({url, id, columns, navigationProps, name, isTeam}, index) => {
                    return (
                        <GenericCard
                            key={`${id}-${index}`}
                            id={id}
                            columns={columns}
                            navigationProps={navigationProps}
                            hasNavigation={hasNavigation}
                            url={url}
                            name={name}
                            isTeam={isTeam}
                        />
                    );
                })}
        </Container>
    );
}
