import React, {Component} from "react";
import {Text, View} from "react-native";
import {connect} from "react-redux";
import PlaceList from "../../components/PlaceList/PlaceList";

class FindPlaceScreen extends Component {


    itemSelectHandler= (key) => {

    };
    render () {
            return (
                <View>
                    <PlaceList
                        places ={this.props.places}
                        onItemSelected={this.itemSelectHandler}
                    />
                </View>
            );
    }
}

const mapStateToProps  = state => {
    return {
        places: state.places.places
    };
};

export default connect (mapStateToProps)(FindPlaceScreen);