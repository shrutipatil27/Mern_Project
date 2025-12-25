const crypto = require('crypto')
const pool = require('../db/pool')

function encryptPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex')
}

function createDefaultAdmin() {
    const email = 'admin@gmail.com'
    const password = encryptPassword('admin123')

    const sql = `SELECT email FROM users WHERE email=?`

    pool.query(sql, [email], (err, data) => {
        if (err) return

        if (data.length === 0) {
            pool.query(
                `INSERT INTO users(email,password,role) VALUES (?,?, 'ADMIN')`,
                [email, password]
            )
            console.log(' Default admin created')
        }
    })
}

module.exports = createDefaultAdmin
