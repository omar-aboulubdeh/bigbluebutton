import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
import Button from '/imports/ui/components/button/component';
import Modal from '/imports/ui/components/modal/simple/component';
import { styles } from './styles';

const intlMessages = defineMessages({
  endMeetingTitle: {
    id: 'app.endMeeting.title',
    description: 'end meeting title',
  },
  endMeetingDescription: {
    id: 'app.endMeeting.description',
    description: 'end meeting description',
  },
  yesLabel: {
    id: 'app.endMeeting.yesLabel',
    description: 'label for yes button for end meeting',
  },
  noLabel: {
    id: 'app.endMeeting.noLabel',
    description: 'label for no button for end meeting',
  },
});

const propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
  dontDisturb: PropTypes.func.isRequired,
  okToCall: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  meetingTitle: PropTypes.string.isRequired,
  users: PropTypes.number.isRequired,
};

class LeaveMeetingComponent extends React.PureComponent {
  render() {
    const {
      users, intl, closeModal, dontDisturb, okToCall, meetingTitle,
    } = this.props;

    return (
      <Modal
        overlayClassName={styles.overlay}
        className={styles.modal}
        onRequestClose={closeModal}
        hideBorder
        title="Leave meeting"
      >
        <div className={styles.container}>
          <div className={styles.description}>
            {'Usted quiere no ser molestado por el día de hoy?'}
          </div>
          <div className={styles.footer}>
            <Button
              data-test="confirmEndMeeting"
              color="primary"
              className={styles.button}
              label={intl.formatMessage(intlMessages.yesLabel)}
              onClick={dontDisturb}
            />
            <Button
              label={intl.formatMessage(intlMessages.noLabel)}
              className={styles.button}
              onClick={okToCall}
            />
          </div>
        </div>
      </Modal>
    );
  }
}

LeaveMeetingComponent.propTypes = propTypes;

export default injectIntl(LeaveMeetingComponent);
