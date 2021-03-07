import Auth from '/imports/ui/services/auth';
import AdminCommands from '/imports/api/admin-commands'; 
// const AdminCommands = Mongo.Collection('adminCommands');
// session for closed chat list

export function turnOffUserVideo (userId) {
  Meteor.call('adminCommand',{userId, command: 'turnOffUserVideo'},function(e, r){
    if (e) console.log(e); 
    else console.log('success'); 
  }); 
  return; 
}
export function turnOnUserVideo (userId) {
  Meteor.call('adminCommand',{userId, command: 'turnOnUserVideo'},function(e, r){
    if (e) console.log(e);
    else console.log('success'); 
  }); 
  data = AdminCommands.find({}).fetch(); 
  console.log(data);
  return; 
}
export function clearCommands (userId) {
  Meteor.call('adminCommand',{userId,command: 'clearCommands'},function(e, r){
    if (e) console.log(e);
    else console.log('success'); 
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

export default {
  turnOffUserVideo,
  turnOnUserVideo,
};
