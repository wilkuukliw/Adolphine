const delay = require('delay')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const should = chai.should()

chai.use(chaiHttp)

/** testing subscriber route **/

describe('/GET subscriber', () => {
    it('it should Get all subscribers', (done) => {
        chai.request(app)
            .get('/subscribers')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});

describe('/POST subscriber', () => {
    it('it sould post the subscriber info', async() => {
        await delay(1000)
        const subscriber = {
            email: "anna.maria.wilczek@gmail.com",
        };

        chai.request(app)
            .post('/subscribe')
            .send(subscriber)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.should.have.property('message');
                res.body.should.have.property('statusType').eq('success');
                done();
            });
    });
});

/** testing user route **/

describe('/GET user', () => {
    it('it should Get all users', (done) => {
        chai.request(app)
            .get('/users/collection')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});

describe('/POST user', () => {
    it('it sould post the user info', async() => {
        await delay(1000)
        const user = {
            username: "newuser",
            password: "password",
            email: "example@gmail.com",
            role_id: 2,
            uuid: "example uuid"
        };

        chai.request(app)
            .post('/signup')
            .send(user)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.should.have.property('message');
                res.body.should.have.property('statusType').eq('success');
                done();
            });
    });
});

/** testing reminder route **/

describe('/GET reminder', () => {
    it('it should Get all reminders', (done) => {
        chai.request(app)
            .get('/reminders/collection')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});

describe('/POST reminder', () => {
    it('it sould post the reminder info', async() => {
        await delay(1000)
        const reminder = {
            email_body: 'lorem ipsum',
            send_at: '2020-12-12 12:12:12',
            created_by: 'admin'
        };

        chai.request(app)
            .post('/schedule')
            .send(reminder)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.should.have.property('message');
                res.body.should.have.property('statusType').eq('success');
                done();
            });
    });
});