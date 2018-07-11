import React, {Component} from "react";
import {Text, View} from "react-native";


class WeatherItem extends Component {

  constructor(props) {
    super(props);

  }

  render (){
    const display = [];
    if(this.props.date){
      display.push(
        <Text>Date: {this.props.date}</Text>
      );
    }

    if(this.props.city){
      display.push(
        <Text>Location: {this.props.city}</Text>
      );
    }

    if(this.props.temp_min && this.props.temp_max){
      display.push(
        <Text> {this.props.temp_min} - {his.props.temp_max}</Text>
      );
    }

    if(this.props.icon){

      display.push(
        <Text> {this.props.temp_min} - {his.props.temp_max}</Text>
      );
    }


    return(
      <View>
        {display}
      </View>
    );
  };
}


export default WeatherItem;