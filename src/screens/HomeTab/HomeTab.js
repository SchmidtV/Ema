import React, {Component} from "react";
import {Button, Text, TextInput, View} from "react-native";
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
      datetime: '2016-05-05 20:00',
      latitude: null,
      longitude: null,
      selectedTab: 0
    };
    // this.fetchTopEvents();
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
    let body = {
      location: [""]
    };
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
    return (new Date().toJSON().slice(0,16).replace(/T/g,' '));
  };

  nowPressedHandler = () => {
    this.setState({datetime: this.getCurDateTimeInProprFormat()});
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
  dontTouchMyButton =() => {

    console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
    // this.getCurrentPosition();
    // console.log(this.state.baseUrl);
    // this.fetchTopEvents();
  };

  fetchWEather = () => {
    const url = "http://pc18.beuth-hochschule.de/php/Stud/Rudi/weather/wetter.php";
    const body = {};
    fetch(url + "?lat="+this.state.latitude+"&lon=" +this.state.longitude+"&mode=forecast", {
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
  tabRenderer(){

    switch (this.state.selectedTab){
      case 0:
        return (
          <View>
            <Text>Added places</Text>
            <EventsList
              baseUrl = {this.state.baseUrl}
              onItemSelected={this.itemSelectHandler}
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
        <Text>Start at:</Text>
        <DatePicker
          style={{width: 200}}
          date={this.state.datetime}
          mode="datetime"
          minDate= {this.getCurDateTimeInProprFormat()}
          format="YYYY-MM-DD HH:mm"
          androidMode = "spinner"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          minuteInterval={10}
          onDateChange={(datetime) => {this.setState({datetime: datetime});}}
        />
        <Text onPress={this.nowPressedHandler}>Now</Text>
        <TextInput placeholder="Google Map Placeholder"/>
        <MaterialTabs
          items={['For you', 'Soon', 'Best', "Near Me"]}
          selectedIndex={this.state.selectedTab}
          onChange={index => this.setState({ selectedTab: index })}
        />
        <View>
          <Text>Added places</Text>
          <EventsList
            baseUrl = {this.state.baseUrl}
            onItemSelected={this.itemSelectHandler}
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
