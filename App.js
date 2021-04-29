import React, { Component } from "react";
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
} from "react-native";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { SwipeListView } from "react-native-swipe-list-view";
import ListItem from './List Item';

//Add swipe list view react native swipeable https://www.npmjs.com/package/react-native-swipeable-row

const STORAGE_KEY = "to_do_list_key";

let deviceWidth = Dimensions.get("window").width;
// let deviceHeight = Math.round((Dimensions.width * 9) / 16);
let deviceHeight = Dimensions.get("window").height;

export default class App extends Component {
  state = {
    newListInput: "",

    list: [
      {
        key: 1,
        title: "Chicken",
      },
      {
        key: 2,
        title: "Green Beans",
      },
      {
        key: 3,
        title: "Carrots",
      },
    ],

    completedFolderButtonImage:
      "https://www.symbols.com/gi.php?type=1&id=1596&i=1",
    completedFolderOpen: false,
  };

  addNewListItem = () => {
    if (this.state.newListInput !== "")
      this.state.list.push({
        key: this.state.list.length + 1,
        title: this.state.newListInput,
      });
    this.setState({
      list: this.state.list,
      newListInput: "",
    });
    this.change();
  };

  noteCompleted = () => {
    alert("Noted marked as completed");
  };

  openCompletedFolder = () => {
    this.removeEverything();
    if (this.state.completedFolderOpen === false) {
      this.setState({
        completedFolderButtonImage:
          "https://th.bing.com/th/id/R29edb5fa6f0c4af9363517654a9803a7?rik=UemEtjSc4RupKA&pid=ImgRaw",
        completedFolderOpen: true,
      });
    } else {
      this.setState({
        completedFolderButtonImage:
          "https://www.symbols.com/gi.php?type=1&id=1596&i=1",
        completedFolderOpen: false,
      });
    }
  };

  save = async (items) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      console.log("Data saved");
    } catch (e) {
      alert("Failed to save data");
    }
  };

  removeEverything = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      alert("Failed to clear data");
    }
  };

  retrieveData = async () => {
    try {
      const listItems = await AsyncStorage.getItem(STORAGE_KEY);
      if (listItems !== null) {
        const parsedListItems = JSON.parse(listItems);

        this.setState({
          list: parsedListItems,
        });

        console.log("Retrieved data");
      }
    } catch (e) {
      alert("Unable to retrieve data");
    }
  };

  change = async () => {
    this.save(this.state.list);
    this.retrieveData();
  };

  componentDidMount() {
    this.retrieveData();
    console.log("Retrieved data");
  }

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          // Background Linear Gradient
          // colors={['rgba(0,0,0)', 'transparent']}
          colors={["#57A5F2", "#FFFF"]}
          // start={[.9],[.9]}
          style={styles.background}
        />

        <View>
          <Text style={styles.folderName}>Grocery List</Text>
        </View>

        <ScrollView>
   
            <ListItem list={this.state.list} noteCompleted = {this.noteCompleted}/>
        

          <View style={styles.newListItemContainer}>
            <TextInput
              style={styles.newItemText}
              onChangeText={(newListInput) => this.setState({ newListInput })}
              onSubmitEditing={this.addNewListItem}
              value={this.state.newListInput}
              placeholder="New Item..."
              // defaultValue={this.state.newListInput}
              // style={{ width: 200, height: 44, padding: 8, }}
            />

            <View style={styles.newButtonContainer}>
              <TouchableHighlight
                style={styles.newButton}
                onPress={this.addNewListItem}
              >
                <Image
                  source={{
                    uri:
                      "https://th.bing.com/th/id/Rc3d6631626f6b219c6ffc7a81f54132e?rik=Jzg%2fmuOs%2f7iQ5g&riu=http%3a%2f%2fpluspng.com%2fimg-png%2ffree-png-plus-sign-plus-icon-512.png&ehk=Xy%2bFx9FzIHMQ%2bGUZ%2fIiGqZmmMakdwjcJ9SeV%2ft3pfXY%3d&risl=&pid=ImgRaw",
                  }}
                  style={styles.newButtonImage}
                />
              </TouchableHighlight>
            </View>
          </View>

          <View style={styles.completedFolderContainer}>
            <Text style={styles.listItem}>Completed Folder</Text>
            <TouchableHighlight
              style={styles.completedFolderButton}
              onPress={this.openCompletedFolder}
            >
              <Image
                source={{ uri: this.state.completedFolderButtonImage }}
                style={styles.completedFolderButton}
              />
            </TouchableHighlight>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // background: 'lightblue',
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: deviceHeight,
  },
  folderName: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    margin: 20,
  },
  listContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 2,
    borderColor: "black",
    alignItems: "center",
  },
  listItem: {
    padding: 5,
    fontSize: deviceHeight / 25,
    flex: 2,
    alignSelf: "flex-start",
  },
  completedButtonImage: {
    height: deviceHeight / 22,
    width: deviceWidth / 12,
    flex: 1,
    marginRight: 15,
    alignSelf: "flex-end",
    // paddingRight: 20,
  },
  newListItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: "black",
    alignItems: "center",
  },
  newItemText: {
    padding: 5,
    fontSize: deviceHeight / 25,
    width: (deviceHeight / 3) * 2,
    // flex: 2,
  },
  newButtonImage: {
    height: deviceHeight / 22,
    width: deviceWidth / 12,
    flex: 1,
    marginRight: 15,
    alignSelf: "flex-end",
  },
  completedFolderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: "black",
    marginTop: 30,
    alignItems: "center",
  },
  completedFolderButton: {
    height: deviceHeight / 15,
    width: deviceWidth / 12,
    marginRight: 7,
    alignSelf: "flex-end",
  },
});
