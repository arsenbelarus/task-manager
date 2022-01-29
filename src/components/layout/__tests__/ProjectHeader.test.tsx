import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ProjectHeader from '../ProjectHeader';

describe('ProjectHeader', () => {
	it('Should render component', () => {
		render(<ProjectHeader />);
		const columns = screen.getAllByTestId('column');
		expect(columns.length).toBe(3);
	});
});
