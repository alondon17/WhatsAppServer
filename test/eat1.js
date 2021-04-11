
const expect = require('chai').expect
const getConnection = require('typeorm').getConnection
const axios = require('axios').default
// .create({baseURL:'http://localhost:3003'})

let app
let connection

const User = require('../src/entity/user').User
const Group = require('../src/entity/group').Group
describe('Routes', async function () {
  before((done) => {
    require('dotenv').config()
    const createApp = require('../server.ts').createApp
    createApp().then(({ server: serv, connection: con }) => {
      connection = con;
      app = serv;
      console.log(', listering iiii', serv.listening);
    }).catch(console.log)
      .finally(() => {
        done()
      })
  })

  describe('/group', async ()=> {
    describe('POST /new', async () => {

      let group
      it('should return the newly saved object', async function () {
        // try {
          console.log('listen', app.listening);
          const res1 = await axios.post('http://localhost:3003/'
          ).catch(console.log)
          const res = await axios.post('http://localhost:3003/group/new'
            , { name: 'test-group', users: ['+972-51-111-1111'] }).catch(console.log)
          const { name, users, isChat } = res.data.group
          group = res.data.group
          expect(name, 'The name is saved incorrectly').to.equal('test-group')
          expect(isChat, 'The isChat value is wrong').to.equal(false)
          expect(users, 'The users array has the wrong lengh').to.have.lengthOf(1)
//         }
//         catch(err){
// console.log(err);
//         }

      })
      after(async() => {
        Group.delete(group.id)
      })
    })
  })
  describe('/user', async() => {
    describe('PUT /', async() => {
      let userId
      it('should update the user correctly', (done) => {
        User.save({ name: 'Jimbo', password: 'kick', about: 'salt is NaCl', phone: '+972-50-000-0000' })
          .then((baseUser) => {
            userId = baseUser.phone
            axios.put('http://localhost:3003/user', { user: { phone: userId, password: 'jhon', about: 'merlin', name: 'magician' } })
              .then(res => {
                const updatedUser = res.data.user

                expect(updatedUser.about).to.equal('merlin')
                expect(updatedUser.name).to.equal('magician')
                done()
              }).catch(console.log)
          }).catch(console.log)
      })
      after(async() => {
        User.delete(userId)
      })
    })
  })
  after(async() => {
    app.close()
    getConnection().close()
  })
})
