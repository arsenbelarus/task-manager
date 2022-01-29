import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from '../Navbar';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';

describe('Navbar', () => {
	// function renderWithRedux = (component, {initialState, store = createStore(firebaseReducer, initialState)} = {}) => {

	// }
	const MockNavbar = () => {
		return (
			<BrowserRouter>
				<Provider store={store}>
					<Navbar />
				</Provider>
			</BrowserRouter>
		);
	};

	it('Should render only 2 links when not logged in', () => {
		render(<MockNavbar />);
		const links = screen.getAllByRole('listitem');
		expect(links.length).toBe(2);
	});

	// it('Should render only 4 links when user is logged in', () => {
	// 	render(<MockNavbar />);
	// 	const links = screen.getAllByRole('listitem');
	// 	expect(links.length).toBe(4);
	// });
});
