import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import History from '@@router/history';
import MainLayout from '@@components/LayoutTemp';

import "public/static/styles/antd-custom.less";
import "public/static/styles/main/base.scss";
import "public/static/styles/components/general.scss";
// import "public/static/css/main.css"

// const supportsHistory = 'pushState' in window.history;
// BrowserRouter as Router用 forceRefresh={!supportsHistory}
function App() {
  return (
    <Router history={History}>
        <Switch>
            <Route path="/views" component={MainLayout} />
            <Redirect to="/views/home" />
        </Switch>
    </Router>
  );
}

export default App;
