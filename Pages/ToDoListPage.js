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
  SafeAreaView,
} from "react-native";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

const LIST_STORAGE_KEY = "to_do_list_key";

let deviceWidth = Dimensions.get("window").width;
// let deviceHeight = Math.round((Dimensions.width * 9) / 16);
let deviceHeight = Dimensions.get("window").height;

export default class App extends Component {
  state = {
    input: "",

    completedFolderButtonImageClosed:
      "https://www.symbols.com/gi.php?type=1&id=1596&i=1",

    completedFolderButtonImageOpen:
      "https://th.bing.com/th/id/R29edb5fa6f0c4af9363517654a9803a7?rik=UemEtjSc4RupKA&pid=ImgRaw",

    currentFolder: -1,

    title: "Folders",

    list: [
      {
        key: 1,
        title: "Vegetables",
        list: [
          {
            key: 1,
            title: "Tomatoes",
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
        completedList: [],
        completedFolderOpen: false,
      },
      {
        key: 2,
        title: "Fruits",
        list: [
          {
            key: 1,
            title: "Apple",
          },
          {
            key: 2,
            title: "Orange",
          },
          {
            key: 3,
            title: "Banana",
          },
        ],
        completedList: [],
        completedFolderOpen: false,
      },
    ],

    newFolderVisible: false,
  };

  addNewFolder = () => {
    if (this.state.input !== "")
      this.state.list.push({
        key: this.state.list.length + 1,
        title: this.state.input,
        opened: false,
        list: [],
        completedList: [],
        completedFolderOpen: false,
      });
    this.setState({
      list: this.state.list,
      input: "",
    });
    console.log(this.state.list);
    this.change();
    console.log(this.state.list);
  };

  addNewListItem = () => {
    if (this.state.input !== "")
      this.state.list[this.state.currentFolder].list.push({
        key:
          this.state.list[this.state.currentFolder].list.length +
          this.state.list[this.state.currentFolder].completedList.length +
          1,
        title: this.state.input,
      });
    this.setState({
      list: this.state.list,
      input: "",
    });
    console.log(this.state.list);
    this.change();
    console.log(this.state.list);
  };

  changeListItem = (title, i) => {
    console.log("function: (received) i", i);
    this.tempList = this.state.list;
    this.tempList[this.state.currentFolder].list[i].title = title;
    this.setState({
      list: this.tempList,
    });
    this.change();
  };

  changeCompletedListItem = (title, i) => {
    console.log("function: (received) i", i);
    this.tempList = this.state.list;
    this.tempList[this.state.currentFolder].completedList[i].title = title;
    this.setState({
      list: this.tempList,
    });
    this.change();
  };

  removeListItem = (i) => {
    this.tempList = this.state.list;
    this.tempList[this.state.currentFolder].list.splice(i, 1);
    this.setState({
      list: this.tempList,
    });
    alert("The item has been removed");
    this.change();
  };

  removeCompletedListItem = (i) => {
    this.tempList = this.state.list;
    this.tempList[this.state.currentFolder].completedList.splice(i, 1);
    this.setState({
      list: this.tempList,
    });
    alert("The item has been removed");
    this.change();
  };

  changeFolder = (title, i) => {
    this.tempList = this.state.list;
    this.tempList[i].title = title;
    this.setState({
      list: this.tempList,
    });
    this.change();
  };

  removeFolder = (i) => {
    this.tempList = this.state.list;
    this.tempList.splice(i, 1);
    this.setState({
      list: this.tempList,
    });
    alert("The folder has been removed");
    this.change();
  };

  openCompletedFolder = () => {
    // this.removeEverything();
    this.tempList = this.state.list;
    if (
      this.state.list[this.state.currentFolder].completedFolderOpen === false
    ) {
      this.tempList[this.state.currentFolder].completedFolderOpen = true;
    } else {
      this.tempList[this.state.currentFolder].completedFolderOpen = false;
    }
    this.setState({
      list: this.tempList,
    });
    this.change();
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
  };

  change = async () => {
    this.save(this.state.list, LIST_STORAGE_KEY);
    this.retrieveData();
  };

  componentDidMount() {
    this.retrieveData();
    console.log("Retrieved data");
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <LinearGradient
            // Background Linear Gradient
            // colors={['rgba(0,0,0)', 'transparent']}
            colors={["#57A5F2", "#FFFF"]}
            // start={[.9],[.9]}
            style={styles.background}
          />

          <View style={styles.header}>
            {this.state.currentFolder >= 0 && (
              <View style={styles.backButtonContainer}>
                <TouchableHighlight
                  onPress={() => {
                    this.setState({
                      currentFolder: -1,
                    });
                  }}
                >
                  <Image
                    source={{
                      uri: "https://image.flaticon.com/icons/png/512/93/93634.png",
                    }}
                    style={styles.backButton}
                  />
                </TouchableHighlight>
              </View>
            )}

            <View style={styles.folderNameContainer}>
              <Text style={styles.folderName}>
                {this.state.currentFolder < 0
                  ? this.state.title
                  : this.state.list[this.state.currentFolder].title}
              </Text>
            </View>

            {this.state.currentFolder >= 0 && (
              <View style={styles.rightHeaderContainer}></View>
            )}
          </View>

          <ScrollView>
            <View>
              {this.state.currentFolder < 0 &&
                this.state.list.map((folder, i) => (
                  <View key={folder.key} style={styles.listContainer}>
                    <TouchableHighlight
                      onPress={() => {
                        console.log("this one: ", i);
                        this.props.navigation.navigate("EditFolderPage", {
                          title: this.state.list[i].title,
                          changeFolder: this.changeFolder,
                          removeFolder: this.removeFolder,
                          currentFolder: i,
                        });
                      }}
                    >
                      <Text style={styles.listItem}>{folder.title}</Text>
                    </TouchableHighlight>

                    <View style={styles.completedButtonContainer}>
                      <TouchableHighlight
                        style={styles.completedButton}
                        onPress={() => {
                          this.setState({
                            currentFolder: i,
                          });
                        }}
                      >
                        <Image
                          source={{
                            uri: "https://www.symbols.com/gi.php?type=1&id=1596&i=1",
                          }}
                          style={styles.completedButtonImage}
                        />
                      </TouchableHighlight>
                    </View>
                  </View>
                ))}
            </View>

            <View>
              {this.state.currentFolder >= 0 &&
                this.state.list[this.state.currentFolder].list.map(
                  (listItem, i) => (
                    <View key={listItem.key} style={styles.listContainer}>
                      <TouchableHighlight
                        onPress={() => {
                          //set state.currentListItem = i

                          this.props.navigation.navigate("EditListItemPage", {
                            title:
                              this.state.list[this.state.currentFolder].list[i]
                                .title,
                            changeListItem: this.changeListItem,
                            removeListItem: this.removeListItem,
                            currentListItem: i,
                          });
                        }}
                      >
                        <Text style={styles.listItem}>{listItem.title}</Text>
                      </TouchableHighlight>

                      <View style={styles.completedButtonContainer}>
                        <TouchableHighlight
                          style={styles.completedButton}
                          onPress={() => {
                            // alert('Note marked as completed!')
                            this.tempList = this.state.list;
                            this.tempCompletedList = this.state.list;
                            this.tempCompletedList[
                              this.state.currentFolder
                            ].completedList.push(
                              this.tempList[this.state.currentFolder].list[i]
                            );
                            this.tempList[this.state.currentFolder].list.splice(
                              i,
                              1
                            );
                            this.setState({
                              list: this.tempList,
                              completedList: this.tempCompletedList,
                            });
                            this.change();
                            console.log(this.state.list);
                          }}
                        >
                          <Image
                            source={{
                              uri: "https://cdn1.iconfinder.com/data/icons/navigation-elements/512/round-empty-circle-function-512.png",
                            }}
                            style={styles.completedButtonImage}
                          />
                        </TouchableHighlight>
                      </View>
                    </View>
                  )
                )}
            </View>

            <View style={styles.newListItemContainer}>
              <TextInput
                style={styles.newItemText}
                onChangeText={(input) => this.setState({ input })}
                onSubmitEditing={
                  this.state.currentFolder < 0
                    ? this.addNewFolder
                    : this.addNewListItem
                }
                value={this.state.input}
                placeholder="New Item..."
                // defaultValue={"this.state.newListInput"}
                // style={{ width: 200, height: 44, padding: 8, }}
              />

              <View style={styles.newButtonContainer}>
                <TouchableHighlight
                  style={styles.newButton}
                  onPress={
                    this.state.currentFolder < 0
                      ? this.addNewFolder
                      : this.addNewListItem
                  }
                >
                  <Image
                    source={{
                      uri: "https://th.bing.com/th/id/Rc3d6631626f6b219c6ffc7a81f54132e?rik=Jzg%2fmuOs%2f7iQ5g&riu=http%3a%2f%2fpluspng.com%2fimg-png%2ffree-png-plus-sign-plus-icon-512.png&ehk=Xy%2bFx9FzIHMQ%2bGUZ%2fIiGqZmmMakdwjcJ9SeV%2ft3pfXY%3d&risl=&pid=ImgRaw",
                    }}
                    style={styles.newButtonImage}
                  />
                </TouchableHighlight>
              </View>
            </View>

            {this.state.currentFolder >= 0 && (
              <View style={styles.completedFolderContainer}>
                <Text style={styles.listItem}>Completed Folder</Text>
                <TouchableHighlight
                  style={styles.completedFolderButton}
                  onPress={this.openCompletedFolder}
                >
                  <Image
                    source={{
                      uri: this.state.list[this.state.currentFolder]
                        .completedFolderOpen
                        ? this.state.completedFolderButtonImageOpen
                        : this.state.completedFolderButtonImageClosed,
                    }}
                    style={styles.completedFolderButton}
                  />
                </TouchableHighlight>
              </View>
            )}
            {this.state.currentFolder >= 0 &&
              this.state.list[this.state.currentFolder].completedFolderOpen && (
                <View>
                  {this.state.list[this.state.currentFolder].completedList.map(
                    (listItem, i) => (
                      <View
                        key={listItem.key}
                        style={styles.completedListContainer}
                      >
                        <TouchableHighlight
                          onPress={() => {
                            //set state.currentListItem = i

                            this.props.navigation.navigate("EditListItemPage", {
                              title:
                                this.state.list[this.state.currentFolder]
                                  .completedList[i].title,
                              changeListItem: this.changeCompletedListItem,
                              removeListItem: this.removeCompletedListItem,
                              currentListItem: i,
                            });
                          }}
                        >
                          <Text style={styles.listItem}>{listItem.title}</Text>
                        </TouchableHighlight>
                        <View style={styles.completedButtonContainer}>
                          <TouchableHighlight
                            style={styles.completedButton}
                            onPress={() => {
                              // alert('Removed from completed list!')
                              this.tempList = this.state.list;
                              this.tempCompletedList = this.state.list;
                              this.tempList[this.state.currentFolder].list.push(
                                this.tempCompletedList[this.state.currentFolder]
                                  .completedList[i]
                              );
                              this.tempCompletedList[
                                this.state.currentFolder
                              ].completedList.splice(i, 1);
                              this.setState({
                                list: this.tempList,
                                completedList: this.tempCompletedList,
                              });
                              this.change();
                              console.log(this.state.list);
                            }}
                          >
                            <Image
                              source={{
                                uri: "https://cdn1.iconfinder.com/data/icons/navigation-elements/512/round-empty-circle-function-512.png",
                              }}
                              style={styles.completedButtonImage}
                            />
                          </TouchableHighlight>
                        </View>
                      </View>
                    )
                  )}
                </View>
              )}
          </ScrollView>
        </View>
      </SafeAreaView>
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
    width: deviceHeight / 8,
    height: deviceHeight / 10,
    margin: 10,
  },
  backButton: {
    width: deviceHeight / 8,
    height: deviceHeight / 10,
    margin: 10,
  },
  backButtonContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  folderNameContainer: {
    flex: 2,
    justifyContent: "center",
  },
  rightHeaderContainer: {
    flex: 1,
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
