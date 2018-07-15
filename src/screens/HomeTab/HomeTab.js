import React, {Component} from "react";
import {Button, Text, StyleSheet, View} from "react-native";
import {connect} from "react-redux";
import {addPlace} from "../../store/actions";
import PlaceInput from "../../components/PlaceInput/PlaceInput";
import DatePicker from 'react-native-datepicker';
import MaterialTabs from 'react-native-material-tabs';
import WeatherItem from "../../components/WeatherItem";
import EventsList from "../../components/EventsList/EventsList";


class HomeTab extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    this.state = {
      baseUrl: "http://pc18.beuth-hochschule.de/php/Stud/Rudi/",
      fromDate: this.getCurDateTimeInProprFormat(),
      toDate: null,
      latitude: null,
      longitude: null,
      selectedTab: 0
    };
    // this.fetchTopEvents();
    this.getCurrentPosition();
  }

  fetchTopEvents = () => {
    // // console.log(this.state.events);
    // const url = this.state.baseUrl +"events/get_events.php?lim=30";
    //
    // that = this;
    // window.fetch(url, this)
    //   .then((response) =>{
    //     return response.json();
    //   })
    //   .then(function(myJson) {
    //     // console.log(myJson.events);
    //     that.setState({
    //       topEvents: myJson.events
    //     });
    //   });

    // console.log(this.state.events);
    // fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(body)
    // }).then((res) => {
    //   if (res.ok) {
    //     console.log(res);
    //     //TODO display result
    //   }
    // }, function (e) {
    //   console.log("Error!" + e);
    // });
  };

  onNavigatorEvent = event => {
    if (event.type === "NavBarButtonPress") {
      if (event.id === "sideDrawerToggle") {
        this.props.navigator.toggleDrawer({
          side: "left"
        })
      }
    }
  };

  fetchEventByLocation = () => {
    url = baseUrl + ""
    fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }).then((res) => {
      if (res.ok) {
        console.log(res);
        //TODO display result
      }
    }, function (e) {
      console.log("Error!" + e);
    });
  };

  itemSelectHandler = (event) => {
    // const selectedEvent = this.state.topEvents.find(event => {
    //   return event.event_title === key;
    // });

    // console.log("Key: " + key);
    // console.log("First event title: " + this.state.topEvents[0].event_title);
    this.props.navigator.push({
      screen: "Ema.PlaceDetailScreen",
      title: event.event_title,
      passProps: {
        selectedPlace: event
      }
    });
  };

  placeAddedHandler = placeName => {
    this.props.onAddPlace(placeName);
  };

  getCurDateTimeInProprFormat() {
    return (new Date().toJSON().slice(0, 16).replace(/T/g, ' '));
  };

  nowPressedHandler = () => {
    this.setState({fromDate: this.getCurDateTimeInProprFormat()});
  };

  getPosition = function (options) {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  getCurrentPosition = () => {
    this.getPosition()
      .then((position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          selectedTab: 1
        });
        //TODO do something here
        // console.log("Lat: " + this.state.latitude +" Lon: " + this.state.longitude);
        this.fetchWEather();
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  //TODO DELETE
  dontTouchMyButton = () => {

    console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
    // this.getCurrentPosition();
    // console.log(this.state.baseUrl);
    // this.fetchTopEvents();
  };

  fetchWEather = () => {
    const url = "http://pc18.beuth-hochschule.de/php/Stud/Rudi/weather/wetter.php";
    const body = {};
    fetch(url + "?lat=" + this.state.latitude + "&lon=" + this.state.longitude + "&mode=forecast", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }).then((res) => {
      if (res.ok) {
        // console.log(res.json());
        //TODO display result
      }
    }, function (e) {
      console.log("Error!" + e);
    });
  };

  tabRenderer() {

    switch (this.state.selectedTab) {
      case 0:
        return (
          <View>
            <Text>Added places</Text>
            <EventsList
              baseUrl={this.state.baseUrl}
              latitude={this.state.latitude}
              longitude={this.state.longitude}
              onItemSelected={this.itemSelectHandler}
              limit={30}
              fromDate={this.state.fromDate}
            />

          </View>
        );
      case 1:
        return (
          <View>
            <Text>
              Coming soon
            </Text>
          </View>
        );
      case 2:
        return (
          <View>
            <Text>
              Coming not very soon
            </Text>
          </View>
        );
      case 3:
        return (
          <View>
            <Text>
              not Coming
            </Text>
          </View>
        );
      default:
        return (
          <PlaceList
            places={this.props.places}
            onItemSelected={this.itemSelectHandler}
          />
        );
    }
  };

  render() {
    return (
      <View>
        <PlaceInput onPlaceAdded={this.placeAddedHandler}/>

        <View style={{flexDirection: "row"}}>
          <View>
            <Text>Start at:</Text>
            <DatePicker
              style={{width: 200}}
              date={this.state.fromDate}
              mode="datetime"
              minDate={this.getCurDateTimeInProprFormat()}
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
              date={this.getCurDateTimeInProprFormat()}
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
        {/*<MaterialTabs*/}
        {/*items={['For you', 'Soon', 'Best', "Near Me"]}*/}
        {/*selectedIndex={this.state.selectedTab}*/}
        {/*onChange={index => this.setState({ selectedTab: index })}*/}
        {/*/>*/}

        <View>
          <Text>Added places</Text>
          <EventsList
            baseUrl={this.state.baseUrl}
            onItemSelected={this.itemSelectHandler}
            latitude={this.state.latitude}
            longitude={this.state.longitude}
            limit={30}
            fromDate={this.state.fromDate}
            toDate={this.state.toDate}
          />
        </View>
        <Button title="Special button for special person" onPress={this.dontTouchMyButton}/>


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
    onAddPlace: (placeName) => dispatch(addPlace(placeName))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeTab);
