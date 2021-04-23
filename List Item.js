import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  TextInput,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import Constants from 'expo-constants';

let deviceWidth = Dimensions.get('window').width;
// let deviceHeight = Math.round((Dimensions.width * 9) / 16);
let deviceHeight = Dimensions.get('window').height;

export default class ListItem extends Component {

  render() {


    return (

      <View>
      </View>
      

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    background: 'lightblue',
  },
  folderName: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    margin: 20,
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
  },
  listItem: {
    padding: 5,
    fontSize: deviceHeight/25,
    flex: 2,
    alignSelf: 'flex-start',
  },
  completedButtonImage: {
    height: deviceHeight/22,
    width: deviceWidth/12,
    flex: 1,
    marginRight: 15,
    alignSelf: 'flex-end',
    // paddingRight: 20,
  },
  newListItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
  },
  newItemText: {
    padding: 5,
    fontSize: deviceHeight/25,
    width: (deviceHeight/3)*1,
    // flex: 2,
  },
  newButtonImage: {
    height: deviceHeight/22,
    width: deviceWidth/12,
    // flex: 1,
    marginRight: 15,
    alignSelf: 'flex-end',
  },
  completedFolderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: 'black',
    marginTop: 30,
    alignItems: 'center',
  },
  completedFolderButton: {
    height: deviceHeight/15,
    width: deviceWidth/12,
    marginRight: 7,
    alignSelf: 'flex-end',  
    },
});
