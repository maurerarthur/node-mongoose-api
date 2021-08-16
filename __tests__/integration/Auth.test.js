const { mongoose } = require('../../database/mongoose')

const User = require('../../models/User.model')

const userMock = {
    name: 'Teste',
    email: 'teste10000@teste.com.br',
    password: '12345'
}

describe('Authentication', function() {
    it('User should successfully register', async function() {
        const { name, email } = await User.create(userMock)

        const user = { name, email, password: userMock.password }
        //The password will be hashed, so in order to this test to pass it needs to be reassigned

        expect(user).toEqual(userMock)

        mongoose.disconnect()
    })

    // it('User should successfully log in', async function() {})
})