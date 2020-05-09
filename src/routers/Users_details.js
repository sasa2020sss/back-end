const UsersDetail = require('express').Router()
const UsersDetailControllers = require('../controllers/Users_details')
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

UsersDetail.get('/', UsersDetailControllers.read)
UsersDetail.get('/myprofile/', UsersDetailControllers.readById)
UsersDetail.post('/', UsersDetailControllers.create)
UsersDetail.patch('/', UsersDetailControllers.update)
UsersDetail.put(
  '/updatepicture',
  upload.single('picture'),
  UsersDetailControllers.updatePicture
)
UsersDetail.delete('/:id', UsersDetailControllers.delete)

module.exports = UsersDetail
