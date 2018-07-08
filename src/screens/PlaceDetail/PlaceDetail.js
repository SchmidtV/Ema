import React from "react";
import {Image, View, StyleSheet} from "react-native";
import {Button} from "react-native";
import {Text} from "react-native";

const placeDetail = props => {

    return (

            <View style={styles.container}>
                <View>
                    <Image
                        source={props.selectedPlace.image}
                        style={styles.placeImage}
                        resizeMode = "contain"
                    />
                    <Text style={styles.placeName}>{props.selectedPlace.name.toString()}</Text>
                </View>
                <View>
                    <Button
                        title="Delete" color="red"
                        onPress={props.onItemDeleted}
                    />
                </View>
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 20
    },
    placeImage:  {
        width: "100%",
        height: 200
    },
    placeName: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 28

    }
});

export default placeDetail