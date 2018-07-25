import React, {Component} from 'react';
import {View, Text, Button, StyleSheet, TextInput, AsyncStorage} from 'react-native';

import startMainTabs from "../MainTabs/startMainTabs";
import {addToken, addUsername, removeToken, removeUsername} from "../../store/actions";
import {connect} from "react-redux";
import t from "tcomb-form-native";
import bcrypt from "react-native-bcrypt";
import isaac from "isaac";

class AuthScreen extends Component {

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    this.register.bind(this);


  }
  //
  // onNavigatorEvent = event => {
  //   if (event.type === "NavBarButtonPress") {
  //     if (event.id === "forgotPass") {
  //       //TODO do something
  //     }
  //   }
  // };

  loginHandler = () => {
    //TODO handle login
    startMainTabs();
  };

  _onValueChange(id, value) {
    try {
      AsyncStorage.setItem(id, value).then(()=>{
        console.log("Value saved");
      });
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  _getProtectedQuote() {
    // var DEMO_TOKEN =
    AsyncStorage.getItem("1").then(item =>{
      console.log("Got token: " + item);
    });
    // fetch("http://localhost:3001/api/protected/random-quote", {
    //   method: "GET",
    //   headers: {
    //     'Authorization': 'Bearer ' + DEMO_TOKEN
    //   }
    // })
    //   .then((response) => response.text())
    //   .then((quote) => {
    //     // AlertIOS.alert(
    //     //   "Chuck Norris Quote:", quote)
    //   })
    //   .done();
  }

  register = () => {
    let username = this._formRef.getValue().username;
    let password = this._formRef.getValue().password;
    let sha256 = require('sha256');
    let hash = sha256(password);
    let url = this.props.baseUrl + "auth/regist.php?pw=" + hash + "&login="+username;
    console.log(url);
    // let url = this.props.baseUrl + "auth/registr.php";
    console.log(username + " : " + hash);
    fetch(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      // ,
      // body: JSON.stringify({
      //   username: username,
      //   password: hash
      // })
    })
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        if(myJson.error.trim() !== ""){
          alert("Could not register!");
          return (null);
        }
        this.props.onAddUsername(username);
        this.props.onAddToken(myJson.token);
        this._onValueChange("token", myJson.token);
        this._onValueChange("username", username);
        this.props.navigator.pop();
        // console.log(myJson);
      });
  };


  login = () => {
    let username = this._formRef.getValue().username;
    let password = this._formRef.getValue().password;
    let sha256 = require('sha256');
    let hash = sha256(password);
    let url = this.props.baseUrl + "auth/get_token.php?pw=" + hash + "&login="+username;
    console.log(url);
    console.log(username + " : " + hash);
    fetch(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      // ,
      // body: JSON.stringify({
      //   username: username,
      //   password: hash
      // })
    })
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        if(myJson.error.trim() !== ""){
          alert("Could not login!" + myJson.error);
          return (null);
        }
        this.props.onAddUsername(username);
        this.props.onAddToken(myJson.token);
        this._onValueChange("token", myJson.token);
        this._onValueChange("username", username);
        this.props.navigator.pop();
        // console.log(myJson);
      });
  };

  render() {
    const Person = t.struct({
      username: t.String,
      password: t.String
    });
    const Form = t.form.Form;

    const options = {};

    // startMainTabs();
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Form
            ref={(ref) => this._formRef=ref}
            type={Person}
            options={options}
          />
        </View>
        <Button title="Login" onPress={this.login}/>
        <Button title="Register" onPress={this.register}/>
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

const mapStateToProps = state => {
  return {
    baseUrl: state.places.baseUrl,
    token: state.places.token
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAddToken: (token) => dispatch(addToken(token)),
    onRemoveToken: () => dispatch(removeToken()),
    onAddUsername: (username) => dispatch(addUsername(username)),
    onRemoveUsername: () => dispatch(removeUsername())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
