const SchedulesModel = require('../models/Schedules')

module.exports = {
  read: async function (req, res) {
    let { page, limit, search, sort, sortBy, date } = req.query
    page = parseInt(page) || 1
    limit = parseInt(limit) || 10

    let key = search && Object.keys(search)[0]
    let value = search && Object.values(search)[0]
    search = (search && { key, value }) || { key: '', value: '' }

    // key = sort && Object.keys(sort)[0]
    // value = sort && Object.values(sort)[0]
    // sort = (sort && { key, value }) || { key: 'id', value: 1 }

    const conditions = { page, perPage: limit, search, sort, sortBy, date }
    console.log(
      req.query,
      'SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSssss'
    )
    const results = await SchedulesModel.getAllSchedules(conditions)
    const totalDataSchedules = await SchedulesModel.getTotalSchedules(
      conditions
    )
    console.log(totalDataSchedules)
    console.log(results)
    conditions.totalData = totalDataSchedules[0].total
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
    const { id } = req.params

    const results = await SchedulesModel.getSchedulesById(id)

    const data = {
      success: 'Success!',
      data: results,
    }
    res.send(data)
  },
  create: async function (req, res) {
    // if (req.user.roleId !== 2) {
    //   const data = {
    //     success: false,
    //     msg: 'Only Admin can access this feature'
    //   }
    //   res.send(data)
    // }
    console.log(req.user, 'user')
    const { date, time, routesId, bussesId, agentsId } = req.body
    console.log('iniiiiiiiii', req.body)
    const results = await SchedulesModel.createSchedules(
      date,
      time,
      routesId,
      bussesId,
      agentsId
    )
    if (results) {
      const data = {
        success: true,
        msg: 'This is succes created!!!',
        results,
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: 'Agents Not Created!!!',
      }
      res.send(data)
    }
  },
  update: async function (req, res) {
    // if (req.user.roleId !== 2) {
    //   const data = {
    //     success: false,
    //     msg: 'Only Admin can access this feature'
    //   }
    //   res.send(data)
    // }

    const { date, time, routesId, bussesId, agentsId } = req.body
    const { id } = req.params
    delete req.body.name // Apa fungsi ini???
    const results = await SchedulesModel.updateSchedules(
      date,
      time,
      routesId,
      bussesId,
      agentsId,
      id
    )
    if (results) {
      const data = {
        success: true,
        msg: `Bus with ${id}, ${time}, ${routesId}, ${agentsId}, ${bussesId} successfully updated`,
        data: { id, ...req.body },
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: `Bus with ${id}, ${time}, ${routesId}, ${agentsId}, ${bussesId} Cannot updated`,
        data: { id, ...req.body },
      }
      res.send(data)
    }
  },
  delete: async function (req, res) {
    // if (req.user.roleId !== 2) {
    //   const data = {
    //     success: false,
    //     msg: 'Only Admin can access this feature',
    //   }
    //   res.send(data)
    // }
    const { id } = req.params
    const results = await SchedulesModel.deleteBus(id)
    if (results) {
      const data = {
        success: true,
        msg: `Schedules with ${id} successfully deleted!!!`,
      }
      res.send(data)
    } else {
      const data = {
        success: true,
        msg: `Schedules with ${id} not deleted`,
      }
      res.send(data)
    }
  },
}
