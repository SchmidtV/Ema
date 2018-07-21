import React, {Component} from "react";
import {View, StyleSheet, CheckBox} from "react-native";
import {Text} from "react-native";


class CategoriesScreen extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = event => {
    if (event.type === "NavBarButtonPress") {
      if (event.id === "sideDrawerToggle") {
        this.props.navigator.toggleDrawer({
          side: "left"
        })
      }
    }
  };



  handleCheck = (id) =>{
    this.props.changeSelection(id);
  };

  render() {

    const checks = this.props.catData.map((d) => {
      return (
        <View key={d.id} style={styles.checkBoxEntity}>
          <CheckBox
            data-id={d.id}
            value={d.selected}
            onChange={this.handleCheck.bind(this, d.id)}
          />
          <Text>{d.name} </Text>
        </View>
      );
    });

    return (
        <View style={styles.checkBoxList}>
          {checks}
        </View>
    );
  }
}


const styles = StyleSheet.create({
  checkBoxList: {
    flexDirection: "row",
    flexWrap: 'wrap'
  },
  checkBoxEntity: {
    flexDirection: "row",
    width: "50%",
    height: 30,
    alignItems: "center"
  },
  container: {
    flex: 1,
    backgroundColor: '#f4f7f9',
    paddingTop: 30
  }
});


export default CategoriesScreen;