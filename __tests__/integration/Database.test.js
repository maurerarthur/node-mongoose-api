const { mongoose } = require('../../src/database/mongoose')

describe('Database', function() {
    it('Database should successfully connect', async function() {
        mongoose.connection.on('connected', function() {
            const status = mongoose.connection.readyState
            expect(status).toBe(1)
        })

        await mongoose.disconnect()
    })
})