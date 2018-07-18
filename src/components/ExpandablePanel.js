import React,{Component} from "react";
import {StyleSheet, Text, View, TouchableHighlight, Animated, Image} from 'react-native';
import Icon from "react-native-vector-icons";


//example taken from https://moduscreate.com/blog/expanding-and-collapsing-elements-using-animations-in-react-native/
class ExpandablePanel extends Component{
  constructor(props){
    super(props);
    this.icons = {
      'up'    : require('../assets/Arrowhead-01-128.png'),
      'down'  : require('../assets/Arrowhead-Down-01-128.png')
    };

    this.state = {
      title       : props.title,
      expanded    : false
    };
  }

  toggle = () => {
    let initialValue    = this.state.expanded? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
      finalValue      = this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

    this.setState({
      expanded : !this.state.expanded
    });

    this.state.animation.setValue(initialValue);
    Animated.spring(
      this.state.animation,
      {
        toValue: finalValue
      }
    ).start();
  };

  setMaxHeight=(event)=>{
    this.setState({
      maxHeight   : event.nativeEvent.layout.height
    });
  };

  setMinHeight =(event) =>{
    this.setState({
      minHeight   : event.nativeEvent.layout.height,
      animation: new Animated.Value(event.nativeEvent.layout.height)
    });
  };

  render(){
    // let icon = <Icon size={20} name="map" />;
    //
    // if(this.state.expanded){
    //   icon = <Icon size={20} name="map"/>;
    // }

    let icon = (this.state.expanded)?  this.icons['up'] :this.icons['down'];


    //Step 5
    return (
      <Animated.View
        style={[styles.container,{height: this.state.animation}]}>
        <View style={styles.titleContainer} onLayout={this.setMinHeight}>
          <Text style={styles.title}>{this.state.title}</Text>
          <TouchableHighlight
            style={styles.button}
            onPress={this.toggle.bind(this)}
            underlayColor="#f1f1f1"
          >
            <Image
              style={styles.buttonImage}
              source={icon}
            />
          </TouchableHighlight>
        </View>

        <View style={styles.body} onLayout={this.setMaxHeight.bind(this)}>
          {this.props.children}
        </View>

      </Animated.View>
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