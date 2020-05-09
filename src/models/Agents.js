const db = require('../utils/db')

module.exports = {
  getAgentsById: function (id) {
    return new Promise(function (resolve, reject) {
      const sql = `SELECT * FROM agents WHERE id=${id}` // beradasarkan agents bus
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

  getAllAgents: function (conditions = {}) {
    let { page, perPage, sort, search } = conditions
    page = page || 1
    perPage = perPage || 5
    sort = sort || { key: 'id', value: 1 }
    search = search || { key: '', value: '' }
    const table = 'agents'
    return new Promise(function (resolve, reject) {
      const sql = `
      SELECT busses.id, busses.name, busses.class, agents.name_agents FROM agents JOIN busses ON 
      busses.id = agents.id
      WHERE agents.name_agents LIKE '%${search.value}%'
      ORDER BY id ${sort.value ? 'ASC' : 'DESC'}
      LIMIT ${perPage} OFFSET ${(page - 1) * perPage}`
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
  getTotalAgents: function (conditions) {
    let { page, perPage, sort, search } = conditions
    page = page || 1
    perPage = perPage || 5
    sort = sort || { key: 'id', value: 1 }
    search = search || { key: '', value: '' }
    const table = 'agents'
    return new Promise(function (resolve, reject) {
      const sql = `
      SELECT COUNT(*) AS total FROM ${table}
      WHERE name_agents LIKE '${search.value}%'`
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
  createAgents: function (name) {
    const table = 'agents'
    const sql = `INSERT INTO ${table} (name_agents) VALUES 
    ('${name}')`
    return new Promise(function (resolve, reject) {
      db.query(sql, function (err, results, fields) {
        console.log('ini create', sql)
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  // UPDATE table1 SET field1=new_value1 WHERE condition
  updateAgents: function (id, name) {
    const table = 'agents'
    const sql = `UPDATE ${table} SET name_agents='${name}' WHERE id=${id}`
    return new Promise(function (resolve, reject) {
      db.query(sql, function (err, results, fields) {
        console.log('ini sql update', sql)
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  // DELETE FROM table1 WHERE condition
  deleteAgents: function (id) {
    const table = 'agents'
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
}
