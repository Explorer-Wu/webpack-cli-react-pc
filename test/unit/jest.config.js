// https://jestjs.io/docs/en/configuration.html

const path = require("path");

module.exports = {
  rootDir: path.resolve(__dirname, "../../"),
  // roots: ["<rootDir>/src"],
  // 同样 webpack的 resolve.root 选项，如设置的 NODE_PATH env变量，都可以设置或使用 modulePaths 选项。
  modulePaths: [
    "<rootDir>/src/"
  ],
  //配置文件查询，webpack的modulesDirectories, 和 extensions 选项都是和Jest的moduleDirectories 和 moduleFileExtensions选项类似的.
  moduleFileExtensions: [
    "web.js",
    "js",
    "web.ts",
    "ts",
    "web.tsx",
    "tsx",
    "json",
    "web.jsx",
    "jsx",
    "node"
  ],
  // 主要用于与webpack的resolve.alias匹配，注意正则写法
  moduleNameMapper: { 
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@@views(.*)$": "<rootDir>/src/views$1",
    "^@@router(.*)$": "<rootDir>/src/router$1",
    "^@util(.*)$": "<rootDir>/src/util$1",
    "^@containers(.*)$": "<rootDir>/src/reduxstore/containers$1",
    "^@actions(.*)$": "<rootDir>/src/reduxstore/actions$1",
    "^@reducers(.*)$": "<rootDir>/reduxstore/reducers$1",
    "^@store(.*)$": "<rootDir>/src/reduxstore/store$1",
    "^@@api(.*)$": "<rootDir>/src/api$1",
    // "^assets(.*)$": "<rootDir>/src/assets$1",
    "^@@components(.*)$": "<rootDir>/src/components$1",
    "^public(.*)$": "<rootDir>/public/$1",
    "^mockserver(.*)$": "<rootDir>/mockserver/$1",
    // 处理资源文件，如样式表和图像. 给类名查找模拟一个代理
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",  //模拟 CSS 模块
    // "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/test/unit/jest/fileMock.js",
    // "\\.(css|sass|scss|less)$": "<rootDir>/spec/__mocks__/styleMock.js",  //"<rootDir>/__mocks__/styleMock.js"
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    "^.+\\.css$": "<rootDir>/test/unit/jest/cssTransform.js",
    "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "<rootDir>/test/unit/jest/fileTransform.js",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/test/unit/jest/fileTransform.js"
  //   "^.+\\.(ts|tsx)$": "ts-jest",
  //   "^.+\\.jsx?$": "babel-jest",
  },
  // 转换时需要忽略的文件
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$"
  ],
  testURL: "http://localhost/", // 运行环境下的URl
  //测试时需忽略的文件
  testPathIgnorePatterns: [
    "<rootDir>/test/e2e",
    "<rootDir>/node_modules/",
    "<rootDir>/.next/"
  ],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  setupFiles: [
    "react-app-polyfill/jsdom",
    "<rootDir>/test/unit/jest/setup"  // 运行测试前可执行的脚本（比如注册enzyme的兼容）
  ],
  setupFilesAfterEnv: [],
  coverageDirectory: "<rootDir>/test/unit/coverage", // 输出覆盖信息文件的目录
  coveragePathIgnorePatterns: [  // 统计覆盖信息时需要忽略的文件
    "/node_modules/",
    // "<rootDir>/src/", "<rootDir>/dist/"
  ], 
  collectCoverage: true, // 是否收集测试时的覆盖率信息
  // 哪些文件需要收集覆盖率信息
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/main.js",
    "!src/router/index.js",
    "!**/node_modules/**",
  ],
  // 匹配的测试文件
  testMatch: [ 
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}"
  ],
  testEnvironment: "jest-environment-jsdom-fourteen", // "node",
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname"
  ],
};
