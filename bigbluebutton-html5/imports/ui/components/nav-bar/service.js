import Auth from '/imports/ui/services/auth';
import { makeCall } from '/imports/ui/services/api';
import RecordMeetings from '/imports/api/meetings';
import SettingsService from '/imports/ui/services/settings';
import _ from 'lodash';
import { notify } from '/imports/ui/services/notification';

const processOutsideToggleRecording = (e) => {
  switch (e.data) {
    case 'c_record': {
      makeCall('toggleRecording');
      break;
    }
    case 'c_recording_status': {
      const recordingState = (RecordMeetings.findOne({ meetingId: Auth.meetingID })).recording;
      const recordingMessage = recordingState ? 'recordingStarted' : 'recordingStopped';
      this.window.parent.postMessage({ response: recordingMessage }, '*');
      break;
    }
    default: {
      // console.log(e.data);
    }
  }
};

const connectRecordingObserver = () => {
  // notify on load complete
  this.window.parent.postMessage({ response: 'readyToConnect' }, '*');
};

const togglePagination = () =>{
  const appSettings = _.clone(SettingsService.application); 
  appSettings.paginationEnabled = !appSettings.paginationEnabled ; 
  SettingsService.application = appSettings ; 
  SettingsService.save(); 
  setTimeout(() => {
    notify(
      'layout switched',
      'info',
      'settings',
    );
  }, 0);
}
export default {
  connectRecordingObserver: () => connectRecordingObserver(),
  processOutsideToggleRecording: arg => processOutsideToggleRecording(arg),
  togglePagination: () => togglePagination()
};
