const db = require('../utils/db')

module.exports = {
  getSchedulesDetail: function (id) {
    const table = 'schedules'
    return new Promise(function (resolve, reject) {
      const sql = `SELECT * FROM ${table} WHERE id='${id}'`
      console.log(sql)
      db.query(sql, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results[0])
        }
      })
    })
  },
  getSchedulesById: function (id) {
    const table = 'schedules'
    return new Promise(function (resolve, reject) {
      const sql = `SELECT routes.departure_at, routes.arrival_at, agents.name_agents, schedules.time,schedules.date, busses.name, 
      busses.class, busses.sheets, busses.price FROM ${table} JOIN routes ON routes.id = schedules.routes_id JOIN agents ON 
      agents.id = schedules.agents_id JOIN busses 
      ON busses.id = schedules.busses_id  WHERE schedules.id='${id}'`
      console.log(sql)
      db.query(sql, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results[0])
        }
      })
    })
  },
  getAllSchedules: function (conditions = {}) {
    let { page, perPage, sort, search, sortBy, date } = conditions
    sort = sort || { key: 'id', value: 1 }
    search = search || { key: '', value: '' }
    const table = 'schedules'
    return new Promise(function (resolve, reject) {
      const sql = `SELECT schedules.id, schedules.date, routes.departure_at, routes.arrival_at, agents.name_agents, schedules.time, busses.name, 
      busses.class, busses.sheets, busses.price FROM ${table} JOIN routes ON routes.id = schedules.routes_id JOIN agents ON 
      agents.id = schedules.agents_id JOIN busses 
      ON busses.id = schedules.busses_id 
      WHERE routes.departure_at LIKE '${
        search.value
      }%' AND date='${date}' AND schedules.is_deleted=0
      ORDER BY ${sortBy}  ${parseInt(sort.value) ? 'DESC' : 'ASC'}
      LIMIT ${perPage} OFFSET ${(page - 1) * perPage}`
      console.log('ini query', parseInt(sort.value), sql)
      db.query(sql, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  getTotalSchedules: function (conditions) {
    let { search } = conditions
    search = search || { key: '', value: '' }
    const table = 'schedules'
    return new Promise(function (resolve, reject) {
      const sql = `
      SELECT COUNT(*) AS total FROM ${table}
      WHERE time LIKE '${search.value}%' AND is_deleted=0`
      console.log('ini get total schedules', sql)
      db.query(sql, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          console.log(results)
          resolve(results)
        }
      })
    })
  },
  // INSERT INTO table1 (field1, field2, ...) VALUES (value1, value2, ...)
  createSchedules: function (date, time, routesId, bussesId, agentsId) {
    const table = 'schedules'
    const sql = `INSERT INTO ${table} (date, time, routes_id, busses_id, agents_id) VALUES 
    ('${date}', '${time}', '${routesId}', '${bussesId}', '${agentsId}')`
    return new Promise(function (resolve, reject) {
      db.query(sql, function (err, results, fields) {
        console.log(sql, 'kjkjkjkjkjkjkjkjkjkjkjkjkj')
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  // UPDATE table1 SET field1=new_value1 WHERE condition
  updateSchedules: function (date, time, routesId, bussesId, agentsId, id) {
    const table = 'schedules'
    const sql = `UPDATE ${table} SET date='${date}', time='${time}', routes_id='${routesId}', 
    busses_id='${bussesId}', agents_id='${agentsId}'  WHERE id=${id}`
    return new Promise(function (resolve, reject) {
      db.query(sql, function (err, results, fields) {
        console.log('updaatee scheeeeee', sql)
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  // DELETE FROM table1 WHERE condition
  deleteBusses: function (id) {
    const table = 'schedules'
    return new Promise(function (resolve, reject) {
      db.query(`DELETE FROM ${table} WHERE id=${id}`, function (
        err,
        results,
        fields
      ) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  deleteBus: function (id) {
    const table = 'schedules'
    const sql = `UPDATE ${table} SET is_deleted=1 WHERE id=${id}`
    return new Promise(function (resolve, reject) {
      db.query(sql, function (err, results, fields) {
        console.log('sql deleted deleted fdeleted', sql)
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
}
