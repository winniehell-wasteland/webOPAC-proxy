Meteor.methods({
  'loadMessage': loadMessage
})

function loadMessage () {
  return 'Hello from server!'
}
