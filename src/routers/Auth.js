const Auth = require('express').Router()
const AuthControllers = require('../controllers/Auth')
const multer = require('multer')
const storage = multer.diskStorage({
  destination: 'data/',
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})
const limits = { fileSize: 2000000 }
const type = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true)
    } else {
      cb(null, false)
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
    }
  },
})

const upload = multer({ storage, type, limits })

Auth.post('/login', AuthControllers.login)
Auth.post('/register', upload.single('picture'), AuthControllers.register)
Auth.get('/verify', AuthControllers.verify)
Auth.post('/forgotpassword', AuthControllers.forgotPassword)
module.exports = Auth
