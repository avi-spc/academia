import { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useOutletContext, useParams } from 'react-router-dom';

import { getStudentPerformance, gradeAssignment } from '../../reduxStore/actions/performance';
import { togglePopup } from '../../reduxStore/actions/popus';

import Chore from './Chore';
import ChoreAssignment from './student/ChoreAssignment';
import AssignmentSubmission from './student/AssignmentSubmission';
import GradeChore from '../create/GradeChore';

const IndividualSubmissionAssignment = ({
	getStudentPerformance,
	togglePopup,
	performance,
	popup
}) => {
	const { assignment_id, student_id, course_id } = useParams();
	const { individualCourse } = useOutletContext();

	const [submission, setSubmission] = useState(null);

	useEffect(() => {
		getStudentPerformance(student_id);
	}, [student_id]);

	useEffect(() => {
		if (performance) {
			setSubmission(
				performance.performance
					.find((perf) => {
						return perf.course._id === course_id;
					})
					.assignments.find((assignment) => {
						return assignment.id === assignment_id;
					})
			);
		}
	}, [performance]);

	const chore = individualCourse.course.assignments.find((assignment) => {
		return assignment._id === assignment_id;
	});

	return (
		submission && (
			<Fragment>
				<div className="chore-submission">
					<div className="chore-submission__details">
						<div className="chore-submission__details__heading text-large-M">
							Details
						</div>
						<Chore courseId={individualCourse.course._id} chore={chore} />
					</div>
					<div className="chore-submission__individual-submission">
						<div className="chore-submission__individual-submission__heading text-large-M">
							Submission
						</div>
						<AssignmentSubmission
							studentId={performance.student.instituteId}
							submission={submission}
						/>
						<button
							className="btn btn--round"
							onClick={() => togglePopup(!popup.isVisible)}
						>
							Grade
						</button>
					</div>
				</div>
				{popup.isVisible && (
					<GradeChore
						type="assignment"
						studentId={student_id}
						courseId={course_id}
						choreId={assignment_id}
					/>
				)}
			</Fragment>
		)
	);
};

const mapStateToProps = (state) => ({
	popup: state.popup,
	performance: state.performance.performance
});

export default connect(mapStateToProps, { getStudentPerformance, gradeAssignment, togglePopup })(
	IndividualSubmissionAssignment
);
