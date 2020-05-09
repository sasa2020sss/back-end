const TopUpModel = require('../models/TopUp')
const UserDetailsModel = require('../models/Usersdetails')

module.exports = {
  create: async function (req, res) {
    const { id } = req.user
    const { nominal } = req.body
    const results = await TopUpModel.transactionTopUp(id, nominal)
    if (results) {
      const data = {
        success: true,
        msg: 'Request Top Up is succesfully',
        data: { id, ...req.body },
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: 'Failed request Top Up',
      }
      res.send(data)
    }
  },
  readById: async function (req, res) {
    const { id } = req.params
    const results = await TopUpModel.getTopUpById(id)
    if (results) {
      const data = {
        success: 'Success!',
        data: results,
      }
      res.send(data)
    }
  },
  updateStatus: async function (req, res) {
    const { id } = req.user
    const users = await UserDetailsModel.getUserDetailsById(id)
    const topup = await TopUpModel.getTopUpById(req.params.id)
    console.log('ini users', users)
    console.log('ini topup', topup)
    if (topup[0].status === 1) {
      res.send({
        success: false,
        msg: 'You must request new Top Up',
      })
    } else {
      const status = await TopUpModel.updateStatus(req.params.id)
      const newBalance = topup[0].nominal + parseInt(users.balance)
      console.log('newbalance', newBalance)
      const balance = await TopUpModel.updateBalance(id, newBalance)
      if (balance) {
        const data = {
          success: true,
          msg: 'Top up is Success',
          newBalance,
          nominal: topup[0].nominal,
        }
        res.send(data)
      } else {
        const data = {
          success: false,
          msg: 'Top up failed',
        }
        res.send(data)
      }
    }
  },
}
