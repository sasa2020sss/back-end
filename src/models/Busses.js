const db = require('../utils/db')

module.exports = {
  getBussesById: function (id) {
    return new Promise(function (resolve, reject) {
      const sql = `SELECT * FROM busses WHERE id=${id}` // beradasarkan agents bus
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
  getAllBusses: function (conditions = {}) {
    let { page, perPage, sort, search } = conditions
    sort = sort || { key: 'id', value: 1 }
    search = search || { key: '', value: '' }
    console.log('inisearchapa', search)
    const table = 'busses'
    return new Promise(function (resolve, reject) {
      const sql = `
      SELECT busses.id, busses.name, busses.class, busses.sheets, busses.price, agents.name_agents FROM ${table} JOIN agents ON 
      agents.id = busses.agents_id
      WHERE busses.name LIKE '%${search.value}%' AND busses.is_deleted=0
      ORDER BY busses.id ${sort.value ? 'ASC' : 'DESC'}
      LIMIT ${perPage} OFFSET ${(page - 1) * perPage}`
      console.log('show data', sql)
      db.query(sql, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          console.log('result', results)
          resolve(results)
        }
      })
    })
  },
  getTotalBusses: function (conditions) {
    let { search } = conditions

    search = search || { key: '', value: '' }
    const table = 'busses'
    return new Promise(function (resolve, reject) {
      const sql = `
      SELECT COUNT(*) AS total FROM ${table}
      WHERE name LIKE '${search.value}%'`
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
  createBusses: function (name, classbus, sheets, price, agentsId) {
    const table = 'busses'
    const sql = `INSERT INTO ${table} (name, class, sheets, price, agents_id) VALUES 
    ('${name}', '${classbus}', '${sheets}', '${price}', '${agentsId}')`
    console.log('data post', sql)
    return new Promise(function (resolve, reject) {
      db.query(sql, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  // UPDATE table1 SET field1=new_value1 WHERE condition
  updateBusses: function (id, name, classbus, sheets, price) {
    console.log(classbus)
    const table = 'busses'
    return new Promise(function (resolve, reject) {
      db.query(
        `UPDATE ${table} SET name='${name}', class='${classbus}', sheets='${sheets}', price='${price}' WHERE id=${id}`, // harusnya ad agents id
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
  // DELETE FROM table1 WHERE condition
  deleteBusses: function (id) {
    const table = 'busses'
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
  deleteBuss: function (id) {
    const table = 'busses'
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
