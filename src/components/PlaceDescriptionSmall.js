import React, {Component} from 'react';
import {Button, TextInput, View, StyleSheet, Image, Text, TouchableOpacity} from "react-native";
import StarRating from 'react-native-star-rating';

const PlaceDescriptionSmall = (props) => (
  <TouchableOpacity onPress={props.onItemPressed}>
    <View style={{flex: 1, borderWidth: 1, borderColor: '#000000', flexDirection: "row"}}>
      <Image
        resizeMode="contain"
        source={props.placeImage}
        style={styles.placeImage}
      />
      <View>
        <Text>{props.placeType}</Text>
        <Text>{props.placeName}</Text>
        <Text>{props.placePrice}</Text>

        <Text>{props.placeTime}</Text>
        <View style={{flex: 1, flexDirection: "row"}}>
          <StarRating
            disabled={false}
            maxStars={5}
            starSize={20}
            fullStarColor={"gray"}
            rating={parseInt(props.placeRating)}
          />
          <Text>{props.placeRating}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);
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

export default PlaceDescriptionSmall;