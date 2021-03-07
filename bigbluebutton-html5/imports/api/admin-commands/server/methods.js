import AdminCommands from '/imports/api/admin-commands';
import { Meteor } from 'meteor/meteor';
function commands() {
  return;
}
function publish(...args) {
  const boundCommands = commands.bind(this);
  return boundCommands(...args);
}

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
      case 'clearCommands':
        AdminCommands.remove({ userId });
        break;
    }
    console.log('hi from client side: ');
  }
});


