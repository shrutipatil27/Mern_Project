const express = require('express')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const pool = require('../db/pool')
const result = require('../utils/result')
const config = require('../utils/config')

const router = express.Router()

// password encryption
function encryptPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex')
}

/* AUTH MIDDLEWARE*/
function authUser(req, res, next) {

    const allowedUrls = ['/auth/login', '/auth/signup']

    if (allowedUrls.includes(req.url)) {
        return next()
    }

    const token = req.headers.token
    if (!token) {
        return res.send(result.createResult('Token is missing'))
    }

    try {
        const payload = jwt.verify(token, config.SECRET)

        req.headers.email = payload.email
        req.headers.role = payload.role

        next()
    } catch (err) {
        console.log(err) // debug
        return res.send(result.createResult('Token is invalid'))
    }
}

/*LOGIN*/
router.post('/login', (req, res) => {
    const { email, password } = req.body
    const encryptedPassword = encryptPassword(password)

    const sql = `
        SELECT email, role
        FROM users
        WHERE email=? AND password=?
    `

    pool.query(sql, [email, encryptedPassword], (error, data) => {
        if (error) {
            return res.send(result.createResult(error))
        }

        if (data.length === 0) {
            return res.send(result.createResult('Invalid email or password'))
        }

        const user = data[0]

        const token = jwt.sign(
            { email: user.email, role: user.role },
            config.SECRET,
            { expiresIn: '2h' }
        )

        res.send(result.createResult(null, { token }))
    })
})

/*SIGNUP*/
router.post('/signup', (req, res) => {
    const { email, password, role } = req.body
    const encryptedPassword = encryptPassword(password)

    const sql = `
        INSERT INTO users(email, password, role)
        VALUES (?,?,?)
    `

    pool.query(sql, [email, encryptedPassword, role], (error, data) => {
        res.send(result.createResult(error, data))
    })
})

module.exports = {
    router,
    authUser
}
