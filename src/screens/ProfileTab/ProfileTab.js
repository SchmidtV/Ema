import React, {Component} from "react";
import {Button, Text, View, AsyncStorage} from "react-native";
import {addToken, addUsername, removeToken, removeUsername} from "../../store/actions";
import {connect} from "react-redux";

class ProfileTab extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = event => {
    if (event.type === "NavBarButtonPress") {
      if (event.id === "sideDrawerToggle") {
        this.props.navigator.toggleDrawer({
          side: "left"
        })
      }
    }
  };

  loginCLickedHandler = () => {
    this.props.navigator.push({
      screen: "Ema.AuthScreen",
      title: "Log in"
    });
  };

  logoutClockedHandler = () => {
    this.props.onRemoveToken();
    this.props.onRemoveUsername();
    AsyncStorage.multiRemove(["token", "username"], (err) => {
    });

  };

  renderYou = () => {
    if(this.props.username){
      return(
      <View>
        <Text>
          Hello {this.props.username}
        </Text>
        <Button title="Logout" onPress={this.logoutClockedHandler}/>
      </View>
      );
    }else{
      return(
        <View>
          <Text>Hello</Text>
          <Button title="Log in" onPress={this.loginCLickedHandler}/>
        </View>
      );
    }
  };

  render() {
    return (
      <View>
        {this.renderYou()}
      </View>
    );
  };
}

const mapStateToProps = state => {
  return {
    baseUrl: state.places.baseUrl,
    token: state.places.token,
    username: state.places.username
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRemoveToken: () => dispatch(removeToken()),
    onRemoveUsername: () => dispatch(removeUsername())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileTab);
