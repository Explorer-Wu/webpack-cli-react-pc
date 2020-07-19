const Nightmare = require('nightmare')
const url = require('url')
// const expect = chai.expect
const nightmare = Nightmare({
  show: true 
})
// 运行npm run test:e2e http://0.0.0.0:9999
// 则测试页面就为http://0.0.0.0:9999
// const url = process.argv[3]
const BASE_URL = url.format({
    protocol : process.env.PROTOCOL || 'http',
    hostname : process.env.HOST || 'localhost',
    port     : process.env.PORT || 3000
})

describe('pages', (path='', query={}) => {
    const location = url.resolve(BASE_URL, path)
    // nightmare
    // .goto(location || 'http://0.0.0.0:8080')
    // .type('#search_form_input_homepage', 'github nightmare')
    // .click('#search_button_homepage')
    // .wait('#r1-0 a.result__a')
    // // .evaluate(() => document.querySelector('#r1-0 a.result__a').href)
    // .evaluate(() => document.body.textContent)
    // .end() 
    // .then(console.log)
    // .catch(error => {
    //     console.error('Search failed:', error)
    // })
    
    test('page ', function(done) {
        // 设定整个模拟的时长，超过则GG
        this.timeout('30s')
        nightmare
        .viewport(1200, 600)
        .goto(location || 'http://0.0.0.0:8080')
        .wait('h1')
        .click('a[href="#/pageA"]')
        .wait(() => {
            return location.hash === '#/pageA'
        })
        .click('a[href="#/pageB"]')
        .wait(() => {
            return location.hash === '#/pageB'
        })
        .evaluate(() => location.hash)
        .end()
        .then(hash => {
            expect(hash).toEqual('#/pageB')
            done()
        })
    })
    
})