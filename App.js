import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, TextInput} from 'react-native';
import PlaceList from "./src/components/PlaceList";
import PlaceInput from "./src/components/PlaceInput";
import PlaceDetail from "./src/components/PlaceDetail";
import {addPlace, deletePlace, selectPlace, deselectPlace} from "./src/store/actions/index";
import {connect} from "react-redux";

class App extends Component {

    placeSubmitHandler = (placeName) => {
        this.props.onAddPlace(placeName);
    };

    onItemDeleted = () => {
        this.props.onDeletePlace();

    };
    onItemSelected = (key) => {
        this.props.onSelectPlace(key);
    };

    onModalClose = () => {
        this.props.onDeselectPlace();
    };

    render() {

        return (
            <View style={styles.container}>
                <PlaceDetail
                    selectedPlace={this.props.selectedPlace}
                    onItemDeleted={this.onItemDeleted}
                    onModalClose={this.onModalClose}
                />
                <PlaceInput placeSubmitHandler={this.placeSubmitHandler}/>
                <PlaceList
                    places={this.props.places}
                    onItemSelected={this.onItemSelected}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    listContainer: {
        width: "100%"
    }
});

const mapStateToProps = state => {
    return {
        places: state.places.places,
        selectedPlace: state.places.selectedPlace
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (name) => dispatch(addPlace(name)),
        onDeletePlace: () => dispatch(deletePlace()),
        onSelectPlace: (key) => dispatch(selectPlace(key)),
        onDeselectPlace: () => dispatch(deselectPlace())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);