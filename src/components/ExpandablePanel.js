import React,{Component} from "react";
import {StyleSheet,Text,View,TouchableHighlight} from 'react-native';
import Icon from "react-native-vector-icons";


//example taken from https://moduscreate.com/blog/expanding-and-collapsing-elements-using-animations-in-react-native/
class ExpandablePanel extends Component{
  constructor(props){
    super(props);
    this.state = {
      title       : props.title,
      expanded    : true
    };
  }

  toggle(){

  }


  render(){
    let icon = <Icon size={20} name="map" />;

    if(this.state.expanded){
      icon = <Icon size={20} name="map"/>;
    }

    //Step 5
    return (
      <View style={styles.container} >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{this.state.title}</Text>
          <TouchableHighlight
            style={styles.button}
            onPress={this.toggle.bind(this)}
            underlayColor="#f1f1f1">
            <Text>Oh</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.body}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container   : {
    backgroundColor: '#fff',
    margin:10,
    overflow:'hidden'
  },
  titleContainer : {
    flexDirection: 'row'
  },
  title       : {
    flex    : 1,
    padding : 10,
    color   :'#2a2f43',
    fontWeight:'bold'
  },
  button      : {

  },
  buttonImage : {
    width   : 30,
    height  : 25
  },
  body        : {
    padding     : 10,
    paddingTop  : 0
  }
});

export default ExpandablePanel;