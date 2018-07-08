import React from "react";
import {StyleSheet, FlatList} from "react-native";
import ListItem from "./ListItem/ListItem";

const placeList = (props) => {
    return (
        <FlatList style={styles.listContainer}
                  data={props.places}
                  renderItem={(item) => (
                      <ListItem
                          placeName={item.item.name}
                          placeImage = {item.item.image}
                          onItemPressed={() => props.onItemSelected(item.item.key)}
                      />
                  )}
        />
    );
};

const styles = StyleSheet.create({
    listContainer: {
        width: "100%"
    }
});
export default placeList;