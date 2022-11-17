import { useRef } from 'react';
import { connect } from 'react-redux';

import { togglePopup } from '../../../reduxStore/actions/popus';
import {
	uploadDocument,
	discardDocument,
	clearDocumentId
} from '../../../reduxStore/actions/course';
import { submitProject } from '../../../reduxStore/actions/performance';
import { useForm } from '../../../hooks/useForm';
import { isEmpty } from '../../../utils/validator';

const SubmitProject = ({
	submitProject,
	uploadDocument,
	discardDocument,
	togglePopup,
	clearDocumentId,
	documentId,
	courseId,
	projectId
}) => {
	const form = useRef();

	const { formData, onChange } = useForm({ title: '', synopsis: '' });
	const { title, synopsis } = formData;

	const cancelChore = () => {
		togglePopup(false);
		if (documentId) discardDocument(documentId);
	};

	return (
		<div className="popup">
			<div className="create-chore container-medium">
				<div className="create-heading text-medium-SB">Submit project</div>
				<form className="create__file text-normal-R" ref={form}>
					<label className="doc-label" htmlFor="doc-file">
						<span>Upload file</span>
					</label>
					<input
						type="file"
						className="doc-file"
						id="doc-file"
						name="file"
						onChange={() => uploadDocument(form.current)}
					/>
				</form>
				<form className="create__form text-normal-R">
					<label>Title</label>
					<div className="input-group">
						<input
							type="text"
							maxLength="30"
							className="title"
							name="title"
							value={title}
							onChange={onChange}
						/>
						<span className="length-indicator">{title.length}/30</span>
					</div>
					<label>Synopsis</label>
					<div className="input-group">
						<textarea
							type="text"
							maxLength="230"
							className="synopsis"
							name="synopsis"
							value={synopsis}
							onChange={onChange}
							rows="5"
						/>
						<span className="length-indicator">{synopsis.length}/230</span>
					</div>
				</form>
				<div className="create__cta">
					<button
						className="btn btn--round"
						disabled={isEmpty({ ...formData, documentId })}
						onClick={() => {
							submitProject({ title, documentId, synopsis }, courseId, projectId);
							togglePopup(false);
							clearDocumentId();
						}}
					>
						Submit
					</button>
					<button className="btn btn--cancel" onClick={cancelChore}>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	documentId: state.course.documentId
});

export default connect(mapStateToProps, {
	submitProject,
	uploadDocument,
	discardDocument,
	togglePopup,
	clearDocumentId
})(SubmitProject);
