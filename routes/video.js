// const express = require('express')
// const pool = require('../db/pool')
// const result = require('../utils/result')

// const router = express.Router()

// router.get('/all-videos', (req, res) => {
//     const { courseId } = req.query
//     const sql = "SELECT * FROM videos WHERE course_id=?"
//     pool.query(sql, [courseId], (error, data) => {
//         res.send(result.createResult(error, data))
//     })
// })

// router.post('/add', (req, res) => {
//     const { courseId, title, youtubeURL, description } = req.body
//     const sql = `
//         INSERT INTO videos(course_id, title, youtube_url, description, added_at)
//         VALUES (?,?,?,?,CURDATE())
//     `
//     pool.query(sql,
//         [courseId, title, youtubeURL, description],
//         (error, data) => {
//             res.send(result.createResult(error, data))
//         }
//     )
// })

// router.put('/update/:videoId', (req, res) => {
//     const { videoId } = req.params
//     const { courseId, title, youtubeURL, description } = req.body

//     const sql = `
//         UPDATE videos SET
//         course_id=?, title=?, youtube_url=?, description=?
//         WHERE video_id=?
//     `
//     pool.query(sql,
//         [courseId, title, youtubeURL, description, videoId],
//         (error, data) => {
//             res.send(result.createResult(error, data))
//         }
//     )
// })

// // DELETE /video/delete/:videoId
// router.delete('/delete/:videoId', (req, res) => {
//     pool.query(
//         "DELETE FROM videos WHERE video_id=?",
//         [req.params.videoId],
//         (error, data) => {
//             res.send(result.createResult(error, data))
//         }
//     )
// })

// module.exports = router


const express = require('express')
const pool = require('../db/pool')
const result = require('../utils/result')
const { authorizeRoles } = require('../utils/auth')

const router = express.Router()

// GET /video/all-videos
router.get('/all-videos', (req, res) => {
    const { courseId } = req.query
    pool.query(
        "SELECT * FROM videos WHERE course_id = ?",
        [courseId],
        (error, data) => res.send(result.createResult(error, data))
    )
})

router.post('/add', authorizeRoles('ADMIN'), (req, res) => {
    const { courseId, title, youtubeURL, description } = req.body

    pool.query(
        `INSERT INTO videos(course_id,title,youtube_url,description,added_at)
         VALUES (?,?,?,?,CURDATE())`,
        [courseId, title, youtubeURL, description],
        (error, data) => res.send(result.createResult(error, data))
    )
})

router.put('/update/:videoId', authorizeRoles('ADMIN'), (req, res) => {
    const { videoId } = req.params
    const { courseId, title, youtubeURL, description } = req.body

    pool.query(
        "UPDATE videos SET course_id=?,title=?,youtube_url=?,description=? WHERE video_id=?",
        [courseId, title, youtubeURL, description, videoId],
        (error, data) => res.send(result.createResult(error, data))
    )
})

router.delete('/delete/:videoId', authorizeRoles('ADMIN'), (req, res) => {
    pool.query(
        "DELETE FROM videos WHERE video_id=?",
        [req.params.videoId],
        (error, data) => res.send(result.createResult(error, data))
    )
})

module.exports = router