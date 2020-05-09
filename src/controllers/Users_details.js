const UserDetailsModel = require('../models/Usersdetails')

module.exports = {
  read: async function (req, res) {
    let { page, limit, search, sort } = req.query
    page = parseInt(page) || 1
    limit = parseInt(limit) || 10

    let key = search && Object.keys(search)[0]
    let value = search && Object.values(search)[0]
    search = (search && { key, value }) || { key: '', value: '' }

    key = sort && Object.keys(sort)[0]
    value = sort && Object.values(sort)[0]
    sort = (sort && { key, value }) || { key: 'id', value: 1 }
    const conditions = { page, perPage: limit, search, sort }

    const results = await UserDetailsModel.getAllUserDetails(conditions)
    const totalDataUsersDetails = await UserDetailsModel.getTotalUsersDetails(
      conditions
    )
    console.log(totalDataUsersDetails)
    console.log(results)
    conditions.totalData = totalDataUsersDetails[0].total
    conditions.totalPage = Math.ceil(conditions.totalData / conditions.perPage)
    delete conditions.search
    delete conditions.sort
    delete conditions.limit

    const data = {
      success: 'Success!',
      pageInfo: conditions,
      data: results,
    }
    res.send(data)
  },
  readById: async function (req, res) {
    console.log('ini requser', req.user)
    const { id } = req.user
    const results = await UserDetailsModel.getUserDetailsById(id)
    console.log(results)
    if (results) {
      const data = {
        success: 'Success!',
        data: results,
      }
      res.send(data)
    }
  },
  create: async function (req, res) {
    if (req.user.roleId !== 3) {
      const data = {
        success: false,
        msg: 'Only General User/Consument can access this feature',
      }
      res.send(data)
    }
    console.log(req.file)
    const results = await UserDetailsModel.getUserDetailsById(id)
    if (results) {
      const data = {
        success: true,
        msg: 'can acces this fitur',
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: 'cannot acces',
      }
      res.send(data)
    }
  },
  update: async function (req, res) {
    // if (req.user.roleId !== 3) {
    //   const data = {
    //     success: false,
    //     msg: 'Only General User/Consument can access this feature',
    //   }
    //   res.send(data)
    // }

    const { id } = req.user
    const { name, address, phone, email } = req.body
    delete req.body.arrival
    const results = await UserDetailsModel.updateUserDetails(
      id,

      name,

      address,
      phone,
      email
    )
    if (results) {
      const data = {
        success: true,
        msg: `${name},${address}, ${phone}, ${email} SUCCESS UPDATE!`,
        data: { id, ...req.body },
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: `${name}, ${address}, ${phone}, ${email} SUCCESS NOT UPDATE!`,
        data: { id, ...req.body },
      }
      res.send(data)
    }
  },
  updatePicture: async function (req, res) {
    const picture = (req.file && req.file.filename) || null
    const { id } = req.user
    console.log(req.user)
    console.log(req.file, 'llllllllllllllllllllllllllllllllllll')
    const results = await UserDetailsModel.updatePicture(id, picture)
    console.log('picture', results)
    if (results) {
      const data = {
        success: true,
        msg: `${picture} SUCCESS UPDATE!`,
        data: results,
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: `${picture} SUCCESS NOT UPDATE!`,
        data: results,
      }
      res.send(data)
    }
  },
  delete: async function (req, res) {
    if (req.user.roleId !== 1) {
      const data = {
        success: false,
        msg: 'Only Super Admin can access this feature',
      }
      res.send(data)
    }
    const { id } = req.params
    const results = await UserDetailsModel.deleteUserDetails(id)
    if (results) {
      const data = {
        success: true,
        msg: `Routes with ${id} successfully deleted!!!`,
      }
      res.send(data)
    } else {
      const data = {
        success: true,
        msg: `Routes with ${id} not deleted`,
      }
      res.send(data)
    }
  },
}
