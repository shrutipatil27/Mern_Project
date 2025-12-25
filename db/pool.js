const mysql2 = require('mysql2')

const pool = mysql2.createPool({
    host: '172.27.165.220',
    user: 'project',
    password: 'manager',
    database: 'mern_project'
})

module.exports = pool;