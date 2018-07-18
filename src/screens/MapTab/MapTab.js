import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import MapView, {Marker} from 'react-native-maps';
// import  {Marker} from 'react-native-maps';
import {connect} from "react-redux";
import PlaceList from "../../components/PlaceList/PlaceList";

class MapTab extends Component {
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

  tempDisplayMethod = () => {
    if (this.props.curLocation) {
      return (
        <View>
          <Text>{this.props.curLocation.latitude}</Text>
          <Text>{this.props.curLocation.longitude}</Text>
        </View>
      );
    } else {
      return (
        <Text>No places!</Text>
      );
    }

  };

  renderCurrentLocation = () => {

  };

  renderMarkers = () => {
    // this.props.placesArray.map((place)=> {
    //   if(place){
    //
    //   }
    // });
    //
    //
    if (this.props.placesArray) {
      return (
        this.props.placesArray.map(place => (
          <Marker
            coordinate={{latitude: parseFloat(place.event_lat), longitude: parseFloat(place.event_lon)}}
            title={place.event_name}
            description={place.event_title}
          />
        ))
      );
    }
  };

  render() {
    //TODO change to cur loc
    // let curLoc = (this.props.curLocation) ? this.props.curLocation : {latitude: 52.506370, longitude: 13.449382};
    let curLoc = (this.props.curLocation) ? {latitude: 52.506370, longitude: 13.449382}: {latitude: 52.506370, longitude: 13.449382};
    
    return (
      <View>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            region={{
              latitude: curLoc.latitude,
              longitude: curLoc.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          >
            {this.renderMarkers()}
          </MapView>
        </View>
      </View>
    );
  }
  ;
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const mapStateToProps = state => {
  return {
    placesArray: state.places.placesArray,
    curLocation: state.places.curLocation
  };
};

export default connect(mapStateToProps)(MapTab);
