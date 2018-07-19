import React, {Component} from "react";
import {CheckBox, ListView, Picker, ScrollView, StyleSheet, Text, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import ExpandablePanel from "../../components/ExpandablePanel";
import {catData} from "../../components/Cathegories";

class FilterTab extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    this.state = {
      catMode: "and",
      price: null,
      latitude: 0,
      longitude: 0,
      catData: catData,
      style: {}
    }
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

  changeSelection(id) {
    let state = this.state.catData.map(function (d) {
      return {
        id: d.id,
        selected: (d.id === id ? !d.selected : d.selected)
      };
    });

    this.setState({catData: state});
    // console.log(this.state.catData);
  };

  getPosition = function (options) {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  getCurrentPosition = () => {
    this.getPosition()
      .then((position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        });
        //TODO do something here
        console.log("Lat: " + this.state.latitude +" Lon: " + this.state.longitude);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  resizeModal=(ev)=> {
    this.setState({style: {height: ev.nativeEvent.layout.height + 10}});
  };

  render() {
    const checks = this.state.catData.map((d) => {
      return (
        <View key={d.id} style={styles.checkBoxEntity}>

          <CheckBox
            data-id={d.id}
            value={d.selected}
            onChange={this.changeSelection.bind(this, d.id)}
          />
          <Text>{d.name} </Text>
        </View>
      );
    });



    return (
      <View style={{flex: 1}}>
        <View style={styles.inner} onLayout={(ev)=>{this.resizeModal(ev)}}>
        {/*<ScrollView style={styles.container} >*/}
          <ExpandablePanel title="Cathegories">
            {checks}
          </ExpandablePanel>

        {/*</ScrollView>*/}
        </View>

        {/*<Picker*/}
          {/*selectedValue={this.state.catMode}*/}
          {/*style={{height: 50, width: 100}}*/}
          {/*onValueChange={(itemValue, itemIndex) => this.setState({catMode: itemValue})}>*/}
          {/*<Picker.Item label="AND" value="and"/>*/}
          {/*<Picker.Item label="OR" value="or"/>*/}
        {/*</Picker>*/}


        {/*<View style={styles.checkBoxList}>*/}
          {/**/}
        {/*</View>*/}
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <Text>Price:</Text>
          <Picker
            selectedValue={this.state.price}
            style={{height: 50, width: 100}}
            onValueChange={(itemValue, itemIndex) => this.setState({price: itemValue})}>
            <Picker.Item label="Any" value={null}/>
            <Picker.Item label="Free" value={0}/>
            <Picker.Item label="<15 Euro" value={15}/>
            <Picker.Item label="<30 Euro" value={30}/>
            <Picker.Item label="<50 Euro" value={50}/>
            <Picker.Item label="<75 Euro" value={75}/>
            <Picker.Item label="<100 Euro" value={100}/>
          </Picker>
        </View>
        <View style={{flexDirection: "row"}}>
          <Text onPress={this.getCurrentPosition} style={{color: "blue"}}>HERE</Text>
          <Text> or </Text>
          <Icon size={20} name="map" onPress={()=>{alert("No map yet ;(")}}/>
        </View>
        <Text style={{width: "40%"}}>
          Position:  lat: {this.state.latitude.toFixed(2)} Lon:  {this.state.longitude.toFixed(2)}
        </Text>
      </View>
    );
  };
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
    flex            : 1,
    backgroundColor : '#f4f7f9',
    paddingTop      : 30
  }
});

export default FilterTab;