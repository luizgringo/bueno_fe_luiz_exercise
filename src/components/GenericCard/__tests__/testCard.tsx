import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {Team} from 'pages/Teams/types';
import {GenericCard} from '..';

const mockUseNavigate = jest.fn();

// Mock do react-router-dom
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate,
}));

describe('GenericCard Component', () => {
    const renderCard = (columns, hasNavigation = true, navigationProps = null) => {
        render(
            <GenericCard
                columns={columns}
                hasNavigation={hasNavigation}
                navigationProps={navigationProps}
            />
        );
    };

    it('should render a card with a single column', () => {
        renderCard([{key: 'columnKey', value: 'columnValue'}]);

        expect(screen.getByTestId('column-0')).toHaveTextContent('columnKey');
        expect(screen.getByTestId('column-0')).toHaveTextContent('columnValue');
    });

    it('should render a card with multiple columns', () => {
        const columns = [
            {key: 'columnKey1', value: 'columnValue1'},
            {key: 'columnKey2', value: 'columnValue2'},
            {key: 'columnKey3', value: 'columnValue3'},
        ];
        renderCard(columns);

        columns.forEach((column, index) => {
            const columnIndex = `column-${index}`;
            expect(screen.getByTestId(columnIndex)).toHaveTextContent(column.key);
            expect(screen.getByTestId(columnIndex)).toHaveTextContent(column.value);
        });
    });

    it('should navigate when card is clicked and navigation is enabled', () => {
        const navProps = {
            id: '1',
            name: 'Team 1',
        } as Team;

        mockUseNavigate.mockReturnValue((path, options) => {
            expect(path).toBe('path');
            expect(options.state).toEqual(navProps);
        });

        renderCard([{key: 'columnKey', value: 'columnValue'}], true, navProps);

        fireEvent.click(screen.getByTestId('column-0'));
    });

    it('should not navigate when card is clicked and navigation is disabled', () => {
        renderCard([{key: 'columnKey', value: 'columnValue'}], false);

        fireEvent.click(screen.getByTestId('column-0'));
        expect(mockUseNavigate).not.toHaveBeenCalled();
    });
});
