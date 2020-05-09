const db = require('../utils/db')

module.exports = {
  transactionTopUp: function (id, nominal) {
    const table = 'topup'
    return new Promise(function (resolve, reject) {
      const sql = `INSERT INTO ${table} (users_id, nominal) VALUES (${id}, ${nominal})`
      db.query(sql, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  getTopUpById: function (id) {
    const table = 'topup'
    return new Promise(function (resolve, reject) {
      const sql = `SELECT * FROM ${table} WHERE id=${id}`
      db.query(sql, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          console.log('test', results)
          resolve(results)
        }
      })
    })
  },
  updateStatus: function (id) {
    const table = 'topup'
    return new Promise(function (resolve, reject) {
      const sql = `UPDATE ${table} SET status=1 WHERE id=${id}`
      db.query(sql, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  updateBalance: function (id, balance) {
    const table = 'users_details'
    return new Promise(function (resolve, reject) {
      const sql = `UPDATE ${table} SET balance=${balance} WHERE users_id=${id}`
      db.query(sql, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
}
