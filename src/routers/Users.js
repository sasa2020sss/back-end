const Users = require('express').Router()

const UsersControllers = require('../controllers/Users')

Users.get('/', UsersControllers.read)

Users.post('/', UsersControllers.create)

Users.patch('/:id', UsersControllers.update)

Users.delete('/:id', UsersControllers.delete)

module.exports = Users
