const db = require('../utils/db')

const check = function (err, results, fields) {
  if (err) {
    throw err
  }
  console.log(results)
  console.log(fields)
}
db.query(`
  CREATE TABLE roles(
    id INT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(30) NOT NULL,
    name VARCHAR(60) NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
  )
`, function () {
  db.query(`
    INSERT INTO roles (code,name,description) VALUES
    ('superadmin', 'Super Administrator', 'This is a Superuser can access all feature on the application'),
    ('admin', 'Administrator', 'This is administrator with elevated access'),
    ('user', 'General User', 'This is general user')
  `, check)
})

db.query(`
  CREATE TABLE users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    picture TEXT,
    username VARCHAR(60) NOT NULL,
    password VARCHAR(60) NOT NULL,
    verification_code VARCHAR(37),
    is_active TINYINT(2) DEFAULT 0,
    is_verified TINYINT(2) DEFAULT 0,
    role_id INT DEFAULT 3,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
  )
`, check)

db.query(`
CREATE TABLE users_details (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  gender VARCHAR(10) NOT NULL,
  address VARCHAR(60), NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(30),
  role_id INT DEFAULT 3,
  FOREIGN KEY (role_id) REFERENCES roles(id),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
)
`, check)

db.query(`
  CREATE TABLE routes(
    id INT PRIMARY KEY AUTO_INCREMENT,
    departure_at VARCHAR(30) NOT NULL,
    arrival_at VARCHAR(30) NOT NULL,
    agents_id INT, 
    FOREIGN KEY (agents_id) REFERENCES agents(id),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP)`, check)

db.query(`
CREATE TABLE agents(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(60) NOT NULL,
  users_id INT, 
  FOREIGN KEY (users_id) REFERENCES users(id),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP)`, check)

db.query(`
  CREATE TABLE busses(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(60) NOT NULL,
    class VARCHAR(30), NOT NULL,
    sheets VARCHAR(10), INT,
    agents_id INT,
    FOREIGN KEY (agents_id) REFERENCES agents(id),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP)`, check)

db.query(`
CREATE TABLE schedules (
  id INT PRIMARY KEY AUTO_INCREMENT,
  time TIME,
  routes_id INT,
  busses_id INT,
  agents_id INT,
  FOREIGN KEY (routes_id) REFERENCES routes(id),
  FOREIGN KEY (busses_id) REFERENCES busses(id),
  FOREIGN KEY (agents_id) REFERENCES agents(id),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP)`, check)

db.query(`
  CREATE TABLE reservations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usersdetails_id INT,
    schedules_id INT,
    FOREIGN KEY (userdetails_id) REFERENCES userdetails(id),
    FOREIGN KEY (schedules_id) REFERENCES schedules(id),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP)
  )`, check)
