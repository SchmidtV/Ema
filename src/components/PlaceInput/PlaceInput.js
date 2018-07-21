import React, { Component } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

class PlaceInput extends Component {
  state = {
    placeName: ""
  };

  componentDidMount() {
    
  }

  placeNameChangedHandler = val => {
    this.setState({
      placeName: val
    });

  };

  placeSubmitHandler = () => {
    if (this.state.placeName.trim() === "") {
      return;
    }
    if (this.state.placeName.trim().length >= 2) {
      this.props.onPlaceLongEnough(this.state.placeName);
    }
  };

  datePickerHandler = () => {

  };

  render() {
    return (
      <View style={styles.inputContainer}>
          <Icon style={styles.searchIcon} size={20} name="search" color="gray" />
        <TextInput
          placeholder="Search"
          value={this.state.placeName}
          onChangeText={this.placeNameChangedHandler}
          style={styles.placeInput}
        />
        <Button
          title="Search"
          style={styles.placeButton}
          onPress={this.placeSubmitHandler}
        />

      </View>

    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: "center"
  },
  placeInput: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    width: "70%",
    backgroundColor: '#fff',
    color: '#424242'
  },
  placeButton: {
    width: "30%"
  },
  searchIcon: {
    padding: 10,
  }
});

export default PlaceInput;
