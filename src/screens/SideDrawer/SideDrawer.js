import React, {Component} from "react";
import {Text, View, Dimensions, StyleSheet} from "react-native";
class SideDrawer extends Component {
    render(){
        return (
            <View style={[
                styles.container,
                {width: Dimensions.get("window").width*0.8}
                ]}>
                <Text>
                    Side Drawer
                </Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        backgroundColor: "white",
        flex: 1
    }
});
export default SideDrawer;