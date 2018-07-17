import React, {Component} from "react";
import {StyleSheet, FlatList, View} from "react-native";
import EventDescriptionSmall from "../../components/EventDescriptionSmall";

class EventsList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  componentWillReceiveProps(nextProps) {
    // console.log("props changed");
    this.fetchEvents(nextProps);
  }


  fetchEvents = (curProps = this.props) => {
    let url = curProps.baseUrl + "events/get_events.php";
    if(curProps.limit){
      url= url + "?lim=" + curProps.limit;
    }else{
      url= url + "?lim=30";
    }

    if(curProps.longitude && curProps.longitude){
      url = url + "&lon="+curProps.longitude+"&lat=" +curProps.latitude;
    }else{
      return;
    }

    if(curProps.fromDate){
      url = url + "&fromdate="+ curProps.fromDate;
    }

    if(curProps.toDate){
      url = url + "&todate="+ curProps.toDate;
    }

    if(curProps.categories){
      url = url + "&category="+ curProps.categories;
    }

    console.log("Fetching events: " + url);
    fetch(url, this)
      .then((response) => {
        return response.json();
      })
      .then( (myJson) => {
        let sortedArray = myJson.events;
        sortedArray.sort((a,b)=>{return (a.radius > b.radius) ? 1 : ((b.radius > a.radius) ? -1 : 0);} );
        this.setState({
          events: sortedArray
        });
        // console.log(that.state.events);
      });

  };

  render() {
    return (
      <FlatList
        style={styles.listContainer}
        data={this.state.events}
        extraData={this.state}
        keyExtractor={(item) => item.t_event_id}
        renderItem={({item}) => (
          <EventDescriptionSmall
            eventInfo={item}
            onItemPressed={() => this.props.onItemSelected(item)}
          />

        )}
      />
    );
  }
}


const
  styles = StyleSheet.create({
    listContainer: {
      width: "100%",
    }
  });

export default EventsList;
