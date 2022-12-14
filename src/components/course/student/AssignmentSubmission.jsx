import { timeInWords } from '../../../utils/timestampFormatter';
import { baseUrl } from '../../../utils/env';

const AssignmentSubmission = ({ studentId, submission }) => {
	return (
		<div className="chore text-medium-R">
			<div className="chore__header">
				<span className="icon icon--light material-symbols-outlined">assignment</span>
				<div className="chore__header__title text-medium-SB">{studentId}</div>
				{/* <div className="chore__header__timestamp text-small-R">
					{timeInWords(submission.createdAt)}
				</div> */}
			</div>
			<div className="chore__details">
				<div>
					<label>Submitted on</label>
					<div className="chore__details__deadline text-large-M">
						{timeInWords(submission.createdAt)}
					</div>
				</div>
				<div>
					<label>Score</label>
					<div className="chore__details__points text-large-M">
						{'marksObtained' in submission ? submission.marksObtained : 'NG'}
					</div>
				</div>
				<a
					className="btn btn--round"
					href={`${baseUrl}/performance/submissions/file/${submission.documentId}`}
					target="_blank"
				>
					Submission
				</a>
			</div>
		</div>
	);
};

export default AssignmentSubmission;
