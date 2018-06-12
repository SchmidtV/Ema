import React, {Component} from 'react';
import {Button, TextInput, View, StyleSheet} from "react-native";

class PlaceInput extends Component {
    state = {
        placeName: "",
    };

    placeInput = (value) => {
        this.setState({
            placeName: value
        });
    };

    placeSubmitHandler = () => {
        if (this.state.placeName.trim() === "") {
            return;
        }
        this.props.placeSubmitHandler(this.state.placeName);
        this.setState({
            placeName: ""
        });

    };

    render() {

        return (
            <View style={styles.inputContainer}>

                <TextInput
                    placeholder="Please choose location"
                    value={this.state.placeName}
                    onChangeText={this.placeInput}
                    style={styles.placeInput}
                />
                <Button
                    onPress={this.placeSubmitHandler}
                    style={styles.placeButton}
                    title="Add"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({

    inputContainer: {
        // flex: 1,
        width: "100%",
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center"
    },
    placeInput: {
        width: "70%"
    },
    placeButton: {
        width: "30%"
    }
});

export default PlaceInput;