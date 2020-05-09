const TopUp = require('express').Router()
const TopUpControllers = require('../controllers/TopUp')

TopUp.post('/', TopUpControllers.create)
TopUp.get('/:id', TopUpControllers.readById)
TopUp.patch('/update/:id', TopUpControllers.updateStatus)

module.exports = TopUp
