const RoutesModel = require('../models/Routes')

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

    const results = await RoutesModel.getAllRoutes(conditions)
    const totalDataRoutes = await RoutesModel.getTotalRoutes(conditions)
    console.log(totalDataRoutes[0].total)
    conditions.totalData = totalDataRoutes[0].total
    conditions.totalPage = Math.ceil(conditions.totalData / conditions.perPage)
    // conditions.nextLink = (page >= conditions.totalPage ? null : process.env.APP_URI.concat(`users?page=${page + 1}`))
    // conditions.prevLink = (page <= 1 ? null : process.env.APP_URI.concat(`users?page=${page - 1}`))
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
    const { id } = req.params

    const results = await RoutesModel.getRoutesById(id)

    const data = {
      success: 'Success!',
      data: results,
    }
    res.send(data)
  },
  create: async function (req, res) {
    // if (req.user.roleId !== 1) {
    //   const data = {
    //     success: false,
    //     msg: 'Only Super Admin Can Access This Feature',
    //   }
    //   res.send(data)
    // }
    const { departure, arrival } = req.body
    const results = await RoutesModel.createRoutes(departure, arrival)
    if (results) {
      const data = {
        success: true,
        msg: `This bus departure at ${departure} - ${arrival} SUCCESS Create!`,
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: `This bus  ${departure} - ${arrival} NOT SUCCESS Create!`,
      }
      res.send(data)
    }
  },
  update: async function (req, res) {
    // if (req.user.roleId !== 1) {
    //   const data = {
    //     success: false,
    //     msg: 'Only Super Admin Can Access This Feature'
    //   }
    //   res.send(data)
    // }
    const { id } = req.params
    const { departure, arrival } = req.body
    console.log('jsjjjjjjjjjjjj', req.body)
    delete req.body.arrival
    const results = await RoutesModel.updateRoutes(id, departure, arrival)
    if (results) {
      const data = {
        success: true,
        msg: `Bus ${id} routes ${departure} - ${arrival} SUCCESS UPDATE!`,
        data: { id, ...req.body },
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: `Bus ${id} routes ${departure} - ${arrival} SUCCESS NOT UPDATE!`,
        data: { id, ...req.body },
      }
      res.send(data)
    }
  },
  delete: async function (req, res) {
    // if (req.user.roleId !== 1) {
    //   const data = {
    //     success: false,
    //     msg: 'Only Admin Can Access This Feature',
    //   }
    //   res.send(data)
    // }
    const { id } = req.params
    console.log('iniiiii id', req.params)
    const results = await RoutesModel.deleteRoutes(id)
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
