import React, {Component} from 'react';
import {Button, TextInput, View, StyleSheet, Image, Text, TouchableOpacity} from "react-native";
import StarRating from 'react-native-star-rating';
import WeatherItem from "./WeatherItem";
import {catData} from "./Cathegories";

class EventDescriptionSmall extends Component {
  constructor(props) {
    super(props);
  }


  renderCathegory = () => {
    // let lookForId = parseInt(this.props.eventInfo.event_category_id);
    // catData.filter( (event) => {
    //   // console.log(lookForId);
    //   return event.id === lookForId;
    // });

  };

  render() {
    let imgUrl = null;
    if (this.props.eventInfo.event_imgurl) {
      imgUrl = {uri: this.props.eventInfo.event_imgurl};
    } else {
      imgUrl = require('../assets/NoImgArt.png');
    }

    return (
      <TouchableOpacity onPress={this.props.onItemPressed}>
        <View style={{flex: 1, flexDirection: "row"}}>
          <Image
            resizeMode="contain"
            source={imgUrl}
            style={styles.placeImage}
          />
            <View style={{flexDirection: "column", width: "50%"}}>
              <Text>Radius: {this.props.eventInfo.radius}</Text>
              <Text>{this.props.eventInfo.event_date}</Text>
              <Text>Cathegory: {catData[parseInt(this.props.eventInfo.event_category_id)-1].name}</Text>
              <Text>{this.props.eventInfo.event_title}</Text>
              <Text>{this.props.eventInfo.event_price}</Text>
            </View>
            <WeatherItem eventInfo = {this.props.eventInfo}/>
            {/*<Text>{props.placeTime}</Text>*/}
            {/*<View style={{flex: 1, flexDirection: "row"}}>*/}
            {/*<StarRating*/}
            {/*disabled={false}*/}
            {/*maxStars={5}*/}
            {/*starSize={20}*/}
            {/*fullStarColor={"gray"}*/}
            {/*rating={parseInt(props.placeRating)}*/}
            {/*/>*/}
            {/*<Text>{props.placeRating}</Text>*/}
            {/*</View>*/}
        </View>
      </TouchableOpacity>
    );
  }


}

const styles = StyleSheet.create({
  listItem: {
    width: "100%",
    padding: 10,
    backgroundColor: "#eee",
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center"
  },
  placeImage: {
    marginRight: 10,
    width: 100,
    height: 100
  }
});

export default EventDescriptionSmall;