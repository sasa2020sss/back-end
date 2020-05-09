<h1 align="center">ExpressJS - Simple Notes App RESTfull API</h1>



Note App is a simple note application specially for backend only. Built with NodeJs using the ExpressJs Framework.
Express.js is a web application framework for Node.js. [More about Express](https://en.wikipedia.org/wiki/Express.js)
## Built With
[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.10.16-green.svg?style=rounded-square)](https://nodejs.org/)

## Requirements
1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)

## How to run the app ?
1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
5. Create a database with the name shuttlebus_id, and Import file [note.sql](note.sql) to **phpmyadmin**
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.(localhost:8000)
8. You can see all the end point [here](#end-point)

## Set up .env file
Open .env file on your favorite code editor, and copy paste this code below :
```
PORT=8000
KEY=AYAKO
HOST=localhost
USER=root
PASS=
DATABASE=shuttlebus_id

```

## End Point
**1. GET**
* /users
* /busses
* /agents
* /routes
* /userdetails
* /schedules?page&limit&search&sort
* /auth/register
* /auth/verify?username=&code=
* /reservations/checkticket


**2. POST**
* /busses
    
* ``` { "name": "namabus" , "classbus":"eksekutif", "sheets":8}``` 
    
* /agents

    ```{"name": "Agent Perwira"}```

* /routes

    ```{"departure": "Jakarta", "arrival":"Bandung"}
    {"departure": "Jakarta", "arrival":"Bandung"}
    ```

* /schedules

    ```{"time":"16:00:00", "routesId":10, "bussesId":2, "agentsId": 3}``

* /auth/register

    ``{"picture" : "png", "name": "Leo", "gender":"Female", "address":"Bogor", "phone":"089765432243", "email":"leo@gmail.com", "username":"Leoxx", "password":"Leo123"}``

* /auth/login

    ``{"username" : "Leoxx", "password":"Leo123"}``

* /auth/forgotpassword

    ``{"username" : "Leoxx"}``

* /auth/forgotpassword

    ``{"change" : "verify code"} (req.params)``

    ``"password": "qwe12", "confirm password":"qwe12" (req.body``)

* /reservations/order

    ``{"routesId":3, "agentsId":5, "bussesId":4, "schedulesId":2} (req.body)``

**3. PATCH**

* `/busses/:id`
   
   * ``` { "nama": "namabus", "classbus": "ekonomi", "sheets": 2 } ```
   
* /agents/:id

   ```{"name": "nama agents"}```

* /routes/:id

   ```{"departure":"Jakarta", "arrival":"Bandung"}```

* /userdetails/:id

   ```{"name":"Aya", "gender":"female", "address":"Purwokerto", "phone":"087654456765", "email":"aya@gmail.com"}``

* /sch'edules/:id

   ```{"time":"16:00:00"}``

* reservations/updateorder

   * ```` { "routesId": 1 , "bussesId": 2, "agentsId": 3, "schedulesId":1} 
     { "routesId": 1 , "bussesId": 2, "agentsId": 3, "schedulesId":1}
     ````

**4. DELETE**

* /users/:id

* /busses/:id` (Delete note by id)

* /agents/:id (Delete category by id)

* /routes/:id

* /userdetails/:id

* /schedules/:id

* /reservations/cancelorder

  