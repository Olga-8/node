let users = [
    { id: 1, name: 'Ann', email: 'ann@google.com', hobbies: ['books', 'sport', 'dancing'] },
    { id: 2, name: 'Ben', email: 'ben@google.com', hobbies: ['series', 'sport'] }
];

const getAllUsers = ()=> {
    return users.map(({name, email})=> ({name, email}))
};

const getUserById = (id)=> {
    const {name, email}= users.find(user => user.id === id)
    return {name, email};
};

const createUser = (userData)=> {
    const newUser = { id: users.length + 1, ...userData };
    users = [...users, newUser]
    return newUser;
};

const deleteUser = (userId)=> {
    users = users.filter(user => user.id !== userId);
    return users;
};

const updateUser = (userId, userData)=> {
    const index = users.findIndex(user => user.id === userId);

    if (index !== -1){
        users[index]={...users[index], ...userData};
        return users[index];
    }

    return false
}

const getUsersHobbies = (userId) => {
    const user = users.find(user => user.id === userId);
    return user ? user.hobbies : null;
};


const addHobby = (userId, userHobby) => {
    const user = users.find(user => user.id === userId);
    if (user) {
        user.hobbies.push(userHobby);
        return true;
    }
    return false;
};

const deleteHobby = (userId, userHobby) => {
    const user = users.find(user => user.id === userId);
    if (user) {
        user.hobbies = user.hobbies.filter(hobby => hobby !== userHobby);
        return true;
    }
    return false;
};

module.exports = {
    users,
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser,
    getUsersHobbies,
    addHobby,
    deleteHobby
};
