import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
// import History from '@@router/history';
import LayoutScreen from "@@components/Visualscreen/LayoutScreen";
import MainLayout from "@@components/LayoutTemp";
// import OverView from "@@views/Overview/index";
import "@@assets/styles/antd-custom.less";
import "@@assets/styles/main/base.scss";
import "@@assets/styles/components/general.scss";
// import "@@assets/css/main.css"

const supportsHistory = "pushState" in window.history;
// BrowserRouter as Router用 forceRefresh={!supportsHistory}  history={History}
function App() {
  return (
    <Router
      basename={window.__POWERED_BY_QIANKUN__ ? "/reactmicro" : "/"}
      forceRefresh={!supportsHistory}
    >
      <Switch>
        <Route path="/screenfull" component={LayoutScreen} />
        <Route path="/views" component={MainLayout} />
        <Redirect to="/screenfull" />
      </Switch>
    </Router>
  );
}

export default App;
