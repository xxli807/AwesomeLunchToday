import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Header from './Header';
import Home from './Home';
import { Auth } from './Auth';
import Lunch from './Lunch';
import { MyList } from './MyList';
import Result from './Result';
import { getRememberedUserAct } from '../components/Auth'

class App extends Component {
  componentDidMount() {
    this.props.getRememberedUser();
  }

  render() {
    const { user } = this.props;

    return (
      <div className="container">
        <BrowserRouter>
          <div style={{ height: '100vh', width: '100vw' }}>
            <Header user={user}/>
            <div style={{ paddingTop: 48 }}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/auth" component={Auth} />
                <Route exact path="/mylist" component={MyList} />
                <Route exact path="/lunch" component={Lunch} />
                <Route exact path="/result" component={Result} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: {
      username: state.auth.username,
      userId: state.auth.userId
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getRememberedUser: () => dispatch(getRememberedUserAct())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
