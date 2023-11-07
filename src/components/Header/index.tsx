import * as React from 'react';
import {HeaderContainer, NavigationHeader, Title} from './styles';

interface HeaderProps {
    title: string;
}

export function Header(props: HeaderProps): JSX.Element {
    const {title} = props;

    return (
        <HeaderContainer>
            <NavigationHeader>
                <Title>{title}</Title>
            </NavigationHeader>
        </HeaderContainer>
    );
}
