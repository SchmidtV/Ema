import React, {Component} from "react";
import {AsyncStorage, FlatList, StyleSheet, Text, View} from "react-native";
import {removeToken, removeUsername} from "../../store/actions";
import {connect} from "react-redux";
import EventDescriptionSmall from "../../components/EventDescriptionSmall";

class FavoritesTab extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    this.state = {
      token: null
    }

  }

  componentWillMount() {
    let keys = ["token", "username"];
    AsyncStorage.multiGet(keys, (err, stores) => {
      let token = "";
      if (!(stores[0][1] && stores[1][1])) {
        AsyncStorage.multiRemove(keys, (err) => {

        });
      } else {
        if (stores[0][0] === "token") {
          token = stores[0][1];
        } else {
          token = stores[1][1];
        }
      }
      this.setState({token: token}, () => {this.onFavoritesRequest()});
    });
  }

  onNavigatorEvent = event => {
    // console.log(event.type + " : " + event.id);
    // if (event.type === "NavBarButtonPress") {
    //   if (event.id === "sideDrawerToggle") {
    //     this.props.navigator.toggleDrawer({
    //       side: "left"
    //     })
    //   }
    // }
    if (event.id === 'bottomTabSelected') {
      this.onFavoritesRequest();
    }
  };


  onFavoritesRequest = () => {
    if (!this.state.token) {
      console.log("No token");
      return;
    }
    let url = this.props.baseUrl + "auth/get_saved_events.php?token=" + this.state.token;
    // console.log("Fetching favorites: " + url);
    fetch(url, this)
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        // console.log(myJson);
        if(myJson.total === 0){
          return (null);
        }else{
          this.setState({
            events: myJson.events
          });
        }

      });

  };

  itemSelectHandler = (event) => {
    this.props.navigator.push({
      screen: "Ema.PlaceDetailScreen",
      title: event.event_title,
      passProps: {
        selectedPlace: event
      }
    });
  };

  renderEvents = () => {
    if (this.state.events) {
      return (
        <View>
          <Text>
            You have {this.state.events.length} saved events
          </Text>
        <FlatList
          style={styles.listContainer}
          data={this.state.events}
          extraData={this.state}
          keyExtractor={(item) => item.t_event_id}
          renderItem={({item}) => (
            <EventDescriptionSmall
              eventInfo={item}
              onItemPressed={() => this.itemSelectHandler(item)}
            />

          )}
        />
        </View>
      );
    }else{
      return (
        <View>
          <Text>
            You have no saved events
          </Text>
        </View>
      );
    }
  };

  render() {
    return (
      <View>

        {this.renderEvents()}
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
    token: state.places.token,
    username: state.places.username
  };
};

export default connect(mapStateToProps)(FavoritesTab);
