const delay = require('delay')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const should = chai.should()
const request = require('supertest')
const User = require('../db/models/User.js')

chai.use(chaiHttp)

/** testing subscriber route **/

describe('/GET subscriber', () => {
    it('it should Get all subscribers', (done) => {
        chai.request(app)
            .get('/subscribers')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                done()
            })
    })
})

describe('/POST subscriber', () => {
    it('it sould post the subscriber info', async() => {
        await delay(1000)
        const subscriber = {
            email: 'example@gmail.com'
        }

        chai.request(app)
            .post('/subscribe')
            .send(subscriber)
            .end((err, res) => {
                res.should.have.status(201)
                res.body.should.be.a('object')
                res.body.should.have.property('data')
                res.body.should.have.property('message')
                res.body.should.have.property('statusType').eq('success')
            })
    })
})

/** testing user route **/

describe('/GET users', () => {
    it('it should Get all users', (done) => {
        chai.request(app)
            .get('/users/collection')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                done()
            })
    })
})

describe('/POST user', () => {
    it('it sould post the user info', async() => {
        await delay(1000)
        const user = {
            username: 'newuser',
            password: 'password',
            email: 'example@gmail.com',
            role_id: 2,
            uuid: 'example uuid'
        }

        chai.request(app)
            .post('/signup')
            .send(user)
            .end((err, res) => {
                res.should.have.status(201)
                res.body.should.be.a('object')
                res.body.should.have.property('data')
                res.body.should.have.property('message')
                res.body.should.have.property('statusType').eq('success')
                done()
            })
    })
})

describe('Testing Route to Register New user', function(done) {
    it('Missing required fields test', async() => {
        await delay(1000)
        request(app).post('/signup', {}).expect(400).end(done)
    })
    it('Empty field test', async() => {
        await delay(1000)
        request(app).post('/signup', {
            email: '',
            password: '           ',
            passwordRepeat: '        '
        }).expect(400).end(done)
    })

    it('Should accept the correct email and password', async() => {
        await delay(1000)
        const data = {
            email: 'email',
            password: 'alskdjfs',
            passwordRepeat: 'alskdjfs'
        }
        request(app).post('/signup').send(data).expect(200).end(done)
    })
})

/** testing reminder route **/

describe('/GET reminder', () => {
    it('it should Get all reminders', (done) => {
        chai.request(app)
            .get('/reminders/collection')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                done()
            })
    })
})

describe('/POST reminder', () => {
    it('it sould post the reminder info', async() => {
        await delay(1000)
        const reminder = {
            email_body: 'lorem ipsum',
            send_at: '2020-12-12 12:12:12',
            created_by: 'admin'
        }

        chai.request(app)
            .post('/schedule')
            .send(reminder)
            .end((err, res) => {
                res.should.have.status(201)
                res.body.should.be.a('object')
                res.body.should.have.property('data')
                res.body.should.have.property('message')
                res.body.should.have.property('statusType').eq('success')
                done()
            })
    })
})

describe('Testing route to add new reminder', function(done) {
    it('Missing required fields test', async() => {
        await delay(1000)
        request(app).post('/schedule', {}).expect(400).end(done)
    })
    it('Empty field test', async() => {
        await delay(1000)
        request(app).post('/schedule', {
            email_body: '',
            created_by: ' ',
            sent_at: '   '
        }).expect(400).end(done)
    })

    it('Should accept the correct email body, date and username', async() => {
        await delay(1000)
        const data = {
            email_body: 'lorem ipsum',
            created_by: 'admin',
            sent_at: '2020-12-12 12:12:12'
        }
        request(app).post('/schedule').send(data).expect(200).end(done)
    })
})