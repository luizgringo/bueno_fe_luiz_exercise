import * as React from 'react';
import Card from '../Card';
import {Spinner} from '../Spinner';
import {Container} from './styles';
import {ListItem} from './types';

interface Props {
    items?: ListItem[];
    hasNavigation?: boolean;
    isLoading: boolean;
}

const List = ({items, hasNavigation = true, isLoading}: Props) => {
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
};

export default List;
