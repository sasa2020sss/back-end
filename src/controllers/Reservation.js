const ReservationsModel = require('../models/Reservation')
const SchedulesModel = require('../models/Schedules')
const UserModel = require('../models/Users')
const UserDetailsModel = require('../models/Usersdetails')

module.exports = {
  checkticket: async function (req, res) {
    const { reservationId } = req.params
    const results = await ReservationsModel.checkReservatian(reservationId)
    if (results) {
      const data = {
        success: true,
        msg: 'This is Your Ticket Reservation',
        results,
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: 'You haven/t made ticket Reservation',
      }
      res.send(data)
    }
  },
  getTransaction: async function (req, res) {
    console.log('ini req.user', req.user)
    // const {id} = req.user || (req.user.id)
    const { id } = req.user
    const { routesId, bussesId, agentsId, schedulesId, seat } = req.body
    console.log(req.body.reservationId)
    console.log(req.user)
    const price = await SchedulesModel.getSchedulesById(schedulesId)
    const userSaldo = await UserModel.getUserDetailByUserId(id)
    const scheduleDetail = await SchedulesModel.getSchedulesDetail(schedulesId)
    console.log('ini price', scheduleDetail)
    console.log('ini saldo', userSaldo[0].balance)
    if (price.price > userSaldo[0].balance) {
      res.send({
        msg: 'less balance',
      })
    } else {
      const newSaldo = parseInt(userSaldo[0].balance) - parseInt(price.price)
      console.log('ini router saldo', id, newSaldo)
      const hasil = await UserDetailsModel.updateSaldo(id, newSaldo)
      if (hasil) {
        // console.log('ini hasil salod', hasil)
        const results = await ReservationsModel.createReservations(
          id,
          scheduleDetail.routes_id,
          schedulesId,
          scheduleDetail.agents_id,
          scheduleDetail.busses_id,
          seat
        )
        const detailsReservations = await ReservationsModel.dataReservations(
          results.insertId
        )
        console.log('sssssssssssssssss', results)
        console.log(
          'resrvasiiiiiiiiiiiiiiiiiiiiiiiiiiiiii',
          detailsReservations
        )
        if (results) {
          const data = {
            success: true,
            msg:
              'Your reservation is successfully, please check your order is correct, before making payment',
            data: req.body,
            detailsReservations: results.insertId,
          }
          res.send(data)
        } else {
          const data = {
            success: false,
            msg: 'Busses Not Created!!!',
          }
          res.send(data)
        }
      }
    }
  },
  updateticket: async function (req, res) {
    const { reservationId } = req.params
    const { routesId, bussesId, agentsId, schedulesId } = req.body
    console.log('ini req body', req.body)
    delete req.body.code
    const results = await ReservationsModel.updateReservation(
      reservationId,
      routesId,
      bussesId,
      agentsId,
      schedulesId
    )
    if (results) {
      const data = {
        success: true,
        msg: 'Your Ticket succesfully updated',
        data: { reservationId, ...req.body },
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: 'Your Ticket failed to update, please correct correctly',
        data: req.body,
      }
      res.send(data)
    }
  },
  cancelticket: async function (req, res) {
    const { reservationId } = req.params
    const results = await ReservationsModel.cancelReservation(reservationId)
    if (results) {
      const data = {
        success: true,
        msg: `Order ticket with ${reservationId} succesfully cancel!!`,
      }
      res.send(data)
    } else {
      const data = {
        success: true,
        msg: `Order ticket with ${reservationId} not avaiable`,
      }
      res.send(data)
    }
  },
}
