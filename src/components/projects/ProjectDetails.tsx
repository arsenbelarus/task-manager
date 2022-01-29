import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../../store/store';
import { ProjectReducerType } from '../../store/reducers/projectReducer';
import moment from 'moment';
import { firebaseReducer } from 'react-redux-firebase';

const ProjectDetails = () => {
	const id: any = useParams();
	const { projects } = useSelector<AppRootStateType, ProjectReducerType>(
		(state) => state.project
	);
	const singleProject = projects?.find((project) => project.projectId === id);

	const { auth } = useSelector<
		AppRootStateType,
		ReturnType<typeof firebaseReducer>
	>((state) => state.firebase);

	if (!auth.uid) {
		return <Navigate to={'/signin'} />;
	}

	return (
		<div className={'container section projectDetails'}>
			{singleProject && (
				<div className={'card z-depth-0'}>
					<div className={'card-content'}>
						<span className={'card-title center'}> {singleProject.title} </span>
						<p>{singleProject.description}</p>
						<p>{singleProject.projectStatus}</p>
					</div>
					<div className={'card-action grey grey-text lighten-4'}>
						<div>
							<strong>Posted by: </strong>
							<i>
								{' '}
								{singleProject.userFirstName} {singleProject.userLastName}
							</i>
						</div>
						<div>
							<strong>Created on: </strong>
							{moment(singleProject.createdAt.toDate()).format(
								'MMMM Do YYYY, H:mm'
							)}
						</div>
						<Link to={'/'}>
							<button className={'btn grey darken-2 btnBack'}> Go back </button>
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProjectDetails;
