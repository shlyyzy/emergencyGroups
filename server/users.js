const users = []; // id, name, room => id is unique socket id
const messages = []; // id, name, message

// addUser takes id, name, and room and adds user
// to specified room if name is not already taken in room
const addUser = ({ id, name, room }) => {
  
    const existingUser = users.find((user) => user.room === room && user.name === name);
  
    if(!name || !room) return { error: 'Username and room are required.' };
    if(existingUser) return { error: 'Username is taken.' };
  
    const user = { id, name, room };
  
    users.push(user);
  
    return { user };
}

// removeUser removes user by id
const removeUser = (id, name) => {
    const index = users.findIndex((user) => user.id === id && user.name === name);
    if (index !== -1) {
        return users.splice(index, 1);
    }
}

// getUser gets user by id
const getUser = (id) => users.find((user) => user.id === id);

// getUsersInRoom gets all users in specified room
const getUsersInRoom = (room) => {
    return users.filter((user) => user.room === room);
}

const getMessages = (room) => {
    //return messages;
    const list = messages.filter((message) => message.room === room);
}

const addMessage = (user, room, message) => {
    const msg = {user, room, message};
    messages.push(msg);
}

module.exports = {addUser: addUser, removeUser: removeUser, getUser: getUser, getUsersInRoom: getUsersInRoom, getMessages:getMessages, addMessage: addMessage};