const express = require('express')

const courseRouter = require('./routes/course')
const videoRouter = require('./routes/video')
const studentRouter = require('./routes/student')
const adminRouter = require('./routes/admin')

const auth = require('./utils/auth')

const app = express()
app.use(express.json())

// auth middleware
app.use(auth.authUser)

// auth routes
app.use('/auth', auth.router)

// other routes
app.use('/course', courseRouter)
app.use('/video', videoRouter)
app.use('/student', studentRouter)
app.use('/admin', adminRouter)

app.listen(4000, () => {
    console.log('Server running on port 4000')
})
