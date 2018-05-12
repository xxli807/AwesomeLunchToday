import React, { Component } from 'react';
import Button from 'material-ui/Button';
import { post } from '../../utils/request';
import { connect } from 'react-redux';
import { CircularProgress } from 'material-ui/Progress';
import './index.css';

const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
}

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      loading: true,
      result: null,
      resultPerson: null
    }
  }

  componentDidMount() {
    const selectedLoginIds = this.props.allUsers.filter(x => x.selected).map(x => x.id);
    post('places', selectedLoginIds).then(res => {
      const randomIndex = getRandomInt(res.length);
      const restaurantName = res[randomIndex].restaurant.name;
      const personName = this.props.allUsers.find(x => x.id === res[randomIndex].loginId).username;
      this.setState({ results: res, result: restaurantName, resultPerson: personName, loading: false });
    });
  }

  retry() {
    const places = this.state.results;
    const randomIndex = getRandomInt(places.length);
    const restaurantName = places[randomIndex].restaurant.name;
    const personName = this.props.allUsers.find(x => x.id === places[randomIndex].loginId).username;
    this.setState({ result: restaurantName, resultPerson: personName });
  }

  render() {
    return (
      <div className="result__container">
        {this.state.loading ?
          <CircularProgress className="centered" size={50} />:
          <div style={{ height: '100%', width: '100%' }}>
            <div className="result__title">
              <div>You are going to:</div>
            </div>
            <div className="result"><div>{this.state.result}</div></div>
            <div className="result__title">
              <div >Comes from:</div>
            </div>
            <div className=" result">{this.state.resultPerson}</div>
            <div className="centered result__retry-btn">
              <Button variant="raised" color="primary" onClick={this.retry.bind(this)}>Try again</Button>
            </div>
          </div>
        }
        
      </div>
    );
  }
}

const stateToProps = state => ({
  allUsers: state.lunchIt.allUsers
});

export default connect(stateToProps, null)(Result);