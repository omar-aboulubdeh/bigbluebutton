import { Meteor } from 'meteor/meteor';
const AdminCommands = new Mongo.Collection('adminCommands');
// AdminCommands.remove(); 
if (Meteor.isServer) {
  // types of queries for the admincommands users:
  // 1. intId
  AdminCommands._ensureIndex({ userId: 1 });
}
export default AdminCommands;
