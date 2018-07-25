import React, {Component} from "react";
import {StyleSheet, FlatList, View} from "react-native";
import EventDescriptionSmall from "../../components/EventDescriptionSmall";
import {connect} from "react-redux";
import {addPlacesToDisplayOnMap} from "../../store/actions";

class EventsList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  componentWillReceiveProps(nextProps) {
    this.fetchEvents(nextProps);
  }


  fetchEvents = (curProps = this.props) => {
      if (!(curProps.longitude && curProps.latitude) && !curProps.eventName) {
        console.log("No cords + no name");
        return;
      }

      let url = curProps.baseUrl + "events/get_events.php";
      if (curProps.limit) {
      url = url + "?lim=" + curProps.limit;
    } else {
      url = url + "?lim=50";
    }

    if (curProps.longitude && curProps.latitude) {
      url = url + "&lon=" + curProps.longitude + "&lat=" + curProps.latitude;
    }

    if (curProps.eventName) {
      url = url + "&name=" + curProps.eventName;
    }

    if (curProps.fromDate) {
      url = url + "&fromdate=" + curProps.fromDate;
    }

    if (curProps.toDate) {
      url = url + "&todate=" + curProps.toDate;
    }

    if (curProps.categories && curProps.categories.toString().length > 0) {
      url = url + "&category=" + curProps.categories.toString();
    }

    // console.log("Fetching events: " + url);
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

const styles = StyleSheet.create({
  listContainer: {
    width: "100%",
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onAddPlacesToDisplayOnMap: (placesArray) => dispatch(addPlacesToDisplayOnMap(placesArray))
  };
};

export default connect(null, mapDispatchToProps)(EventsList);

