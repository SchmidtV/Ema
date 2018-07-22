import React, {Component} from "react";
import {View, StyleSheet, CheckBox} from "react-native";
import {Text} from "react-native";


class CategoriesScreen extends Component {
  constructor(props) {
    super(props);

  }

  handleCheck = (id) =>{
    this.props.changeSelection(id);
  };


  renderChecks = () =>{
    return this.props.catData.map((d) => {
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
  };

  render() {
       return (
        <View style={styles.checkBoxList}>
          {this.renderChecks()}
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