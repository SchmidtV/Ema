import React, {Component} from "react";
import {Button, Text, View} from "react-native";
import {connect} from "react-redux";
import PlaceList from "../../components/PlaceList/PlaceList";
import {addPlace} from "../../store/actions";
import PlaceInput from "../../components/PlaceInput/PlaceInput";
import DatePicker from 'react-native-datepicker';

class HomeTab extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    this.state = {
      datetime: '2016-05-05 20:00',
      latitude: null,
      longitude: null

    };
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

  fetchEventByLocation = () => {
    const url = "";
    let body = {
      location: [""]
    };
    fetch(url, {
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

  itemSelectHandler = (key) => {
    const selectedPlace = this.props.places.find(place => {
      return place.key === key;
    });
    this.props.navigator.push({
      screen: "Ema.PlaceDetailScreen",
      title: selectedPlace.name,
      passProps: {
        selectedPlace: selectedPlace
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
         });
         //TODO do something here
         console.log("Lat: " + this.state.latitude +" Lon: " + this.state.longitude);
       })
       .catch((err) => {
         console.error(err.message);
       });
   };

  //TODO DELETE
  dontTouchMyButton =() => {
    console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");

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
        <Button title="Special" onPress={this.dontTouchMyButton}/>
        <PlaceList
          places={this.props.places}
          onItemSelected={this.itemSelectHandler}
        />
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
