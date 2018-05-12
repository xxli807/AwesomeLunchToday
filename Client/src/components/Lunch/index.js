import React, { Component } from 'react';
import { get, post } from '../../utils/request';
import { connect } from 'react-redux';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Avatar from 'material-ui/Avatar';
import Input from 'material-ui/Input';
import Button from 'material-ui/Button';
import Badge from 'material-ui/Badge';
import * as ActionTypes from '../../constants/ActionTypes';
import { withRouter } from 'react-router';
import './index.css';

const getInitials = username => {
  const names = username.split(' ');
  if (names.length > 1) {
    return names[0].charAt(0) + names[1].charAt(0);
  }
  return username.charAt(0);
}

class Lunch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    };
  }

  componentDidMount() {
    get('account/allUsers').then(res => {
      this.props.dispatch({ type: ActionTypes.UPDATE_ALL_USERS, payload: res });
    });
  }

  onSearchTextChange(e) {
    this.setState({ searchText: e.target.value });
  }

  clearSearchText() {
    this.setState({ searchText: '' });
  }

  handleSelectPerson(loginId) {
    this.props.dispatch({ type: ActionTypes.TOGGLE_SELECT_PERSON, payload: loginId });
  }

  handleClickLunchIt() {
    const { allUsers, history } = this.props;
    const selectedPersons = allUsers.filter(x => x.selected);
    history.push('/result');
  }

  render() {
    const searchText = this.state.searchText;
    const searchResult = searchText === '' ? this.props.allUsers :
    this.props.allUsers.filter(x => x.username.toLowerCase().indexOf(searchText.toLowerCase()) >= 0);
    return (
      <div className="lunchIt__container">
        <Input fullWidth placeholder="Search username" value={searchText} onChange={this.onSearchTextChange.bind(this)} />
        <div className="lunchIt__clear-btn" onClick={this.clearSearchText.bind(this)}><i className="material-icons">clear</i></div>
        <div className="lunchIt__people-list">
          <List>
            {searchResult.map((user, index) => (
              <ListItem key={index} dense button>
                <Avatar style={{ color: '#fff', backgroundColor: user.avatarColor }}>{getInitials(user.username)}</Avatar>
                <ListItemText primary={user.username} />
                <ListItemSecondaryAction>
                  <Checkbox
                    checked={user.selected}
                    onClick={this.handleSelectPerson.bind(this, user.id)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </div>
        <Button variant="raised" color="primary" className="lunchIt__button" onClick={this.handleClickLunchIt.bind(this)}>Lunch IT</Button>
      </div>
    );
  }
}

const stateToProps = state => ({
  allUsers: state.lunchIt.allUsers
});

export default connect(stateToProps, null)(withRouter(Lunch));
