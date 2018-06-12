import React from "react";
import {Image, View, StyleSheet} from "react-native";
import {Modal} from "react-native";
import {Button} from "react-native";
import {Text} from "react-native";

const placeDetail = props => {
    let modalContent = null;
    if (props.selectedPlace) {
        modalContent = (
            <View>
                <Image
                    source={props.selectedPlace.pImage}
                    style={styles.placeImage}
                    resizeMode = "contain"
                />
                <Text style={styles.placeName}>{props.selectedPlace.pName.toString()}</Text>
            </View>
        );

    }
    return (
        <Modal
            visible={props.selectedPlace !== null}
            animationType="slide"
            onRequestClose={props.onModalClose}
        >
            <View style={styles.modalContainer}>
                {modalContent}
                <View>
                    <Button
                        title="Delete" color="red"
                        onPress={props.onItemDeleted}
                    />
                    <Button
                        title="Close"
                        onPress={props.onModalClose}
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
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