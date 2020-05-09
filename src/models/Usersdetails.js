const db = require('../utils/db')

module.exports = {
  getUserDetailsById: function (id) {
    const table = 'users_details'
    return new Promise(function (resolve, reject) {
      const sql = `SELECT * FROM ${table} WHERE users_id=${id}`
      console.log(sql)
      db.query(sql, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          if (results.length) {
            resolve(results[0])
          } else {
            resolve(false)
          }
        }
      })
    })
  },
  getAllUserDetails: function (conditions = {}) {
    let { page, perPage, sort, search } = conditions
    sort = sort || { key: 'id', value: 1 }
    search = search || { key: '', value: '' }
    const table = 'users_details'
    return new Promise(function (resolve, reject) {
      const sql = `SELECT * FROM ${table}
      WHERE name LIKE '${search.value}%'
      ORDER by id ${sort.value ? 'ASC' : 'DESC'}
      LIMIT ${perPage} OFFSET ${(page - 1) * perPage}`
      console.log('showdata usersdet', sql)
      db.query(sql, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  getTotalUsersDetails: function (conditions) {
    let { search } = conditions
    search = search || { key: '', value: '' }
    const table = 'users_details'
    return new Promise(function (resolve, reject) {
      const sql = `SELECT COUNT(*) AS total FROM ${table}
          WHERE name LIKE '${search.value}%'`
      console.log('ini total data', sql)
      db.query(sql, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  createUserDetails: function (
    picture,
    name,
    gender,
    address,
    phone,
    email,
    balance,
    usersId
  ) {
    const table = 'users_details'
    picture = typeof picture === 'string' ? `'${picture}'` : picture
    return new Promise(function (resolve, reject) {
      const sql = `INSERT INTO ${table} (picture, name, gender, address, phone, email, balance, users_id) VALUES
      (${picture}, '${name}', '${gender}', '${address}', '${phone}', '${email}', '${balance}', '${usersId}')`
      db.query(sql, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  updateSaldo: function (idketikapanggil, saldosaldoan) {
    const table = 'users_details'
    return new Promise(function (resolve, reject) {
      const sql = `UPDATE ${table} SET balance='${saldosaldoan}' WHERE users_id=${idketikapanggil}`
      console.log(sql)
      db.query(sql, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  updateUserDetails: function (id, name, address, phone, email) {
    const table = 'users_details'
    const sql = `UPDATE ${table} SET name='${name}', address='${address}',
    phone='${phone}', email='${email}' WHERE users_id=${id}`
    console.log('asdadada', sql)
    return new Promise(function (resolve, reject) {
      db.query(sql, function (err, results, fields) {
        if (err) {
          console.log(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  updatePicture: function (id, picture) {
    const table = 'users_details'
    picture = typeof picture === 'string' ? `'${picture}'` : picture
    const sql = `UPDATE ${table} SET picture= ${picture} WHERE users_id=${id}`
    console.log(sql)
    return new Promise(function (resolve, reject) {
      db.query(sql, function (err, results, fields) {
        if (err) {
          console.log(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  deleteUserDetails: function (id) {
    const table = 'users_details'
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
