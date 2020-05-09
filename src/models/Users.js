const db = require('../utils/db')

module.exports = {
  getAllUser: function () {
    const table = 'users'
    return new Promise(function (resolve, reject) {
      db.query(`SELECT * FROM ${table}`, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  getUserDetailByUserId: function (id) {
    const table = 'users'
    const sql = `SELECT users_details.balance FROM users_details WHERE users_details.users_id =${id}`
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
  createUser: function (username, password, roleId) {
    roleId = roleId || 3
    const table = 'users'
    const query = `INSERT INTO ${table} ( username, password, role_id, is_active, is_verified ) VALUES ('${username}', '${password}', ${roleId}, 1, 1)`
    return new Promise(function (resolve, reject) {
      db.query(query, function (err, results, fields) {
        console.log(query)
        if (err) {
          reject(err)
        } else {
          resolve(results.insertId)
        }
      })
    })
  },
  updateUser: function (id, username, password) {
    const table = 'users'
    return new Promise(function (resolve, reject) {
      db.query(
        `UPDATE ${table} SET username='${username}',
      password='${password}' WHERE id=${id}`,
        function (err, results, fields) {
          if (err) {
            console.log(err)
          } else {
            resolve(results)
          }
        }
      )
    })
  },
  deleteUser: function (id) {
    const table = 'users'
    return new Promise(function (resolve, reject) {
      db.query(`DELETE FROM ${table} WHERE id=${id}`, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
}
