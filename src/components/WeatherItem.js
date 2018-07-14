import React, {Component} from "react";
import {Image, StyleSheet, Text, View} from "react-native";


class WeatherItem extends Component {

  constructor(props) {
    super(props);
    this.state =  {
      error: null,
      date: null,
      city: null,
      country: null,
      temp_min: null,
      temp_max: null,
      description: null,
      icon: null
    };
    // console.log("fetching data");
    this.fetchWeather();
  }

  fetchWeather = () => {
    let url = "http://pc18.beuth-hochschule.de/php/Stud/Rudi/weather/wetter.php?mode=forcast";
    if(this.props.place){
      url = url + "&q=" + this.props.place;
    }else if(this.props.latitude && this.props.longitude){
      url = url + "&lat="+this.props.latitude+"&lon=" +this.props.longitude;
    }else {
      console.log("Need place name or lat & lon to fetch!");
      return;
    }
    if(this.props.date) {
      url = url + "&date=" + this.props.date;
      console.log("Using date");
    }

    //JUST in case we need a body
    // const body = {};
    // console.log("fetching url: " + url);
    // fetch(url, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   // body: JSON.stringify(body)
    // }).then((res) => {
    //   if (res.ok) {
    //     let data = res.json();
    //     console.log(data);
    //     //TODO display result
    //   }
    // }, function (e) {
    //   console.log("Error!" + e);
    // });
    that = this;
    window.fetch(url, this)
      .then((response) =>{
        return response.json();
      })
      .then(function(myJson) {
        // console.log(myJson.weather);
        that.setState({
          error: myJson.error,
          date: myJson.weather.date,
          city: myJson.weather.city,
          country: myJson.weather.country,
          temp_min: myJson.weather.temp_min,
          temp_max: myJson.weather.temp_max,
          description: myJson.weather.description,
          icon: myJson.weather.icon
        });
      });
  };

  render() {
    const display = [];
    if (this.state.date) {
      display.push(
        <Text key ="date" >Date: {this.state.date}</Text>
      );
    }

    if (this.state.city) {
      display.push(
        <Text key ="loc">Location: {this.state.city}</Text>
      );
    }

    if (this.state.temp_min && this.state.temp_max) {
      display.push(
        <Text key ="temp"> {this.state.temp_min} - {this.state.temp_max}</Text>
      );
    }

    if (this.state.icon) {
      display.push(
        <Image key ="icon"
          source={{uri: "http://openweathermap.org/img/w/" +this.state.icon.toString() +".png"}}
          style={styles.weatherImage}
          resizeMode="contain"
        />
      );
    }


    return (
      <View>
        {display}
      </View>
    );
  };
}

const styles = StyleSheet.create({

  weatherImage:  {
    width: "100%",
    height: 40
  }
});


export default WeatherItem;