import React, {Component} from "react";
import {Button, CheckBox, ListView, Picker, ScrollView, StyleSheet, Text, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import ExpandablePanel from "../../components/ExpandablePanel";
import {catData} from "../../components/Cathegories";
import {connect} from "react-redux";
import DatePicker from "react-native-datepicker";

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
    }
  }

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

  getCurDateTimeInProprFormat() {
    return (new Date().toJSON().slice(0, 16).replace(/T/g, ' '));
  };

  resizeModal=(ev)=> {
    this.setState({style: {height: ev.nativeEvent.layout.height + 10}});
  };

  onSubmitPressedHandler = (lim= 50) => {
    let url = this.props.baseUrl + "events/get_events.php";
    if(lim){
      url = url + "?lim=" + lim;
    }else{
      url= url +"?";
    }


    if(this.state.longitude && this.state.longitude){
      url = url + "&lon="+this.state.longitude+"&lat=" +this.state.latitude;
    }else{
      return;
    }

    if(this.state.fromDate){
      url = url + "&fromdate="+ this.state.fromDate;
    }

    if(this.state.toDate){
      url = url + "&todate="+ this.state.toDate;
    }

    let catList=[];
    this.state.catData.map(category => {
      if(category.selected){
        catList.push(category.id)
      }
    });
    if(catList){
      url = url + "&category="+ catList.toString();
    }
    // http://pc18.beuth-hochschule.de/php/Stud/Rudi/events/.. 19:00:00&todate=2018-10-20 23:00:00&category=2,3,4

    console.log(url);
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
        <View style={{flexDirection: "row"}}>
          <Text onPress={this.getCurrentPosition} style={{color: "blue"}}>HERE</Text>
          <Text> or </Text>
          <Icon size={20} name="map" onPress={()=>{alert("No map yet ;(")}}/>
        </View>
        <Text style={{width: "40%"}}>
          Position:  lat: {this.state.latitude.toFixed(2)} Lon:  {this.state.longitude.toFixed(2)}
        </Text>
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
    flex            : 1,
    backgroundColor : '#f4f7f9',
    paddingTop      : 30
  }
});


const mapStateToProps = state => {
  return {
    baseUrl: state.places.baseUrl
  };
};

export default connect(mapStateToProps)(FilterTab);
