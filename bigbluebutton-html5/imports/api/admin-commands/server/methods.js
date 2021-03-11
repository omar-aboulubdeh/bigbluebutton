import AdminCommands from '/imports/api/admin-commands';
import { Meteor } from 'meteor/meteor';
function commands() {
  return;
}
function publish(...args) {
  const boundCommands = commands.bind(this);
  return boundCommands(...args);
}
AdminCommands.remove({});

Meteor.publish('adminCommands', () => {
  return AdminCommands.find({});
});

Meteor.methods({
  'adminCommand': function ({ userId, command }) {
    switch (command) {
      case 'turnOffUserVideo':
        console.log('admincommand for user: ' + userId + ' command: ' + command);
        AdminCommands.insert(
          { userId, command: 'LeaveVideo' },
        );
        break;
      case 'turnOnUserVideo':
        console.log('turn n video fo user: ' + userId);
        AdminCommands.insert(
          { userId, command: 'JoinVideo' }
        );
        break;
      case 'unMuteAll':
        console.log('unmute all users please');
        AdminCommands.insert(
          { command: 'unMuteAll' }
        );
        break;
      case 'muteAll':
        console.log('mute all users please');
        AdminCommands.insert(
          { command: 'muteAll' }
        );
        break;
      case 'clearCommands':
        AdminCommands.remove({ });
        break;
    }
    console.log('hi from client side: ');
  }
});


