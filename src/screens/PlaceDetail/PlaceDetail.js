import React, {Component} from "react";
import {Image, View, StyleSheet} from "react-native";
import {Button} from "react-native";
import {Text} from "react-native";
import {connect} from "react-redux";
import {deletePlace} from "../../store/actions/index";
import WeatherItem from "../../components/WeatherItem";
import {catData} from "../../components/Cathegories";
import getDirections from "react-native-google-maps-directions";
class PlaceDetail extends Component {
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

  renderSound = () => {
    if (this.props.selectedPlace.event_category_id === 1) {
      return (
        <Text>
          Music event!
        </Text>
      );

    }
  };






  directionsHandler = (event) => {
    // const selectedEvent = this.state.topEvents.find(event => {
    //   return event.event_title === key;
    // });

    // console.log("Key: " + key);
    // console.log("First event title: " + this.state.topEvents[0].event_title);
    this.props.navigator.push({
      screen: "Ema.DirectionsScreen",
      title: "Directions"
      // ,
      // passProps: {
      //   selectedPlace: event
      // }
    });
  };

  handleGetDirections = () => {
    let source;
    if (this.props.curLocation){
      console.log(this.props.curLocation);
      source = this.props.curLocation;
    }else{
      source = {
        latitude: -33.8356372,
        longitude: 18.6947617
      };
    }

    console.log(this.props.selectedPlace.event_lat);
    const data = {
      source: source,
      destination: {
        latitude: parseInt(this.props.selectedPlace.event_lat),
        longitude: parseInt(this.props.selectedPlace.event_lon)
      },
      params: [
        {
          key: "travelmode",
          value: "transit"        // may be "walking", "bicycling" or "transit" as well
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

    let imgUrl = null;
    if (this.props.selectedPlace.event_imgurl) {
      imgUrl = {uri: this.props.selectedPlace.event_imgurl};
    } else {
      imgUrl = require("../../assets/NoImgArt.png");
    }

    return (
      <View style={styles.container}>

        <View>
          <Image
            source={imgUrl}
            style={styles.placeImage}
            resizeMode="contain"
          />
          <Text style={styles.placeName}>{this.props.selectedPlace.event_title}</Text>
          {this.renderSound()}
          <View style={styles.container}>
            <Button onPress={this.handleGetDirections} title="Get Directions" />
          </View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    margin: 20
  },
  placeImage: {
    width: "100%",
    height: 200
  },
  placeName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28

  }
});


const mapStateToProps = state => {
  return {
    curLocation: state.places.curLocation
  };
};


const mapDispatchToProps = dispatch => {
  return {
    onDeletePlace: (key) => dispatch(deletePlace(key))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PlaceDetail);