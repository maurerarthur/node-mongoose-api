const { mongoose } = require('../../src/database/mongoose')

describe('Database', function() {
    it('Database should successfully connect', async function() {
        const status = mongoose.connection.readyState

        expect(status).toBe(2)

        await mongoose.disconnect()
    })
})