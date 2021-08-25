const faker = require('faker')

module.exports = {
    User: {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password()
    },

    EmptyUser: {
        name: '',
        email: '',
        password: ''
    }
}