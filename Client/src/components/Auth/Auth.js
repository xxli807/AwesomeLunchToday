import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { withRouter } from 'react-router';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { registerUserAct, loginUserAct } from './actions';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
})

class AuthComponent extends Component {
  state = {
    username: '',
    password: ''
  }

  handleRegisterOrLogin = isRequestForRegister => {
    const { login, register } = this.props;
    if (isRequestForRegister) {
      register(this.state.username, this.state.password);
    } else {
      login(this.state.username, this.state.password);
    }
  }

  handleInputChange = (event, isUsername) => {
    const { value } = event.target;
    if (isUsername) {
      this.setState({ username: value })
    } else {
      this.setState({ password: value })
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container}>
        <TextField
          id="username"
          label="Username"
          className={classes.textField}
          value={this.state.name}
          onChange={e => this.handleInputChange(e, true)}
          margin="normal"
          style={{ width: '100%' }}
        />
        <TextField
          id="password"
          label="Password"
          className={classes.textField}
          type="password"
          margin="normal"
          onChange={e => this.handleInputChange(e, false)}
          style={{ width: '100%' }}
        />
        <div style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '5rem'}}>
          <Button
            type="button"
            variant="raised"
            size="large"
            color="primary"
            className={classes.button}
            onClick={this.handleRegisterOrLogin.bind(this, false)}
          >
            Login
          </Button>
          <Button
            type="button"
            variant="raised"
            size="large"
            color="secondary"
            className={classes.button}
            onClick={this.handleRegisterOrLogin.bind(this, true)}
          >
            Register
          </Button>
      </div>
    </form>
    )
  };
}

function mapStateToProps(state) {
  return {
    
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    login: (username, password) => dispatch(loginUserAct(username, password, ownProps.history)),
    register: (username, password) => dispatch(registerUserAct(username, password, ownProps.history))
  }
}

export const Auth = withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AuthComponent)));