import styled from 'styled-components';

export const Container = styled.div<{hasNavigation: boolean}>`
    display: grid;
    width: 250px;
    cursor: ${props => (props.hasNavigation ? 'pointer' : 'default')};
    margin: 5px;
    text-align: center;
`;
