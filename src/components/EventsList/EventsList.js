import React, {Component} from "react";
import {StyleSheet, FlatList, View} from "react-native";
import EventDescriptionSmall from "../../components/EventDescriptionSmall";

class EventsList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
    this.fetchTopEvents();
  }


  fetchTopEvents = () => {
    // console.log(this.state.events);
    const url = this.props.baseUrl + "events/get_events.php?lim=30";

    fetch(url, this)
      .then((response) => {
        return response.json();
      })
      .then( (myJson) => {
        console.log("fetched: " + myJson.events.length);
        this.setState({
          events: myJson.events
        });
        // console.log(that.state.events);
      });

  };

  render() {
    console.log("Render called!");
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
