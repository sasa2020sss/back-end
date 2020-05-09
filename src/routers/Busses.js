const Busses = require('express').Router()
const BussesControllers = require('../controllers/Busses')

Busses.get('/', BussesControllers.read)
Busses.get('/:id', BussesControllers.readById)
Busses.post('/', BussesControllers.create)
Busses.patch('/:id', BussesControllers.update)
Busses.delete('/:id', BussesControllers.delete)

module.exports = Busses
