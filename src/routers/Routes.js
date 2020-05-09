const Routes = require('express').Router()
const RoutesControllers = require('../controllers/Routes')

Routes.get('/', RoutesControllers.read)
Routes.get('/:id', RoutesControllers.readById)
Routes.post('/', RoutesControllers.create)
Routes.patch('/:id', RoutesControllers.update)
Routes.delete('/:id', RoutesControllers.delete)

module.exports = Routes
