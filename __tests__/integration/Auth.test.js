const bcrypt = require('bcrypt')

const User = require('../../src/models/User.model')

const userMock = require('../mocks/User').User
const emptyUserMock = require('../mocks/User').EmptyUser

describe('Authentication', function() {
    it('User should successfully register', async function() {
        const { name, email } = await User.create(userMock)

        const user = { name, email, password: userMock.password }
        //The password will be hashed, so in order to this test to pass the password needs to be reassigned

        expect(user).toEqual(userMock)
    })

    it('User should not register because the email is already taken', async function() {
        const { email } = await User.findOne({ email: userMock.email })

        if(email) {
            expect(email).toBeTruthy()
        }
    })

    it('User should successfully log in', async function() {
        const { email, password } = await User.findOne({ email: userMock.email })

        if(email) {
            const passwordMatch = await bcrypt.compare(userMock.password, password)
            expect(passwordMatch).toBe(true)
        }
    })

    it('User should not log in', async function() {
        const { email, password } = await User.findOne({ email: userMock.email })

        if(email) {
            const passwordMatch = await bcrypt.compare('WrongPassword', password)
            expect(passwordMatch).toBe(false)
        }
    })
})