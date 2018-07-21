import React, {Component} from "react";
import {Button, CheckBox, ListView, Picker, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import ExpandablePanel from "../../components/ExpandablePanel";
import {catData} from "../../components/Cathegories";
import {connect} from "react-redux";
import DatePicker from "react-native-datepicker";
import {addPlacesToDisplayOnMap} from "../../store/actions";

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
      style: {},
      fromDate: this.getCurDateTimeInProprFormat(),
      toDate: null,
      maxRange: null,
      events: []
    }
  }

  changeSelection(id) {
    console.log(id);
    let state = this.state.catData.map(function (d) {
      return {
        id: d.id,
        selected: (d.id === id ? !d.selected : d.selected)
      };
    });

    this.setState({catData: state});
    // console.log(this.state.catData);
  };



  getCurDateTimeInProprFormat() {
    return (new Date().toJSON().slice(0, 16).replace(/T/g, ' '));
  };

  resizeModal = (ev) => {
    this.setState({style: {height: ev.nativeEvent.layout.height + 10}});
  };


  onCatClicked = (event) => {
    this.props.navigator.push({
      screen: "Ema.CategoriesScreen",
      title: "Categories",
      passProps: {
        catData: this.state.catData,
        changeSelection: this.changeSelection.bind(this)
      }
    });
  };

  onSubmitPressedHandler = () => {
    if (!(this.props.curLocation.longitude && this.props.curLocation.latitude) && !this.state.eventName) {
      console.log("No cords + no name");
      return;
    }

    let url = this.props.baseUrl + "events/get_events.php";
    if (this.state.limit) {
      url = url + "?lim=" + this.state.limit;
    } else {
      url = url + "?";
    }

    if (this.props.curLocation.longitude && this.props.curLocation.latitude) {
      url = url + "&lon=" + this.props.curLocation.longitude + "&lat=" + this.props.curLocation.latitude;
    }

    if (this.state.eventName) {
      url = url + "&name=" + this.state.eventName;
    } else if (this.state.maxRange && parseInt(this.state.maxRange) > 0) {
      url = url + "&radius=" + this.state.maxRange;
    }

    if (this.state.fromDate) {
      url = url + "&fromdate=" + this.state.fromDate;
    }

    if (this.state.toDate) {
      url = url + "&todate=" + this.state.toDate;
    }

    let catList = [];
    this.state.catData.map(category => {
      if (category.selected) {
        catList.push(category.id)
      }
    });

    if (catList && catList.toString().length > 0) {
      url = url + "&category=" + catList.toString();
    }

    console.log("Fetching events: " + url);
    fetch(url, this)
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        let sortedArray = myJson.events;
        sortedArray.sort((a, b) => {
          return (a.radius > b.radius) ? 1 : ((b.radius > a.radius) ? -1 : 0);
        });
        this.props.onAddPlacesToDisplayOnMap(sortedArray);
        this.setState({
          events: sortedArray
        });
      });

  };


  onSubmitPressedHandler1 = () => {
    let url = this.props.baseUrl + "events/get_events.php";
    if (this.state.lim) {
      url = url + "?lim=" + lim;
    } else {
      url = url + "?lim=50";
    }


    if (this.state.longitude && this.state.longitude) {
      url = url + "&lon=" + this.state.longitude + "&lat=" + this.state.latitude;
    } else {
      return;
    }

    if (this.state.fromDate) {
      url = url + "&fromdate=" + this.state.fromDate;
    }

    if (this.state.toDate) {
      url = url + "&todate=" + this.state.toDate;
    }

    let catList = [];
    this.state.catData.map(category => {
      if (category.selected) {
        catList.push(category.id)
      }
    });

    if (catList && catList.toString().length > 0) {
      url = url + "&category=" + catList.toString();
    }



    console.log(url);
  };

  maxRangeChangeHandler = (value) => {
    if(isNaN(value)){
      return;
    }
    this.setState({
      maxRange: value
    });
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

//TODO replace categories accordion panel to pop-up

    return (
      <View style={{flex: 1}}>
        {/*<View style={styles.inner} onLayout={(ev) => {*/}
          {/*this.resizeModal(ev)*/}
        {/*}}>*/}
          {/*/!*<ScrollView style={styles.container} >*!/*/}
          {/*<ExpandablePanel title="Cathegories">*/}
            {/*{checks}*/}
          {/*</ExpandablePanel>*/}

          {/*/!*</ScrollView>*!/*/}
        {/*</View>*/}
        <Button title="Categories" onPress={this.onCatClicked}/>
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
          <Text>Max range:</Text>
          <TextInput
            style={{width: 100}}
            placeholder="distance in km"
            value={this.state.maxRange}
            onChangeText={this.maxRangeChangeHandler}
          />
          <Text>km</Text>
        </View>
        <View style={{flexDirection: "row"}}>
          <View>
            <Text>Start at:</Text>
            <DatePicker
              style={{width: 200}}
              date={this.state.fromDate}
              mode="datetime"
              minDate={this.getCurDateTimeInProprFormat()}
              format="YYYY-MM-DD HH:mm"
              androidMode="spinner"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {

                  width: 0,
                  height: 0,
                },
                dateInput: {
                  height: 30
                }
              }}
              minuteInterval={10}
              onDateChange={(datetime) => {
                this.setState({fromDate: datetime});
              }}
            />
          </View>
          <View>
            <Text>Untill:</Text>
            <DatePicker
              style={{width: 200}}
              date={this.getCurDateTimeInProprFormat()}
              mode="datetime"
              minDate={this.state.fromDate}
              format="YYYY-MM-DD HH:mm"
              androidMode="spinner"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  width: 0,
                  height: 0,
                },
                dateInput: {
                  height: 30
                }
              }}
              minuteInterval={10}
              onDateChange={(datetime) => {
                this.setState({toDate: datetime});
              }}
            />
          </View>
        </View>

        <Button title="Submit" onPress={this.onSubmitPressedHandler}/>
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
    flex: 1,
    backgroundColor: '#f4f7f9',
    paddingTop: 30
  }
});


const mapStateToProps = state => {
  return {
    baseUrl: state.places.baseUrl,
    curLocation: state.places.curLocation
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAddPlacesToDisplayOnMap: (placesArray) => dispatch(addPlacesToDisplayOnMap(placesArray))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FilterTab);
