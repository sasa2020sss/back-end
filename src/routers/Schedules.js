const Schedules = require('express').Router()
const SchedulesControllers = require('../controllers/Schedules')

Schedules.get('/', SchedulesControllers.read)
Schedules.get('/:id', SchedulesControllers.readById)
Schedules.post('/', SchedulesControllers.create)
Schedules.patch('/:id', SchedulesControllers.update)
Schedules.delete('/:id', SchedulesControllers.delete)

module.exports = Schedules
