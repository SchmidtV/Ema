import React, {Component} from 'react';
import {View, Text, Button, StyleSheet, TextInput} from 'react-native';

import startMainTabs from "../MainTabs/startMainTabs";

class AuthScreen extends Component {

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = event => {
    if (event.type === "NavBarButtonPress") {
      if (event.id === "forgotPass") {
        //TODO do something
      }
    }
  };

  loginHandler = () => {
    //TODO handle login
    startMainTabs();
  };

  render() {
    // startMainTabs();
    return (
      <View style={styles.container}>
        <Text>Please log in</Text>
        <Text>E-MAIL</Text>
        <TextInput/>
        <Text>Password (Min. 8 symbols)</Text>
        <TextInput/>
        <Button title="Login" onPress={this.loginHandler}/>
        <Button title="Register" onPress={this.loginHandler}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor: "white",
    flex: 1
  }
});
export default AuthScreen;