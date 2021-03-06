import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import BreakoutService from '/imports/ui/components/breakout-room/service';
import Meetings from '/imports/api/meetings';
import Auth from '/imports/ui/services/auth';
import UserListItem from './component';
import UserListService from '/imports/ui/components/user-list/service';
import AdminCommands from '/imports/ui/services/admin-commands';
import VideoStreams from '/imports/api/video-streams';

const UserListItemContainer = props => <UserListItem {...props} />;
const isMe = intId => intId === Auth.userID;

export default withTracker(({ user }) => {
  const findUserInBreakout = BreakoutService.getBreakoutUserIsIn(user.userId);
  const breakoutSequence = (findUserInBreakout || {}).sequence;
  const Meeting = Meetings.findOne({ meetingId: Auth.meetingID },
    { fields: { lockSettingsProps: 1 } });
  return {
    user,
    isMe,
    userInBreakout: !!findUserInBreakout,
    breakoutSequence,
    lockSettingsProps: Meeting && Meeting.lockSettingsProps,
    isMeteorConnected: Meteor.status().connected,
    isThisMeetingLocked: UserListService.isMeetingLocked(Auth.meetingID),
    voiceUser: UserListService.curatedVoiceUser(user.userId),
    toggleVoice: UserListService.toggleVoice,
    toggleMuteAllUsersExceptPresenter: () => {
      UserListService.muteAllExceptPresenter(Auth.userID);
      if (isMeetingMuteOnStart()) {
        return meetingMuteDisabledLog();
      }
      return logger.info({
        logCode: 'useroptions_mute_all_except_presenter',
        extraInfo: { logType: 'moderator_action' },
      }, 'moderator enabled meeting mute, all users muted except presenter');
    },
    removeUser: UserListService.removeUser,
    toggleUserLock: UserListService.toggleUserLock,
    changeRole: UserListService.changeRole,
    assignPresenter: UserListService.assignPresenter,
    getAvailableActions: UserListService.getAvailableActions,
    normalizeEmojiName: UserListService.normalizeEmojiName,
    getGroupChatPrivate: UserListService.getGroupChatPrivate,
    getEmojiList: UserListService.getEmojiList(),
    getEmoji: UserListService.getEmoji(),
    usersProp: UserListService.getUsersProp(),
    hasPrivateChatBetweenUsers: UserListService.hasPrivateChatBetweenUsers,
    turnOffUserVideo: AdminCommands.turnOffUserVideo,
    turnOnUserVideo: AdminCommands.turnOnUserVideo,
    isVideoUser: VideoStreams.find(
      {
        meetingId: Auth.meetingID,
        userId: user.userId,
      }, { fields: { stream: 1 } },
    ).count() !== 0
  };
})(UserListItemContainer);
