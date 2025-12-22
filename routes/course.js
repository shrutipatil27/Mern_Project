const express = require('express')
const pool = require('../db/pool')
const result = require('../utils/result')

const router = express.Router()

router.get('/all-active-courses', (req, res) => {
    const sql = `
        SELECT * FROM courses
        WHERE CURDATE() BETWEEN start_date AND end_date
    `
    pool.query(sql, (error, data) => {
        res.send(result.createResult(error, data))
    })
})

router.get('/all-courses', (req, res) => {
    const { startDate, endDate } = req.query
    const sql = `
        SELECT * FROM courses
        WHERE start_date >= ? AND end_date <= ?
    `
    pool.query(sql, [startDate, endDate], (error, data) => {
        res.send(result.createResult(error, data))
    })
})

router.post('/add', (req, res) => {
    const { courseName, description, fees, startDate, endDate, videoExpireDays } = req.body
    const sql = `
        INSERT INTO courses
        (course_name, description, fees, start_date, end_date, video_expire_days)
        VALUES (?,?,?,?,?,?)
    `
    pool.query(sql,
        [courseName, description, fees, startDate, endDate, videoExpireDays],
        (error, data) => {
            res.send(result.createResult(error, data))
        }
    )
})

router.put('/update/:courseId', (req, res) => {
    const { courseId } = req.params
    const { courseName, description, fees, startDate, endDate, videoExpireDays } = req.body

    const sql = `
        UPDATE courses SET
        course_name=?, description=?, fees=?,
        start_date=?, end_date=?, video_expire_days=?
        WHERE course_id=?
    `
    pool.query(sql,
        [courseName, description, fees, startDate, endDate, videoExpireDays, courseId],
        (error, data) => {
            res.send(result.createResult(error, data))
        }
    )
})

router.delete('/delete/:courseId', (req, res) => {
    const sql = 'DELETE FROM courses WHERE course_id=?'
    pool.query(sql, [req.params.courseId], (error, data) => {
        res.send(result.createResult(error, data))
    })
})

module.exports = router