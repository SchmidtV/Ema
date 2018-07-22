import React, {Component} from "react";
import {StyleSheet, Text, TouchableHighlight, View} from "react-native";
import MapView, {Callout, Marker} from 'react-native-maps';
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
  // componentDidMount() {
  //   this.mapRef.fitToElements(true);
  // // this.mapRef.fitToCoordinates(true);
  // }

  renderCurrentLocation = () => {

  };

  markerClick = (event) => {
      this.props.navigator.push({
        screen: "Ema.PlaceDetailScreen",
        title: event.event_title,
        passProps: {
          selectedPlace: event
        }
      });
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
        this.props.placesArray.map((place, index) => (
          <Marker
            coordinate={{latitude: parseFloat(place.event_lat), longitude: parseFloat(place.event_lon)}}
            title={place.event_name}
            description={place.event_title}
            key={index}
            onCalloutPress={this.markerClick.bind(this, place)}
            >
            <MapView.Callout tooltip style={styles.customView}>
              <TouchableHighlight underlayColor='#dddddd'>
                <View style={styles.calloutText}>
                  <Text>{place.event_name}{"\n"}{place.event_title}</Text>
                </View>
              </TouchableHighlight>
            </MapView.Callout>
          </Marker>
        ))
      );
    }
  };

  render() {
    //TODO change to cur loc
    // let curLoc = (this.props.curLocation) ? this.props.curLocation : {latitude: 52.506370, longitude: 13.449382};
    let curLoc = (this.props.curLocation) ? {latitude: 52.506370, longitude: 13.449382} : {
      latitude: 52.506370,
      longitude: 13.449382
    };

    // const markers =  this.props.placesArray.map((place, index) =>{
    //   return(
    //     {
    //         latitude: place.event_lat,
    //         longitude: place.event_lon
    //       title: place.event_title,
    //       key:index
    //     }
    //   );
    // });


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
            ref={(ref) => { this.mapRef = ref; }}
          >
            <Marker
            coordinate={curLoc}
            title={"You are here"}
            description={curLoc.latitude +" " +curLoc.longitude}
            pinColor={'#000000'}
            />
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
  customView: {
    backgroundColor: "white",
    borderWidth: 1
  }
});

const mapStateToProps = state => {
  return {
    placesArray: state.places.placesArray,
    curLocation: state.places.curLocation
  };
};

export default connect(mapStateToProps)(MapTab);
