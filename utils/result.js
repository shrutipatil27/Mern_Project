function createResult(error, data) {
    if (error) {
        return { status: 'error', error }
    } else {
        return { status: 'success', data }
    }
}

module.exports = { createResult }