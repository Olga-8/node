const dataUsers = require('./data');

const getUsers = (req, res) => {

    const users = dataUsers.getAllUsers();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
};

const getUserById = (req, res, id) => {

    const user = dataUsers.getUserById(Number(id))
    if (user) {
        const userWithHobbiesLink = {
            ...user,
            links: {
                hobbies: `http://${req.headers.host}/users/${id}/hobbies`
            }
        };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(userWithHobbiesLink));
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: "User not found" }));
    }
};

const createUser = (req, res) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        const userData = JSON.parse(body);
        const newUser = dataUsers.createUser(userData);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newUser));
    });
}

const deleteUser = (req, res, id) => {
    
    const isDeleted = dataUsers.deleteUser(Number(id));

    if (isDeleted) {
        res.writeHead(200);
        res.end(`User with ID ${id} deleted`);
    } else {
        res.writeHead(404);
        res.end('User not found');
    }
   
};

const updateUser = (req, res, id) => {
        let body = '';
    
        req.on('data', chunk => {
            body += chunk.toString();
        });
    
        req.on('end', () => {
            const userData = JSON.parse(body);
            const updatedUser = dataUsers.updateUser(Number(id), userData);
    
            if (updatedUser) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(updatedUser));
            } else {
                res.writeHead(404);
                res.end('User not found');
            }
        });
};
const getUsersHobbies = (req, res, id) => {

    const hobbies = dataUsers.getUsersHobbies(Number(id));

    res.writeHead(200, { 
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age=86400' 
    });
    res.end(JSON.stringify(hobbies));
};

const addHobby = (req, res, userId) => {
    let body = '';
    
        req.on('data', chunk => {
            body += chunk.toString();
        });
    
        req.on('end', () => {
            const userHobby = JSON.parse(body);
            const addHobby = dataUsers.addHobby(Number(userId), userHobby);
    
            if (addHobby) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(addHobby));
            } else {
                res.writeHead(404);
                res.end('User not found');
            }
        });
}

const deleteHobby = (req, res, userId, hobby) => {
    const isDeleteHobby = dataUsers.deleteHobby(Number(userId), hobby);

    if (isDeleteHobby) {
        res.writeHead(200);
        res.end('Hobby deleted');
    } else {
        res.writeHead(404);
        res.end('User not found');
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser,
    getUsersHobbies,
    addHobby,
    deleteHobby
};
