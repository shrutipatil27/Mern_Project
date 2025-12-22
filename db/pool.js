const mysql2 = require('mysql2')

const pool = mysql2.createPool({
    host: 'localhost',
    user: 'project',
    password: 'manager',
    database: 'mern_project'
})

module.exports = pool;