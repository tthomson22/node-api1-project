// BUILD YOUR SERVER HERE
const express = require('express')

const Users = require('./users/model')

const server = express();

server.use(express.json());

server.get('/api/users', (req, res) => {
    Users.find()
        .then(users => {
            res.json(users)
        })
})

server.get('/api/users/:id', (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            if(!user){
                res.status(404).json({ message: 'The user with that id does not exist.' })
            } else {
                res.json(user)
            }
        })
})

server.post('/api/users', (req, res) => {
    let user = req.body;
    Users.insert(user)
        .then(user => {
            if(!user.name || !user.bio){
                res.status(400).json({ message: "Please provide name and bio for the user" })
            } else {
                res.status(201).json(user)

            }
        })
})

server.put('/api/users/:id', (req, res) => {
    let id = req.params.id;
    let user = req.body;

    Users.update(id, user)
        .then(updatedUser => {
            if(!user.name || !user.bio){
                res.status(400).json({ message: "Please provide name and bio for the user" })
            } else if (!updatedUser){
                res.status(404).json({ message: "The user with the specified ID does not exist" })        
            } else {
                res.status(200).json(updatedUser)
            }
        })
        .catch(err => {
            err.status(500).json({ message: "The user information could not be modified" })
        })
})

server.delete('/api/users/:id', (req, res) => {
    Users.remove(req.params.id)
        .then(user => {
            if(!user) {
                res.status(404).json({ message: 'does not exist' });
            } else {
                res.json(user);
            }
        });
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
