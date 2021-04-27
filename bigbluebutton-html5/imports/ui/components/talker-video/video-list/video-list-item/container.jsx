import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import VoiceUsers from '/imports/api/voice-users/';
import VideoListItem from './component';

const VideoListItemContainer = props => (
  <VideoListItem {...props} />
);

export default withTracker((props) => {
  const {
    userId,
  } = props;
  console.log('video list item container update'); 

  return {
    voiceUser: VoiceUsers.findOne({ intId: userId }),
  };
})(VideoListItemContainer);
