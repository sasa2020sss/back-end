const db = require('../utils/db')

module.exports = {
  getRoutesById: function (id) {
    return new Promise(function (resolve, reject) {
      const sql = `SELECT * FROM routes WHERE id=${id}`
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

  getAllRoutes: function (conditions = {}) {
    let { page, perPage, sort, search } = conditions
    sort = sort || { key: 'id', value: 1 }
    search = search || { key: '', value: '' }
    const table = 'routes'
    return new Promise(function (resolve, reject) {
      const sql = `
      SELECT * FROM ${table}
      WHERE routes.departure_at LIKE '%${search.value}%' AND routes.is_deleted=0
      ORDER BY routes.id ${sort.value ? 'ASC' : 'DESC'}
      LIMIT ${perPage} OFFSET ${(page - 1) * perPage}`
      console.log(sql)
      db.query(sql, function (err, results, fields) {
        console.log('sql search', sql)
        if (err) {
          reject(err)
        } else {
          console.log(results)
          resolve(results)
        }
      })
    })
  },

  getTotalRoutes: function (conditions) {
    let { search } = conditions
    search = search || { key: '', value: '' }
    const table = 'routes'
    return new Promise(function (resolve, reject) {
      const sql = `
      SELECT COUNT(*) AS total FROM ${table}
      WHERE departure_at LIKE '${search.value}%'`
      console.log(sql)
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
  createRoutes: function (departure, arrival) {
    const table = 'routes'
    return new Promise(function (resolve, reject) {
      db.query(
        `INSERT INTO ${table} (departure_at, arrival_at) VALUES
      ('${departure}', '${arrival}')`,
        function (err, results, fields) {
          if (err) {
            reject(err)
          } else {
            resolve(results)
          }
        }
      )
    })
  },
  // UPDATE table1 SET field1=new_value1 WHERE condition
  updateRoutes: function (id, departure, arrival) {
    const table = 'routes'
    const sql = `UPDATE ${table} SET departure_at='${departure}', arrival_at='${arrival}' WHERE id=${id}`
    return new Promise(function (resolve, reject) {
      console.log('sql update routes', sql)
      db.query(sql, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  // DELETE FROM table1 WHERE condition
  // deleteRoutes: function (id) {
  //   const table = 'routes'
  //   return new Promise(function (resolve, reject) {
  //     db.query(`DELETE FROM ${table} WHERE id=${id}`, function (
  //       err,
  //       results,
  //       fields
  //     ) {
  //       if (err) {
  //         reject(err)
  //       } else {
  //         resolve(results)
  //       }
  //     })
  //   })
  // },

  deleteRoutes: function (id) {
    const table = 'routes'
    const sql = `UPDATE ${table} SET is_deleted=1 WHERE id=${id}`
    return new Promise(function (resolve, reject) {
      db.query(sql, function (err, results, fields) {
        console.log(sql)
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
}

// LIMIT ${perPage}
