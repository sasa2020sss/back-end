const Reservation = require('express').Router()
const ReservationControllers = require('../controllers/Reservation')
const ReservationModel = require('../models/Reservation')
const ScheduleModel = require('../models/Schedules')

Reservation.get('/all', async function (req, res) {
  try {
    let { page, limit, search, sort } = req.query
    console.log('assaaa', req.query)
    page = parseInt(page) || 1
    limit = parseInt(limit) || 10

    let key = search && Object.keys(search)[0]
    let value = search && Object.values(search)[0]
    search = (search && { key, value }) || { key: '', value: '' }

    key = sort && Object.keys(sort)[0]
    value = sort && Object.values(sort)[0]
    sort = (sort && { key, value }) || { key: 'id', value: 1 }
    const conditions = { page, perPage: limit, search, sort }
    const results = await ReservationModel.allReservation(conditions)
    const totalDataRes = await ReservationModel.totalAllReservation(conditions)
    conditions.totalData = totalDataRes[0].total
    conditions.totalPage = Math.ceil(totalDataRes[0].total / limit)
    console.log(conditions)
    delete conditions.search
    delete conditions.sort
    delete conditions.limit
    const data = {
      success: true,
      pageInfo: conditions,
      data: results,
    }
    res.send(data)
  } catch (error) {
    console.log(error)
  }
})
Reservation.get('/checkticket', ReservationControllers.checkticket)
Reservation.post('/insert', async (req, res) => {
  const idUser = req.user.id
  const { id_schedules, seat } = req.body
  const scheduleDetail = await ScheduleModel.getSchedulesDetail(id_schedules)
  const insert = await ReservationModel.createReservations(
    idUser,
    scheduleDetail.routes_id,
    id_schedules,
    scheduleDetail.agents_id,
    scheduleDetail.busses_id,
    seat
  )
  if (insert.insertId) {
    res.send({ success: true, message: 'Reservation Success' })
  } else {
    res.send({ success: false, message: 'Reservation Failed' })
  }
})

Reservation.get('/history', async (req, res) => {
  const { id } = req.user
  const allReservation = await ReservationModel.allReservationsById(id)
  // const total = await ReservationModel.totalAllReservation(conditions)
  if (allReservation) {
    res.send({ success: true, data: allReservation })
  } else {
    res.send({ success: false, message: 'No Activity' })
  }
})

Reservation.post('/order', ReservationControllers.getTransaction)
Reservation.patch(
  '/updateorder/:reservationId',
  ReservationControllers.updateticket
)
Reservation.delete(
  '/cancelorder/:reservationId',
  ReservationControllers.cancelticket
)

module.exports = Reservation
