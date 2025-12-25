
// const express = require('express')
// const crypto = require('crypto')
// const pool = require('../db/pool')
// const result = require('../utils/result')

// const router = express.Router()

// router.post('/register-to-course', (req, res) => {
//     const { courseId, name, email, mobileNo } = req.body

//     const sql = `
//         INSERT INTO students(name, email, course_id, mobile_no)
//         VALUES (?,?,?,?)
//     `

//     pool.query(
//         sql,
//         [name, email, courseId, mobileNo],
//         (error, data) => {
//             res.send(result.createResult(error, data))
//         }
//     )
// })

// router.put('/change-password', (req, res) => {
//     const { newPassword, confirmPassword } = req.body
//     const email = req.headers.email   

//     if (!newPassword || !confirmPassword) {
//         return res.send(result.createResult('Password required'))
//     }

//     if (newPassword !== confirmPassword) {
//         return res.send(result.createResult('Passwords do not match'))
//     }

//     const encryptedPassword = crypto
//         .createHash('sha256')
//         .update(newPassword)
//         .digest('hex')

//     const sql = `UPDATE users SET password=? WHERE email=?`
//     pool.query(sql, [encryptedPassword, email], (error, data) => {
//         res.send(result.createResult(error, data))
//     })
// })

// router.get('/my-courses', (req, res) => {
//     const { email } = req.query

//     const sql = `
//         SELECT c.*
//         FROM courses c
//         JOIN students s ON c.course_id = s.course_id
//         WHERE s.email=?
//     `

//     pool.query(sql, [email], (error, data) => {
//         res.send(result.createResult(error, data))
//     })
// })


// router.get('/my-course-with-videos', (req, res) => {
//     const { email } = req.query

//     const sql = `
//         SELECT c.course_name, v.title, v.youtube_url
//         FROM students s
//         JOIN courses c ON s.course_id = c.course_id
//         JOIN videos v ON c.course_id = v.course_id
//         WHERE s.email=?
//     `

//     pool.query(sql, [email], (error, data) => {
//         res.send(result.createResult(error, data))
//     })
// })

// module.exports = router




const express = require('express')
const crypto = require('crypto')
const pool = require('../db/pool')
const result = require('../utils/result')

const router = express.Router()

router.post('/register-to-course', (req, res) => {
    const { courseId, name, email, mobileNo } = req.body

    const sql = `
        INSERT INTO students(name, email, course_id, mobile_no)
        VALUES (?,?,?,?)
    `

    pool.query(
        sql,
        [name, email, courseId, mobileNo],
        (error, data) => {
            res.send(result.createResult(error, data))
        }
    )
})

router.put('/change-password', (req, res) => {
    const { newPassword, confirmPassword } = req.body
    const email = req.headers.email   

    if (!newPassword || !confirmPassword) {
        return res.send(result.createResult('Password required'))
    }

    if (newPassword !== confirmPassword) {
        return res.send(result.createResult('Passwords do not match'))
    }

    const encryptedPassword = crypto
        .createHash('sha256')
        .update(newPassword)
        .digest('hex')

    const sql = `UPDATE users SET password=? WHERE email=?`
    pool.query(sql, [encryptedPassword, email], (error, data) => {
        res.send(result.createResult(error, data))
    })
})

router.get('/my-courses', (req, res) => {
    const { email } = req.query

    const sql = `
        SELECT c.*
        FROM courses c
        JOIN students s ON c.course_id = s.course_id
        WHERE s.email=?
    `

    pool.query(sql, [email], (error, data) => {
        res.send(result.createResult(error, data))
    })
})


router.get('/my-course-with-videos', (req, res) => {
    const { email } = req.query

    const sql = `
        SELECT c.course_name, v.title, v.youtube_url
        FROM students s
        JOIN courses c ON s.course_id = c.course_id
        JOIN videos v ON c.course_id = v.course_id
        WHERE s.email=?
    `

    pool.query(sql, [email], (error, data) => {
        res.send(result.createResult(error, data))
    })
})

module.exports = router