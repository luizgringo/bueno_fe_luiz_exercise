import * as React from 'react';
import {Card} from 'components/Card';
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
                items.map(({url, id, columns, navigationProps}, index) => {
                    return (
                        <Card
                            key={`${id}-${index}`}
                            id={id}
                            columns={columns}
                            navigationProps={navigationProps}
                            hasNavigation={hasNavigation}
                            url={url}
                        />
                    );
                })}
        </Container>
    );
}
