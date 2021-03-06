import { check } from 'meteor/check';
import UsersPersistentData from '/imports/api/users-persistent-data';
import Logger from '/imports/startup/server/logger';

export default function addUserPersistentData(user) {
  check(user, {
    meetingId: String,
    sortName: String,
    color: String,
    mobile: Boolean,
    breakoutProps: Object,
    inactivityCheck: Boolean,
    responseDelay: Number,
    loggedOut: Boolean,
    intId: String,
    extId: String,
    name: String,
    role: String,
    guest: Boolean,
    authed: Boolean,
    guestStatus: String,
    emoji: String,
    presenter: Boolean,
    locked: Boolean,
    avatar: String,
    clientType: String,
    effectiveConnectionType: null,
  });


  const {
    intId,
    extId,
    meetingId,
    name,
    role,
    token,
    avatar,
    guest,
    color,
  } = user;

  const userData = {
    userId: intId,
    extId,
    meetingId,
    name,
    role,
    token,
    avatar,
    guest,
    color,
    loggedOut: false,
  };

  const selector = {
    userId: intId,
    meetingId,
  };

  const modifier = {
    $set: userData,
  };

  try {
    const { insertedId } = UsersPersistentData.upsert(selector, modifier);

    if (insertedId) {
      Logger.info(`Added user id=${intId} to user persistent Data: meeting=${meetingId}`);
    } else {
      Logger.info(`Upserted user id=${intId} to user persistent Data: meeting=${meetingId}`);
    }
  } catch (err) {
    Logger.error(`Adding note to the collection: ${err}`);
  }
}
