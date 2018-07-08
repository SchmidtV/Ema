import React, {Component} from "react";
import {View} from "react-native";
import {connect} from "react-redux";
import PlaceList from "../../components/PlaceList/PlaceList";
import {addPlace} from "../../store/actions";
import PlaceInput from "../../components/PlaceInput/PlaceInput";


class HomeTab extends Component {
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

    itemSelectHandler= (key) => {
        const selectedPlace =  this.props.places.find(place => {
            return place.key === key;
        });
        this.props.navigator.push({
            screen: "Ema.PlaceDetailScreen",
            title: selectedPlace.name,
            passProps: {
                selectedPlace: selectedPlace
            }
        });
    };

    placeAddedHandler = placeName => {
        this.props.onAddPlace(placeName);
    };


    render () {
        return (
            <View>
                <PlaceInput onPlaceAdded={this.placeAddedHandler}/>
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

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName) => dispatch(addPlace(placeName))
    };
};

export default connect (mapStateToProps, mapDispatchToProps )(HomeTab);
