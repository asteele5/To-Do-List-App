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

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

export default class App extends Component {
  state = {
    input: this.props.route.params.title,
  };

  render() {
    // const text = this.props.navigation.getParam("title", "nothing sent");
    const { navigate } = this.props.navigation;
    const { goBack } = this.props.navigation;
    const title = this.props.route.params.title;
    const changeListItem = this.props.route.params.changeListItem;
    const currentListItem = this.props.route.params.currentListItem;
    const removeListItem = this.props.route.params.removeListItem;
    console.log("currentlistitem", currentListItem);
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
            <View style={styles.folderNameContainer}>
              <Text style={styles.folderName}>Edit Note</Text>
            </View>
          </View>

          <View style={styles.newListItemContainer}>
            <TextInput
              style={styles.newItemText}
              onChangeText={(input) => this.setState({ input })}
              onSubmitEditing={changeListItem(
                this.state.input,
                currentListItem
              )}
              value={this.state.input}
              //   placeholder={this.props.navigation.text}
              defaultValue={title}
              // style={{ width: 200, height: 44, padding: 8, }}
            />

            <View style={styles.newButtonContainer}>
              <TouchableHighlight
                style={styles.newButton}
                onPress={() => goBack()}
              >
                <Image
                  source={{
                    uri: "https://i.pinimg.com/originals/fa/fd/13/fafd13d05257895e61d1ae42c020db83.png",
                  }}
                  style={styles.newButtonImage}
                />
              </TouchableHighlight>
            </View>
          </View>

          <View style={styles.buttonRowContainer}>
            <TouchableHighlight
              style={styles.deleteButton}
              onPress={() => {
                removeListItem(currentListItem);
                goBack();
              }}
            >
              <View style={styles.deleteButtonContainer}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </View>
            </TouchableHighlight>
          </View>
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
    borderBottomWidth: 2,
    borderColor: "black",
  },
  buttonRowContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "red",
    width: deviceWidth / 3,
    textAlign: "center",
    paddingBottom: 10,
    paddingTop: 10,
    marginTop: 30,
    borderRadius: 15,
  },
  deleteButton: {},
  deleteButtonText: {
    fontSize: 30,
    fontWeight: "bold",
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
    flex: 1,
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
    height: deviceHeight / 20,
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
