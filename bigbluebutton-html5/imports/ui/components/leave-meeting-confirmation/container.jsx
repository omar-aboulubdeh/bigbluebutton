import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { withModalMounter } from '/imports/ui/components/modal/service';
import { makeCall } from '/imports/ui/services/api';
import EndMeetingComponent from './component';
import Service from './service';
import logger from '/imports/startup/client/logger';
import Auth from '/imports/ui/services/auth';

const EndMeetingContainer = props => <EndMeetingComponent {...props} />;

export default withModalMounter(withTracker(({ mountModal }) => ({
  closeModal: () => {
    mountModal(null);
  },

  dontDisturb: () => {
    makeCall('userLeftMeeting');
    Auth.logout()
      .then((logoutURL) => {
        if (logoutURL) {
          const protocolPattern = /^((http|https):\/\/)/;
          window.location.href = protocolPattern.test(logoutURL) ? `${logoutURL}?exit=notdisturb` : `http://${logoutURL}?exit=notdisturb`;
        }
      });
    Session.set('codeError', this.LOGOUT_CODE);
  },
  okToCall: () => {
    makeCall('userLeftMeeting');
    Auth.logout()
      .then((logoutURL) => {
        if (logoutURL) {
          const protocolPattern = /^((http|https):\/\/)/;
          window.location.href = protocolPattern.test(logoutURL) ? `${logoutURL}?exit=oktocall` : `http://${logoutURL}?exit=oktocall`;
        }
      });
    Session.set('codeError', this.LOGOUT_CODE);
  },
  endMeeting: () => {
    logger.warn({
      logCode: 'moderator_forcing_end_meeting',
      extraInfo: { logType: 'user_action' },
    }, 'this user clicked on EndMeeting and confirmed, removing everybody from the meeting');
    // makeCall('endMeeting');
    mountModal(null);
  },
  meetingTitle: Service.getMeetingTitle(),
  users: Service.getUsers(),
}))(EndMeetingContainer));
