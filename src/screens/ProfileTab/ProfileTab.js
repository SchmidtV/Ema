import React, {Component} from "react";
import {Button, Text, View} from "react-native";

class ProfileTab extends Component {
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

    loginCLickedHandler = () => {
            this.props.navigator.push({
                screen: "Ema.AuthScreen",
                title: "Log in"
            });
    };

    render (){
        return(
            <View>
                <Button title="Log in" onPress={this.loginCLickedHandler}/>
            </View>
        );
    };
}

export default ProfileTab;