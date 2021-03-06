import React, {Component} from "react";
import {Image, View, StyleSheet, ScrollView, TouchableOpacity} from "react-native";
import {Button} from "react-native";
import {Text} from "react-native";
import {connect} from "react-redux";
import {deletePlace} from "../../store/actions/index";
import WeatherItem from "../../components/WeatherItem";
import {catData} from "../../components/Cathegories";
import getDirections from "react-native-google-maps-directions";
import Icon from "react-native-vector-icons/MaterialIcons";

class PlaceDetail extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    //TODO https://docs.google.com/forms/d/e/1FAIpQLSfNxc82RJuzC0DnISat7n4H-G7IsPQIdaMpe202iiHZEoso9w/closedform
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
    if (this.props.selectedPlace.event_category_id === "1") {
      return (
        <Text>
          Music event! Soundcloud is coming soon!
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
    let source = this.props.curLocation;

    // console.log(this.props.selectedPlace.event_lat);
    const data = {
      destination: {
        latitude: parseFloat(this.props.selectedPlace.event_lat),
        longitude: parseFloat(this.props.selectedPlace.event_lon)
      },
      source: source,
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

  addToFavorites = () => {

    let url = this.props.baseUrl + "auth/save_event.php?event_id=" + this.props.selectedPlace.t_event_id + "&token=" + this.props.token;
    fetch(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        console.log(myJson);
      });
  };


  removeFromFavorites = () => {

    let url = this.props.baseUrl + "auth/delete_event.php?event_id=" + this.props.selectedPlace.t_event_id + "&token=" + this.props.token;
    fetch(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        console.log(myJson);
      });
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
          <Text style={styles.placeName}>{this.props.selectedPlace.event_title}</Text>
          <View style={{flexDirection: "row"}}>
            <View style={{width: 120}}>
              <Image
                source={imgUrl}
                style={styles.placeImage}
                resizeMode="contain"
              />
            </View>
            <View style={{flexDirection: "column", marginLeft: 20}}>

              <Text>When: {this.props.selectedPlace.event_date}</Text>
              <Text>Distance: {this.props.selectedPlace.radius} km</Text>
              <WeatherItem eventInfo={this.props.selectedPlace}/>
              <View style={{flexDirection: "row"}}>
                <TouchableOpacity onPress={this.addToFavorites}>
                  <Icon size={20} name="bookmark" color="green"/>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.removeFromFavorites}>
                  <Icon size={20} name="bookmark-border" color="gray"/>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {this.renderSound()}
          <ScrollView style={{height: 170}}>
            <Text>{this.props.selectedPlace.description}</Text>
          </ScrollView>

          {/*<View style={styles.container}>*/}
          <Button onPress={this.handleGetDirections} title="Get Directions"/>

          {/*</View>*/}
          <Button onPress={() => {
          }} title="Bookmark"/>
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
    height: 120
  },
  placeName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28

  }
});


const mapStateToProps = state => {
  return {
    curLocation: state.places.curLocation,
    token: state.places.token,
    baseUrl: state.places.baseUrl
  };
};


const mapDispatchToProps = dispatch => {
  return {
    onDeletePlace: (key) => dispatch(deletePlace(key))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PlaceDetail);