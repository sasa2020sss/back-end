const UserModel = require('../models/Users')
const bcrypt = require('bcryptjs')

module.exports = {
  read: async function (req, res) {
    if (req.user.roleId !== 1) {
      const data = {
        success: false,
        msg: 'Only Super Admin can access this feature'
      }
      res.send(data)
    }
    const results = await UserModel.getAllUser()
    if (results) {
      const data = {
        success: true,
        msg: 'You gotta GET Method',
        results
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: 'Not Available'
      }
      res.send(data)
    }
  },
  create: async function (req, res) {
    const { username, password } = req.body
    const convertPassword = await bcrypt.hashSync(password)
    const results = await UserModel.createUser(username, convertPassword)
    delete req.body.password
    if (results) {
      const data = {
        success: true,
        msg: `Hay, ${username}!`
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: 'User not created'
      }
      res.send(data)
    }
  },
  update: async function (req, res) {
    const { id } = req.params
    const { username, password } = req.body// buat database buat dlu usermodel
    delete req.body.password
    const results = await UserModel.updateUser(id, username, password)
    delete req.body.password
    console.log(req.body)
    if (results) {
      const data = {
        success: true,
        msg: `Account with ${id}, ${username}, and ${password} successfully UPDATE`,
        data: { id, ...req.body }
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: `Account with ${id}, ${username}, and ${password} successfully UPDATE`,
        data: { id, ...req.body }
      }
      res.send(data)
    }
  },
  delete: async function (req, res) {
    const { id } = req.params
    const results = await UserModel.deleteUser(id)
    if (results) {
      const data = {
        success: true,
        msg: `Account with ${id} successfully deleted`
      }
      res.send(data)
    } else {
      const data = {
        success: true,
        msg: `Account with ${id} not deleted`
      }
      res.send(data)
    }
  }
}
