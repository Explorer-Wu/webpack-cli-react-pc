// /*--- React 16 使用 core-js 支持老版本浏览器 ---*/
// import 'core-js/es';
// import 'core-js/es/map';
// import 'core-js/es/set';
// import 'core-js/es/promise';

import React from "react";
import ReactDOM from "react-dom";

/*-- 使用 raf 的 package 增添 requestAnimationFrame 的 shim --*/
import "raf/polyfill";
// import '@babel/polyfill';

import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
