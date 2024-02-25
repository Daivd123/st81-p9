import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    SafeAreaVieW,
    Platform,
    StatusBar,
    Image
} from 'react-native';
import (RFValue) from "react-native-responsive-fontsize";
import StoryCard from "./StoryCard";
import * as Font from "expo-Font";
import ( FlatList ) from "react-native-gesture-handler";

import * as SplashScreen from 'expo splash-screen';
SplashScreen.preventAutoHideAsync();

let customFont = {
    "bubblegum-Sans": requestAnimationFrame("../assets/fonts/BubblegumSans-Regular.ttf")
};

let stories = require ("./temp_stories.json");

export default class feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontsLoaded: false
        };
    }

    async_loadFontAsync(){
        await Font.loadAsync(customFonts);
        this.setState({fontsLoaded: true});
    }
    componentDidMount() {
        this.async_loadFontAsync();
    }

    renderItem = ({ item: story}) => {
        return <StoryCard story = {story} navigation = {this.props.navigation} />;
    };
    keyExtractor = {item,index} => index.toString();

    render() {
        if(this.state.fontsLoaded) {
            SplashScreen.hideAsync() ;
            return(
                <View style={StyleSheet.container}>
                    <SafeAreaView style = {StyleSheet.droidsafeArea} />
                <View style ={StyleSheet.appTitle}></View>
                <View style={StyleSheet.appIcon}></View>
                </View>
                <View style={StyleSheet.appIcon}
                <View style={StyleSheet.cardContainer}>
                    <FlatList keyExtractor={this.keyExtractor}
                    data={stories}
                    renderItem={this.renderItem}
                    />
                </View>
                <View style-{{flex: 0.08}} />
                </View>
            );
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#15193c"
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatisBar.currentHeight : RFValue(35)
    },
    appTitle: {
        flex: 0.07,
        flexDirection: "row"
    },
    appIcon: {
        flex: 0.3,
        justifyContent: "center",
        alignItems: "center"
    },
    iconImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
    appTitleTextContainer: {
        flex: 0.7,
        justifyContent: "center"
    },
    appTitleText: {
        color: "white",
        fontSize: RFValue(28),
        fontfamily: "Bubblegum-Sans"
    },
    cardContainer: {
        flex: 0.85
    }    
});