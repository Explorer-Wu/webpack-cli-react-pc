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
import "@@/shared/path-public";
import actions from "@@/shared/actions";
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById("root"));

function Qrender(props) {
  const { container } = props;
  console.log("[react16] window:", window.__POWERED_BY_QIANKUN__);
  console.log("[react16] render:", props, window.window);
  if (props) {
    // 注入 actions 实例
    actions.setActions(props);
  }

  ReactDOM.render(
    <App />,
    container
      ? container.querySelector("#root")
      : document.querySelector("#root")
  );
}

// function storeTest(props) {
//   // 从生命周期 mount 中获取通信方法，使用方式和 master 一致
//   // props.onGlobalStateChange((value, prev) => console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev), true);
//   props.onGlobalStateChange((state, prev) => {
//     // state: 变更后的状态; prev 变更前的状态
//     console.log(`[onGlobalStateChange - ${props.name}]:`, state, prev);
//   });
//   // props.setGlobalState(state);
//   props.setGlobalState({
//     ignore: props.name,
//     user: {
//       name: props.name,
//     },
//   });
// }

if (!window.__POWERED_BY_QIANKUN__) {
  Qrender({});
}

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log("[react16] react app bootstraped");
}
/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
  console.log("[react16] props from main framework:", props);
  // storeTest(props);
  Qrender(props);
}
/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount(props) {
  const { container } = props;
  ReactDOM.unmountComponentAtNode(
    container
      ? container.querySelector("#root")
      : document.querySelector("#root")
  );
}

/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
// export async function update(props) {
//   console.log('update props', props);
// }

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
