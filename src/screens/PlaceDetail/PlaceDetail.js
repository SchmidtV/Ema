import React, {Component} from "react";
import {Image, View, StyleSheet} from "react-native";
import {Button} from "react-native";
import {Text} from "react-native";
import {connect} from "react-redux";
import {deletePlace} from "../../store/actions/index";
import WeatherItem from "../../components/WeatherItem";


class PlaceDetail extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    onNavigatorEvent = event => {
        if(event.type === "NavBarButtonPress"){
            if(event.id === "sideDrawerToggle"){
                this.props.navigator.toggleDrawer({
                    side: "left"
                })
            }
        }
    };
    placeDeletedHandler = () => {
        this.props.onDeletePlace(this.props.selectedPlace.key);
        this.props.navigator.pop();
    };

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Image
                        source={this.props.selectedPlace.image}
                        style={styles.placeImage}
                        resizeMode="contain"
                    />
                    <Text style={styles.placeName}>{this.props.selectedPlace.name.toString()}</Text>
                </View>
                <WeatherItem date={false}/>
                <View>
                    <Button
                        title="Delete" color="red"
                        onPress={this.placeDeletedHandler}
                    />
                </View>
            </View>
        );
    }
}


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
const mapDispatchToProps = dispatch => {
    return {
        onDeletePlace: (key) => dispatch(deletePlace(key))
    };
};
export default connect (null, mapDispatchToProps)(PlaceDetail);