import { Fragment, useState } from 'react';
import { connect } from 'react-redux';

import CreateAnnouncement from '../create/CreateAnnouncement';
import UpdateAnnouncement from '../update/UpdateAnnouncement';
import Announcement from './Announcement';

const AnnouncementDocket = ({ popup, individualCourse, auth: { account } }) => {
	const [announcementDetails, setAnnouncementDetails] = useState(null);

	return (
		<Fragment>
			{individualCourse.announcements.map((announcement) => (
				<Announcement
					key={announcement._id}
					setAnnouncementDetails={setAnnouncementDetails}
					announcement={announcement}
				/>
			))}
			{individualCourse.announcements.length === 0 && account.type === 'student' && (
				<div className="empty-list text-medium-R center">No announcements posted yet</div>
			)}
			{popup.isVisible && <CreateAnnouncement courseId={individualCourse.course._id} />}
			{popup.isUpdate && (
				<UpdateAnnouncement
					announcementDetails={announcementDetails}
					courseId={individualCourse.course._id}
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

export default connect(mapStateToProps)(AnnouncementDocket);
