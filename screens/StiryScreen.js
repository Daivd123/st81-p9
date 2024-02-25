import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    Image,
    ScrollView,
    Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import{TouchableOpacity} from 'react-native-gesture-handler';
import * as Speech from 'expo-speech';

import {getAuth} from 'firebase/auth';
import {ref,onValue} from 'firebase/database';
import db from '../config';

import * as Font from 'expo-font';

import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

let customFonts = {
    'BubblegumSans': require ('../assets/fonts/BubblegumSans-REgule.ttf'),
};

export default class StoryScreen extends Component {
    constructor(props) {
        super(props);
        this.state ={
            fontsLoaded: false,
            speakerCOlor: 'gray',
            speakerIcon: 'volume-high-outline',
            light_theme: false,
        };
    }

    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true});
    }

    componentDidMount() {
        this._loadFontsAsync();
        this.fetchUser();
    }


    likeAction = () => {
        if(this.state.is_liked) {
            const dbRef = ref(db, `posts/${this.props.route.param.story.key}`);
            update(dbRef, {
                likes: increment(-1),
            });
        } else {
            const dbRef = ref(db, `posts/${this.props.params.story.key}/`);
            update(dbRef, {
                likes: increment(1),
            });

            this.setState({likes: (this.state.likes +=1), is_liked: true});
        }
    };
    async fetchUser() {
        let theme;
        const auth =getAuth();
        const userId = auth.currentUser.uid;

        onValue(ref(db, '/users/' + userId), (snapshot) => {
            theme = snapshot.val().current_theme;
            this.setState({
                light_theme: theme === 'light' ? true : false,
            });
        });
    }

    async initiateTTS(title,story,moral) {
        console.log(title);
        const current_color = this.state.speakerColor;
        this.setState({
            speakerColor: current_color === 'gray' ? '#ee8259' : 'gray',
        });
        if (current_color === 'gray') {
            Speech.speak(title);
            Speech.speak(story);
            Speech.speak('The moral of the story is!');
            Speech.speak(moral);
        } else {
            Speech.stop();
        }
    }


}