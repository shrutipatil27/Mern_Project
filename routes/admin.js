// const express = require('express')
// const pool = require('../db/pool')
// const result = require('../utils/result')

// const router = express.Router()

// router.get('/enrolled-students', (req, res) => {
//     const { courseId } = req.query
//     const sql = `
//         SELECT name, email, mobile_no
//         FROM students
//         WHERE course_id=?
//     `
//     pool.query(sql, [courseId], (error, data) => {
//         res.send(result.createResult(error, data))
//     })
// })

// module.exports = router





const express = require('express')
const pool = require('../db/pool')
const result = require('../utils/result')
const { authorizeRoles } = require('../utils/auth')

const router = express.Router()

router.get('/enrolled-students', authorizeRoles('ADMIN'), (req, res) => {
    const { courseId } = req.query

    pool.query(
        `SELECT name,email,mobile_no FROM students WHERE course_id=?`,
        [courseId],
        (error, data) => res.send(result.createResult(error, data))
    )
})

module.exports = router