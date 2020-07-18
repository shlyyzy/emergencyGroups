const members = new Map()
let messages = []

function broadcastMessage(message) {
  members.forEach(m => m.emit('message', message));
}

function addEntry(entry) {
  messages = messages.concat(entry);
}

function getMessages() {
  return messages.slice();
}

function addUser(client) {
  members.set(client.id, client);
}

function removeUser(client) {
  members.delete(client.id);
}

function serialize() {
  return {
    name,
    image,
    numMembers: members.size
  }
}