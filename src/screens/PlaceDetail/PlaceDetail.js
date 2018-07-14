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
        this.props.onDeletePlace(this.props.selectedPlace.t_event_id);
        this.props.navigator.pop();
    };

    render() {

      let imgUrl = null;
      if (this.props.selectedPlace.event_imgurl) {
        imgUrl = {uri: this.props.selectedPlace.event_imgurl};
      } else {
        imgUrl = require("../../assets/NoImgArt.png");
      }

        return (
            <View style={styles.container}>
                <View>
                    <Image
                        source={imgUrl}
                        style={styles.placeImage}
                        resizeMode="contain"
                    />
                    <Text style={styles.placeName}>{this.props.selectedPlace.event_title}</Text>
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