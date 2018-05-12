import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar'
import Badge from 'material-ui/Badge';
import Tabs, { Tab } from 'material-ui/Tabs';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

class Header extends Component {
  state = {
    value: '/',
  };

  handleChange = (event, value) => {
    this.setState({ value });
    this.props.history.push(value);
  };

  render() {
    const { classes, user, allUsers } = this.props;
    const { value } = this.state;
    const selectedUserCount = allUsers.filter(x => x.selected).length;
    return (
      <div>
        <AppBar>
          <Tabs value={this.props.history.location.pathname} onChange={this.handleChange}>
            <Tab label="Home" value={'/'} />
            {(!user || !user.username || !user.userId) && <Tab label="Login"value={'/auth'} />}
            {(user && user.username && user.userId) && <Tab label="My List"value={'/mylist'} />}
            {(user && user.username && user.userId) && <Tab label={
                selectedUserCount > 0 ?
                  <Badge color="secondary" badgeContent={selectedUserCount}>
                    Lunch It
                  </Badge> :
                  'Lunch It'
              } value={'/lunch'} />}
          </Tabs>
        </AppBar>
      </div>
    );
  }
}

const stateToProps = state => ({
  allUsers: state.lunchIt.allUsers
});

export default connect(stateToProps, null)(withRouter(Header));