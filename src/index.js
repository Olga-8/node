const http = require('http');
const users = require('./users');

const server = http.createServer((req, res) => {
    const { url, method } = req;

    if (url === '/users' && method === 'GET') {
        users.getUsers(req, res);
    }

    if (url.match(/\/users\/\d+$/) && method === 'GET') {
        const id = url.split('/')[2];
        users.getUserById(req, res, id);
    }

    if (url === '/users/add' && method === 'POST') {
        users.createUser(req, res);
    }

    if (url.match(/\/users\/\d+$/) && method === 'DELETE') {
        const id = url.split('/')[2];
        users.deleteUser(req, res, id);
    }

    if (url.match(/\/users\/\d+\/hobbies$/) && method === 'PATCH') {
        const id = url.split('/')[2];
        users.updateUser(req, res, id);
    }
   
    if (url.match(/\/users\/\d+\/hobbies$/) && method === 'GET') {
        const id = url.split('/')[2];
        users.getUsersHobbies(req, res, id);
    }

    if (url.match(/\/users\/\d+\/hobbies$/) && method === 'POST') {
        const id = url.split('/')[2];
        users.addHobby(req, res, id);
    } 

    if (url.match(/\/users\/\d+\/hobbies$/) && method === 'DELETE') {
        const id = url.split('/')[2];
        users.addHobby(req, res, id);
    }
        res.writeHead(404);
        res.end('Not Found');
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});