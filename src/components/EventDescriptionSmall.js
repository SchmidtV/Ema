import React, {Component} from 'react';
import {Button, TextInput, View, StyleSheet, Image, Text, TouchableOpacity} from "react-native";
import StarRating from 'react-native-star-rating';
import img from "../assets/NoImgArt.png"

class EventDescriptionSmall extends Component {
  constructor(props) {
    super(props);
  }

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
          <View>
            <Text>{this.props.eventInfo.event_category_id}</Text>
            <Text>{this.props.eventInfo.event_title}</Text>
            <Text>{this.props.eventInfo.event_price}</Text>

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