import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Users from '/imports/api/users/';
import Auth from '/imports/ui/services/auth';
import MediaService, { getSwapLayout, shouldEnableSwapLayout } from '/imports/ui/components/media/service';
// import VideoService from '/imports/ui/components/video-provider/service';
import videoService from '/imports/ui/components/video-provider/service';
// import { toggleMinimizeScreenShare, isScreenShareMinimized } from '/imports/ui/components/video-provider/service';

import {
  isVideoBroadcasting,
  isGloballyBroadcasting,
} from './service';
import ScreenshareComponent from './component';

const ScreenshareContainer = (props) => {
  // style={{display: 'none'}} 
  if (isVideoBroadcasting()) {
    // return <div style={{maxHeight: '80%', minHeight: '20%', maxWidth: '100%', minWidth: '20%'}}><ScreenshareComponent {...props} /></div> ;
    return <ScreenshareComponent {...props} /> ;
    // return props.isScreenShareMinimized ? null : <ScreenshareComponent {...props} />;
  }
  return null;
};

export default withTracker(() => {
  const user = Users.findOne({ userId: Auth.userID }, { fields: { presenter: 1 } });
  return {
    isGloballyBroadcasting: isGloballyBroadcasting(),
    isPresenter: user.presenter,
    getSwapLayout,
    shouldEnableSwapLayout,
    isScreenShareMinimized: videoService.isScreenShareMinimized(), 
    toggleMinimizeScreenShare: videoService.toggleMinimizeScreenShare, 
    toggleSwapLayout: MediaService.toggleSwapLayout,
  };
})(ScreenshareContainer);
