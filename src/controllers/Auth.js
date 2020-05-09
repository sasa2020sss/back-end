const jwt = require('jsonwebtoken') // kode untuk token
const bcrypt = require('bcryptjs') // encrypsi convert password ke format yg tdak mudh terbaca agar aman
const uuid = require('uuid').v4 // generat verifikasi code
const AuthModel = require('../models/Auth')
const UserDetailsModel = require('../models/Usersdetails')
const UserModel = require('../models/Users')
require('dotenv').config()

module.exports = {
  login: async function (req, res) {
    const { username, password } = req.body
    const checkUser = await AuthModel.checkUsername(username)
    if (!checkUser) {
      // kondisi untuk mngecek ada user di database ato tidak
      const data = {
        success: false,
        msg: 'Username or Password NOT INVALID',
      }
      res.send(data)
    } else {
      console.log('eoke')
      const info = await AuthModel.getUserByUsername(username) // nampil data user mngunakan nama username brdasarkan database
      const checkPassword = bcrypt.compareSync(password, info.password) // untuk convert password dari user ke database yg nntinya hadilnya kode unik
      console.log(checkPassword)
      if (checkPassword) {
        console.log('usernameoke')
        if (await AuthModel.checkVerifiedUser(info.id)) {
          if (await AuthModel.checkActivatedUser(info.id)) {
            const payload = { id: info.id, username, roleId: info.role_id }
            const options = { expiresIn: '1200m' }
            const key = process.env.APP_KEY
            const token = jwt.sign(payload, key, options)
            const data = {
              success: true,
              token,
            }
            res.send(data)
          } else {
            const data = {
              success: false,
              msg: 'User Not deactivated!',
            }
            res.send(data)
          }
        } else {
          const data = {
            success: false,
            msg: 'User is not verified!',
          }
          res.send(data)
        }
      } else {
        console.log('coba')
        const data = {
          success: false,
          msg: 'Username or Password NOT INVALID',
        }
        res.send(data)
      }
    }
  },
  register: async function (req, res) {
    try {
      console.log(req.file, 'CAAAA')
      const picture = (req.file && req.file.filename) || null
      const { username, password, name, gender, address, phone, email } = req.body
      const balance = req.body.balance || 0
      console.log(req.body)
      const checkUser = await AuthModel.checkUsername(username)
      const checkEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (checkEmail.test(email)) {
        if (checkUser !== 0) {
          const data = {
            success: false,
            msg: 'User already used',
          }
          res.send(data)
        } else {
          const encryptedPassword = bcrypt.hashSync(password)
          const results = await UserModel.createUser(username, encryptedPassword)
          const results1 = await UserDetailsModel.createUserDetails(
            picture,
            name,
            gender,
            address,
            phone,
            email,
            balance,
            results
          )
          if (results) {
            if (await AuthModel.createVerificationCode(results, uuid())) {
              const data = {
                success: true,
                msg: 'Register Successfully, Next you can Verify first',
              }
              res.send(data)
            } else {
              const data = {
                success: false,
                msg: "Verification code couldn't be generated",
              }
              res.send(data)
            }
          } else {
            const data = {
              success: false,
              msg: 'Register Failed',
            }
            res.send(data)
          }
          if (results1) {
            const data = {
              success: true,
              msg: 'Create Biodata is Success',
              results1,
            }
            res.send(data)
          }
        }
      } else {
        const data = {
          success: false,
          msg: 'Email Not Valid',
        }
        res.send(data)
      }
    } catch (error) {
      console.log(error)
    }
  },
  verify: async function (req, res) {
    const { username, code } = req.query
    if (await AuthModel.verifyUser(username, code)) {
      const data = {
        success: true,
        msg: 'User verified successfully, Now you can LOGIN!',
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: 'Failed to verify user',
      }
      res.send(data)
    }
  },
  forgotPassword: async function (req, res) {
    const { username } = req.body
    const { change } = req.query
    if (!change) {
      const user = await AuthModel.checkUsername(username)
      if (user) {
        const info = await AuthModel.getUserByUsername(username)
        const generate = await AuthModel.createVerificationCode(info.id, uuid())
        if (generate) {
          const data = {
            success: true,
            msg: 'Verification code has been sent to Email',
          }
          res.send(data)
        } else {
          const data = {
            success: false,
            msg: 'Failed to generate verification code',
          }
          res.send(data)
        }
      } else {
        const data = {
          success: false,
          msg: 'Username not found',
        }
        res.send(data)
      }
    } else {
      const { password } = req.body
      if (password === req.body.confirm_password) {
        const encryptedPassword = bcrypt.hashSync(password)
        if (await AuthModel.forgotPassword(change, encryptedPassword)) {
          const data = {
            success: true,
            msg: 'Your password has been reset',
          }
          res.send(data)
        } else {
          const data = {
            success: false,
            msg: 'Failed to reset password',
          }
          res.send(data)
        }
      } else {
        const data = {
          success: false,
          msg: "Confirm password doesn't match",
        }
        res.send(data)
      }
    }
  },
}
