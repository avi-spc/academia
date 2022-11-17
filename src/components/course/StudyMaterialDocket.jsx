import { Fragment, useState } from 'react';
import { connect } from 'react-redux';

import { toggleUpdatePopup, toggleUpdateDocPopup } from '../../reduxStore/actions/popus';

import CreateStudyMaterial from '../create/CreateStudyMaterial';
import UpdateDocument from '../update/UpdateDocument';
import UpdateStudyMaterial from '../update/UpdateStudyMaterial';
import StudyMaterial from './StudyMaterial';

const StudyMaterialDocket = ({
	popup,
	individualCourse,
	auth: { account },
	toggleUpdatePopup,
	toggleUpdateDocPopup
}) => {
	const [noteDetails, setNoteDetails] = useState(null);

	return (
		<Fragment>
			{individualCourse.course.studyMaterial.notes.map((note) => (
				<StudyMaterial key={note._id} note={note} setNoteDetails={setNoteDetails} />
			))}
			{individualCourse.course.studyMaterial.notes.length === 0 &&
				account.type === 'student' && (
					<div className="empty-list text-medium-R center">No notes shared yet</div>
				)}
			{popup.isVisible && <CreateStudyMaterial courseId={individualCourse.course._id} />}
			{popup.isUpdate && (
				<UpdateStudyMaterial
					noteDetails={noteDetails}
					courseId={individualCourse.course._id}
				/>
			)}
			{popup.isDocUpdate && (
				<UpdateDocument
					chore={noteDetails}
					courseId={individualCourse.course._id}
					type="notes"
				/>
			)}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	popup: state.popup,
	individualCourse: state.course.individualCourse,
	auth: state.auth
});

export default connect(mapStateToProps, { toggleUpdatePopup, toggleUpdateDocPopup })(
	StudyMaterialDocket
);
