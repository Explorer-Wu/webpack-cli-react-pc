// For authoring Nightmare tests, see

module.exports = {
  'default e2e tests': function test(browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightmare.conf.js
    const devServer = browser.globals.devServerURL;

    browser
      .url(devServer)
      .waitForElementVisible('#flows', 5000)
      .assert.elementPresent('.hello')
      .assert.containsText('h1', 'Welcome to Your React.js App')
      .assert.elementCount('img', 1)
      .end();
  },
};