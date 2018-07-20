import React, {Component} from "react";
import {Image, View, StyleSheet} from "react-native";
import {Button} from "react-native";
import {Text} from "react-native";
import {connect} from "react-redux";
import {deletePlace} from "../../store/actions/index";
import WeatherItem from "../../components/WeatherItem";
import {catData} from "../../components/Cathegories";
import getDirections from 'react-native-google-maps-directions';


class Directions extends Component {
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

  placeDeletedHandler = () => {
    this.props.onDeletePlace(this.props.selectedPlace.t_event_id);
    this.props.navigator.pop();
  };
  handleGetDirections = () => {
    const data = {
      source: {
        latitude: -33.8356372,
        longitude: 18.6947617
      },
      destination: {
        latitude: -33.8600024,
        longitude: 18.697459
      },
      params: [
        {
          key: "travelmode",
          value: "driving"        // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: "dir_action",
          value: "navigate"       // this instantly initializes navigation using the given travel mode
        }
      ]
    };

    getDirections(data)
  };

  render() {


    return (
      <View >
        <Text>Directions screen</Text>
        <View style={styles.container}>
          <Button onPress={this.handleGetDirections} title="Get Directions" />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
});

export default Directions;