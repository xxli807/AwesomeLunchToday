import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Icon from 'material-ui/Icon';
import DeleteIcon from 'material-ui-icons/Delete';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import * as Request from './../../utils/request';
import { withStyles } from 'material-ui/styles';
import { getMyListAct, addToMyListAct, deleteFromMyListAct } from './actions';

const styles = theme => ({
  listGroup: {
    height: "calc(100vh - 9rem)",
    overflowY: "scroll"
  },
  inputContainer: {
    inputField: {
      width: "100%",
      marginTop: '2rem'
    }
  }
});

class MyListComponent extends Component {

  state = {
    newRestaurant: ""
  };

  componentDidMount() {
    this.props.getMyList();
  }

  renderList(myList) {
    if (!myList.length) {
      return null;
    }
    return (
      myList.map((res, idx) =>
        <div key={idx}>
          <AppBar position="static" color="default">
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="title" color="inherit">
                {res.name}
              </Typography>
              <IconButton
                aria-label="Delete" onClick={() => {this.removeFromList(res.id)}}>
                <DeleteIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </div>
      )
    )
  }

  AddToList(myList) {
    // myList.push(this.state.newRestaurant);
    this.props.addToMyList(this.state.newRestaurant);
    this.setState({
      newRestaurant: ''
    })
  }

  removeFromList(itemId){
    this.props.removeFromList(itemId);
  }

  HandleNewRestaurantChange(e) {
    this.setState({
      newRestaurant: e.target.value
    });
  }

  render() {
    const style = {
      position: "absolute",
      bottom: "1.6rem",
      right: "2.5rem"
    };

    let myList2 = [
      "mr bee", "KFC", "mr bee", "KFC", "mr bee", "KFC",
    ];
 
    const { classes, myList } = this.props;
    return (
      <div style={{ margin: '20px' }}>
        <div className={classes.listGroup}>
          {this.renderList(myList)}
        </div>
        <div className={classes.inputContainer}>
          <TextField
            fullWidth
            style={{ marginTop: '0.5rem' }}
            label="Add Your Favoriate Resturant"
            // floatingLabelText="Floating Label Text"
            value={this.state.newRestaurant}
            onChange={(e)=>this.HandleNewRestaurantChange(e)}
          />
          <Button
            variant="fab"
            color="primary"
            aria-label="add"
            disabled ={!this.state.newRestaurant}
            style={style} onClick={() => this.AddToList(myList)}>
            <AddIcon />
          </Button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    myList: state.myList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getMyList: () => dispatch(getMyListAct()),
    addToMyList: restaurantName => dispatch(addToMyListAct(restaurantName)),
    removeFromList: (itemId) => dispatch(deleteFromMyListAct(itemId))
  };
}

const MyList = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyListComponent));

export { MyList };
