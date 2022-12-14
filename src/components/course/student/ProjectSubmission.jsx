import { timeInWords } from '../../../utils/timestampFormatter';
import { baseUrl } from '../../../utils/env';

const ProjectSubmission = ({ studentId, submission }) => {
	return (
		<div className="chore text-medium-R">
			<div className="chore__header">
				<span className="icon icon--light material-symbols-outlined">assignment</span>
				<div className="chore__header__title text-medium-SB">{studentId}</div>
				{/* <div className="chore__header__timestamp text-small-R">Posted 12:04 PM</div> */}
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
			<div className="chore__project-details">
				<div className="chore__project-details__title text-medium-SB">
					{submission.title}
				</div>
				<div className="chore__project-details__synopsis">{submission.synopsis}</div>
				<div className="text-medium-SB">Team</div>
				<div className="chore__project-details__team">
					{submission.team.map((member) => {
						return (
							<div className="team-member" key={member.student._id}>
								{member.student.instituteId}
							</div>
						);
					})}
				</div>
				<button className="btn btn--round-sm">
					<span className="material-symbols-outlined">link</span>
					<div>Available At</div>
				</button>
			</div>
		</div>
	);
};

export default ProjectSubmission;
