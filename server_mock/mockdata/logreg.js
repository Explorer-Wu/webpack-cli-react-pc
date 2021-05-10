const Mock = require('mockjs');
// import {param2Obj} from '@utils'
const jwt = require('jsonwebtoken');
const secret = 'testJwt'; //撒盐：加密的时候混淆
const user = {
    username: 'Explorer-Wu'
};
//jwt生成token
// const token = jwt.sign({
//     name: 123
// }, secret, {
//     expiresIn:  60 //秒到期时间
// });
// const count = 50
// for (let i = 0; i < count; i++) {
// }

const regData = Mock.mock({
  'username': '@word(3, 8)',
  'password': /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
})

const logData = (user) => {
    return {
        code: 200,
        data: Mock.mock({
            'token': () => {
                return jwt.sign(user, secret)
            }
        }),
        message: "登录成功！"
    }
}

module.exports = {
  authlogin: logData(user),
  authlogout: {
    code: 200,
    loginurl: "auth/login",
    message: "登出成功！"
  }
}