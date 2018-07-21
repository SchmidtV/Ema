import React, {Component} from "react";
import {Button, Text, StyleSheet, View} from "react-native";
import {connect} from "react-redux";
import {addPlace, addCurrentLocation, addPlacesToDisplayOnMap} from "../../store/actions";
import PlaceInput from "../../components/PlaceInput/PlaceInput";
import DatePicker from 'react-native-datepicker';
import EventsList from "../../components/EventsList/EventsList";


class HomeTab extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    this.state = {
      baseUrl: "http://pc18.beuth-hochschule.de/php/Stud/Rudi/",
      fromDate: this.getCurDateTimeInProperFormat(),
      toDate: null,
      latitude: null,
      longitude: null,
      selectedTab: 0,
      eventName: ""
    };
    // this.fetchTopEvents();
    this.getCurrentPosition();
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

  itemSelectHandler = (event) => {
    this.props.navigator.push({
      screen: "Ema.PlaceDetailScreen",
      title: event.event_title,
      passProps: {
        selectedPlace: event
      }
    });
  };

  getCurDateTimeInProperFormat() {
    return (new Date().toJSON().slice(0, 16).replace(/T/g, ' '));
  };

  nowPressedHandler = () => {
    this.setState({fromDate: this.getCurDateTimeInProperFormat()});
  };

  getPosition = function (options) {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  getCurrentPosition = () => {
    this.getPosition()
      .then((position) => {
          this.props.onAddCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
            selectedTab: 1
          });
          //TODO do something here
          // console.log("Lat: " + this.state.latitude +" Lon: " + this.state.longitude);
          // this.fetchWEather();
        },
        {
          enableHighAccuracy: true,
          timeout: 25000,
          maximumAge: 3600000
        }
      )
      .catch((err) => {
        this.setState({error: err.message});
      });
  };



  renderError = () => {
    if (this.state.error)
      return (
        <Text>Err: {this.state.error}</Text>
      );
    else {
      return (<View/>);
    }
  };


  onPlaceLongEnoughHandler = (eventName) => {
    console.log("Got the name: " + eventName);
    this.setState({
      eventName
    });
  };

  render() {
    return (
      <View>
        {this.renderError()}
        <PlaceInput
          onPlaceLongEnough={this.onPlaceLongEnoughHandler}
        />

        <View style={{flexDirection: "row"}}>
          <View>
            <Text>Start at:</Text>
            <DatePicker
              style={{width: 200}}
              date={this.state.fromDate}
              mode="datetime"
              minDate={this.getCurDateTimeInProperFormat()}
              format="YYYY-MM-DD HH:mm"
              androidMode="spinner"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {

                  width: 0,
                  height: 0,
                },
                dateInput: {
                  height: 30
                }
              }}
              minuteInterval={10}
              onDateChange={(datetime) => {
                this.setState({fromDate: datetime});
              }}
            />
          </View>
          <View>
            <Text>Untill:</Text>
            <DatePicker
              style={{width: 200}}
              date={this.getCurDateTimeInProperFormat()}
              mode="datetime"
              minDate={this.state.fromDate}
              format="YYYY-MM-DD HH:mm"
              androidMode="spinner"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  width: 0,
                  height: 0,
                },
                dateInput: {
                  height: 30
                }
              }}
              minuteInterval={10}
              onDateChange={(datetime) => {
                this.setState({toDate: datetime});
              }}
            />
          </View>
        </View>
        <Text onPress={this.nowPressedHandler}>Now</Text>

        <View>
          <Text>Added places</Text>
          <EventsList
            baseUrl={this.state.baseUrl}
            onItemSelected={this.itemSelectHandler}
            latitude={this.state.latitude}
            longitude={this.state.longitude}
            eventName={this.state.eventName}
            limit={30}
            fromDate={this.state.fromDate}
            toDate={this.state.toDate}
          />
        </View>


      </View>
    );
  }
}


const mapStateToProps = state => {
  return {
    places: state.places.places
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName) => dispatch(addPlace(placeName)),
    onAddPlacesToDisplayOnMap: (placesArray) => dispatch(addPlacesToDisplayOnMap(placesArray)),
    onAddCurrentLocation: (location) => dispatch(addCurrentLocation(location))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeTab);
