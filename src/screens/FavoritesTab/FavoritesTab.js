import React, {Component} from "react";
import {AsyncStorage, Text, View} from "react-native";
import {removeToken, removeUsername} from "../../store/actions";
import {connect} from "react-redux";

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
    if (event.type === "NavBarButtonPress") {
      if (event.id === "sideDrawerToggle") {
        this.props.navigator.toggleDrawer({
          side: "left"
        })
      }
    }
  };


  onFavoritesRequest = () => {
    if (!this.state.token) {
      console.log("No token");
      return;
    }
    let url = this.props.baseUrl + "auth/get_saved_events.php?token=" + this.state.token;
    console.log("Fetching favorites: " + url);
    fetch(url, this)
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        console.log(myJson);
        if(myJson.total === 0){
          return (null);
        }else{
          //TODO RENDER FAVORITES
        }

      });

  };


  render() {
    return (
      <View>
        <Text>
          Home
        </Text>
      </View>
    );
  };
}

const mapStateToProps = state => {
  return {
    baseUrl: state.places.baseUrl,
    token: state.places.token,
    username: state.places.username
  };
};

export default connect(mapStateToProps)(FavoritesTab);
