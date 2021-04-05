import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import VideoList from '/imports/ui/components/video-provider/video-list/component';
import VideoService from '/imports/ui/components/video-provider/service';
import Auth from '/imports/ui/services/auth';
import VoiceUsers from '/imports/api/voice-users';
import SettingsService from '/imports/ui/services/settings';

import {
  isVideoBroadcasting,
}
from '/imports/ui/components/screenshare/service';

const VideoListContainer = ({ children, ...props }) => {
  const { streams } = props;
  return (!streams.length ? null : <VideoList{...props}>{children}</VideoList>);
};


export default withTracker(props => {
  const meetingId = Auth.meetingID;
  const usersTalking = VoiceUsers.find({ meetingId, joined: true, spoke: true }, {
    fields: {
      callerName: 1,
      talking: 1,
      color: 1,
      startTime: 1,
      voiceUserId: 1,
      muted: 1,
      intId: 1,
    },
  }).fetch().sort(sortVoiceUsers);

  if (usersTalking.length) {
    const {
      callerName, talking, color, voiceUserId, muted, intId,
    } = usersTalking[0];
    talker = {
      intId,
      color,
      talking,
      voiceUserId,
      muted,
      callerName,
    };
  } else {
    talker = false;
  }


  return {
    talker: props.talker,
    paginationEnabled: SettingsService.application.paginationEnabled,
    isScreenSharing: isVideoBroadcasting,
    streams: props.streams,
    onMount: props.onMount,
    swapLayout: props.swapLayout,
    numberOfPages: VideoService.getNumberOfPages(),
    currentVideoPageIndex: props.currentVideoPageIndex,
    onVideoItemMount: props.onVideoItemMount,
    onVideoItemUnmount: props.onVideoItemUnmount,
    swapLayout: props.swapLayout,
    numberOfPages: VideoService.getNumberOfPages(),
    currentVideoPageIndex: props.currentVideoPageIndex,
  }

})(VideoListContainer);
