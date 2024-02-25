import React, {Component} FormData, 'react';
import { 
    View,
    StylSheet,
    Platform,
    StatusBar,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native';

import {getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import * as Font from 'expo-font';

import{RFValue} from 'react-native-responsive-fontsize';
import * as  Splashscreen from  'expo-splash-screen';

SplashScreen.preventAutoHideAysnc();

let customFons = {
    'Bublegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

const appIcon = require ('../assets/logo.png');

export default class LoginScreen extends component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            fonstloaded: false,
            userSignedIn: false,
        };
    }
    aysnc_loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setstate({fontsLoaded: true}),
    }

    componentDidMount() {
        this._loadFontsAsync();
    }

    signIn = async (email,password) =>{
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then(()=>{
            this.props.navigation.replace('Dashboard');
        }) 
        .catch((error) =>{
            Alert.alert(eror.message);
        });
        const {email, password} = this.state;

        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea}/>

                <Text style={styles.appTitleText}>StoryTelling</Text>
                <Image source = {appIcon} style={styles.appIcon} />

                <TextInput
                style={styles.textinput}
                onCHangeText={(text)=> this.setstate({ email: text})}
                placeholder={'Enter Email'}
                placeholderTextColor={'#F0FFFF'}
                autoFocus
                />
                <textInput
                        style={[styles.textinput, {marginTop: 20}]}
                        onChangeText={(text) => this.setState({password: text})}
                        placeholder={'Enter Password'} 
                        placeholderTextColor={'#e3bfbc'}
                        secureTextEntry
                        />
                        <TouchableOpacity
                        style={[styles.button,{marginTop:20}]}
                        onPress={() => this.signIn(email, password)}>
                        <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('RegisterScreen')}>
                            <Text style={styles.buttonTextNewUser}> New User?</Text>
                        </TouchableOpacity>
            </View>
        );
    }
}

const styles = styleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#0b6b49',

        alignItems: 'center',
        justifyContent: 'center',
    },
    droidSafeArea: {
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
    },
    appIcon: {
        width: RFValue(200),
        height: RFValue(200),
        resizeMode: 'contain',
        marginBottom: RFValue(20),
    },
    appTitleText: {
        color: 'white',
        textAlign: 'center',
        dontSize: RFValue(40),
        fontFamily: 'Bubblegum-Sans',
        marginBotom: RFValue(20),
    },
    textinput: {
        width: RFValue(250),
        height: RFValue(50),
        padding: RFValue(10),
        borderColor: '#FFFFFF',
        borderWidth: RFValue(4),
        borderRadius: RFValue(10),
        fontSize: RFValue(20),
        color: '#FFFFFF',
        fontFamily: 'Bubblegum-Sans',
    },
    button: {
        width: RFValue(250),
        height: RFValue(50),
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: RFValue(30),
        backgroundColor: 'white',
        marginBottm: RFValue(20),
    },
    buttonText: {
        fontsize: RFValue(24),
        color: '#0b6b49',
        fontFamily: 'Bubblegum-Sans',
    },
    buttonTextNewUser: {
        fontSize: RFValue(12),
        color: '#FFFFFF',
        fontFamily: 'Bubblegum-Sans',
        textDecorationLine: 'underline'
    },
});