import React from "react";
import {StyleSheet, FlatList, View} from "react-native";
import ListItem from "../ListItem/ListItem";
import PlaceList from "../../components/PlaceList/PlaceList";
import PlaceDescriptionSmall from "../../components/PlaceDescriptionSmall";

const placeList = props => {
  return (
    <FlatList
      style={styles.listContainer}
      data={props.places}
      renderItem={({item}) => (
        <PlaceDescriptionSmall
          placeImage = {item.image}
          placeName={item.name}
          placeType="11"
          placePrice="222"
          placeTime="333"
          placeRating="4.1"
          onItemPressed={() => props.onItemSelected(item.key)}
        />
      )}
    />
  );
};
{/*<ListItem*/}
  {/*placeName={item.name}*/}
  {/*placeImage={item.image}*/}
  {/*onItemPressed={() => props.onItemSelected(item.key)}*/}
{/*/>*/}
const styles = StyleSheet.create({
  listContainer: {
    width: "100%",
  }
});

export default placeList;
