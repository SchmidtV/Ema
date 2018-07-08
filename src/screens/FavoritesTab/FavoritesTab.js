import React, {Component} from "react";
import {Text, View} from "react-native";

class FavoritesTab extends Component {
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
    render (){
        return(
            <View>
                <Text>
                    Home
                </Text>
            </View>
        );
    };
}

export default FavoritesTab;