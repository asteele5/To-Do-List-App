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
import Swipeable from 'react-native-gesture-handler/Swipeable';


const LIST_STORAGE_KEY = "to_do_list_key";
const COMPLETED_STORAGE_KEY = "completed_key";

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

    completedList: [],

    folderList: [

      {
        key: 1,
        title: "Vegetables",
      }

    ],

    newFolderVisible: false,


  };

  addNewListItem = () => {
    if (this.state.newListInput !== "")
      this.state.list.push({
        key: this.state.list.length + 1,
        title: this.state.newListInput,
        completed: false,
      });
    this.setState({
      list: this.state.list,
      newListInput: "",
    });
    console.log(this.state.list)
    this.change();
    console.log(this.state.list)
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

  save = async (items, key) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(items));
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
      const listItems = await AsyncStorage.getItem(LIST_STORAGE_KEY);
      
      if (listItems !== null) {
        const parsedListItems = JSON.parse(listItems);

        this.setState({
          list: parsedListItems,
        });

        console.log("Retrieved list data");
      }
    } catch (e) {
      alert("Unable to retrieve list data");
    }
  

    try {
      const completedListItems = await AsyncStorage.getItem(COMPLETED_STORAGE_KEY);
    if (completedListItems !== null) {
      const parsedCompletedListItems = JSON.parse(completedListItems);

      this.setState({
        completedList: parsedCompletedListItems,
      });

      console.log("Retrieved completed list data");
    }
  } catch (e) {
    alert("Unable to retrieve completed list data");
  }

  };

  change = async () => {
    this.save(this.state.list, LIST_STORAGE_KEY);
    this.save(this.state.completedList, COMPLETED_STORAGE_KEY);
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

        <View style={styles.header}>

          <View style={styles.backButtonContainer}>
            <Image
              source={{
                uri:
                  "https://image.flaticon.com/icons/png/512/93/93634.png",
              }}
              style={styles.backButton}
            />
          </View>

          <View style={styles.folderNameContainer}>
            <Text style={styles.folderName}>Grocery List</Text>
          </View>

          <View style={styles.newFolderButtonContainer}>
            <TouchableHighlight onPress={() => {

  
              alert('new folder created')

              
              }}>
              <Image
                source={{
                  uri:
                    "https://cdn4.iconfinder.com/data/icons/utilities-part-3/64/add_folder-512.png",
                }}
                style={styles.newFolderButton}
              />
            </TouchableHighlight>
          </View>

        </View>

        <ScrollView>

        <View>
        {this.state.folderList.map((folder, i) => (
          <View key={folder.key} style={styles.listContainer}>

            <Text style={styles.listItem}>{folder.title}</Text>
            

            <View style={styles.completedButtonContainer}>
              <TouchableHighlight
                style={styles.completedButton}
                onPress={() => {
                  alert('Entered Folder')

                  
                }}
              >
              <Image
                source={{
                  uri:
                    "https://www.symbols.com/gi.php?type=1&id=1596&i=1",
                }}
                style={styles.completedButtonImage}
              />
              </TouchableHighlight>
            </View>
          </View>
          ))}
        </View>  

        <View>
        {this.state.list.map((listItem, i) => (
          <View key={listItem.key} style={styles.listContainer}>

              <Text style={styles.listItem}>{listItem.title}</Text>
            

            <View style={styles.completedButtonContainer}>
              <TouchableHighlight
                style={styles.completedButton}
                onPress={() => {
                  // alert('Note marked as completed!')
                  

                  this.tempList = this.state.list;
                  this.tempCompletedList = this.state.completedList;
                  this.tempCompletedList.push(this.tempList[i]);
                  this.tempList.splice(i,1);
                  this.setState({
                    list: this.tempList,
                    completedList: this.tempCompletedList,
                  });
                  this.change();
                  console.log(this.state.list)
                  console.log(this.state.completedList)

                  
                }}
              >
                <Image
                  source={{
                    uri:
                      "https://cdn1.iconfinder.com/data/icons/navigation-elements/512/round-empty-circle-function-512.png",
                  }}
                  style={styles.completedButtonImage}
                />
              </TouchableHighlight>
            </View>
          </View>
        ))}
      </View>        

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


          {this.state.completedFolderOpen && 
          <View>
        {this.state.completedList.map((listItem, i) => (
          <View key={listItem.key} style={styles.completedListContainer}>

              <Text style={styles.listItem}>{listItem.title}</Text>
            

            <View style={styles.completedButtonContainer}>
              <TouchableHighlight
                style={styles.completedButton}
                onPress={() => {
                  // alert('Removed from completed list!')
                  

                  this.tempList = this.state.list;
                  this.tempCompletedList = this.state.completedList;
                  this.tempList.push(this.tempCompletedList[i]);
                  this.tempCompletedList.splice(i,1);
                  this.setState({
                    list: this.tempList,
                    completedList: this.tempCompletedList,
                  });
                  this.change();
                  console.log(this.state.list)
                  console.log(this.state.completedList)

                  
                }}
              >
                <Image
                  source={{
                    uri:
                      "https://cdn1.iconfinder.com/data/icons/navigation-elements/512/round-empty-circle-function-512.png",
                  }}
                  style={styles.completedButtonImage}
                />
              </TouchableHighlight>
            </View>
          </View>
        ))}
      </View> 
  }



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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  newFolderButton: {
    width: deviceHeight/8,
    height: deviceHeight/10,
    margin: 10,
  },
  backButton: {
    width: deviceHeight/8,
    height: deviceHeight/10,
    margin: 10,
  },
  backButtonContainer: {
    flex:1,
    justifyContent: "flex-start",
  },
  folderNameContainer: {
    flex:1,
    justifyContent: "center",
  },
  newFolderButtonContainer: {
    flex:1,
    justifyContent: "flex-end",
    flexDirection: "row"
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
  completedListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 2,
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
