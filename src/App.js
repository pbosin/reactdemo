import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import { NavDemo } from './components/Nav';
import { Home } from './components/Home';
import { Accounts } from './components/Accounts';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <NavDemo />
                <Router history={browserHistory}>
                    <Route path="/" component={Home} />
                    <Route path="/home" component={Home} />
                    <Route path="/accounts(/*)" component={Accounts} />
                </Router>
            </div>
        );
    }
}

export default App;
