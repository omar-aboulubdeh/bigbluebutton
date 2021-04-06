import Auth from '/imports/ui/services/auth';
import AdminCommands from '/imports/api/admin-commands'; 
// const AdminCommands = Mongo.Collection('adminCommands');
// session for closed chat list

export function turnOffUserVideo (userId) {
  Meteor.call('adminCommand',{userId, command: 'turnOffUserVideo'},function(e, r){
  }); 
  return; 
}
export function turnOnUserVideo (userId) {
  Meteor.call('adminCommand',{userId, command: 'turnOnUserVideo'},function(e, r){
  }); 
  return; 
}
export function unMuteAll () {
  Meteor.call('adminCommand',{userId: false, command: 'unMuteAll'},function(e, r){
  }); 
  return; 
}
export function muteAll () {
  Meteor.call('adminCommand',{userId: false, command: 'muteAll'},function(e, r){
  }); 
  return; 
}
export function clearCommands (userId) {
  Meteor.call('adminCommand',{userId,command: 'clearCommands'},function(e, r){
  }); 
  return; 
}

// export function getUserCommands (){
  // const command =  AdminCommands.find().count();
  // console.log('count: '+command);
  // return {command: null}; 
// };

const getScrollPosition = (receiverID) => {
  const scroll = ScrollCollection.findOne({ receiver: receiverID },
    { fields: { position: 1 } }) || { position: null };
  return scroll.position;
};

const updateScrollPosition = position => ScrollCollection.upsert(
  { receiver: Session.get('idChatOpen') },
  { $set: { position } },
);

const updateUnreadMessage = (timestamp) => {
  const chatID = Session.get('idChatOpen');
  const isPublic = chatID === PUBLIC_CHAT_ID;
  const chatType = isPublic ? PUBLIC_GROUP_CHAT_ID : chatID;
  return UnreadMessages.update(chatType, timestamp);
};

