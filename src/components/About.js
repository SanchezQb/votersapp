import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, AsyncStorage, Dimensions, BackHandler, KeyboardAvoidingView, ToastAndroid, Linking } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Button from 'react-native-button'
import { Icon } from 'native-base'

export default class About extends Component{
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        }
      componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
      }

       onBackPress () {
        if (Actions.state.index === 0) {
          return false;
        }

        Actions.pop();
        return true;
      }
      openTwitter() {
        Linking.openURL('https://twitter.com/appatiku').catch(err => console.error('An error occurred', err));
      }
      openInstagram() {
        Linking.openURL('https://instagram.com/appatiku').catch(err => console.error('An error occurred', err));
      }
      openFacebook() {
        Linking.openURL('https://www.facebook.com/atikus.votersapp.1').catch(err => console.error('An error occurred', err));
      }
      openLinkedin() {
        Linking.openURL('https://www.linkedin.com/company/app-atiku/').catch(err => console.error('An error occurred', err));
      }
     
    
    render(){

        return(
            <ImageBackground source={require('../img/bg-32.png')} style={styles.bgImg} >
                <KeyboardAvoidingView style={styles.container}>
                    <Image source={require('../img/icons-24.png')} style={styles.logo}/>
                    <View style={styles.cont}>
                        <Text style={styles.msg}>The Atiku's Voters App is a mobile application
                        designed solely for the purpose of aggregating registered voters for Atiku Abubakar
                        </Text>
                    </View> 
                    <View>
                        <Button onPress={() => Actions.pop()} containerStyle={styles.butCont}
                            style={styles.button}>Go Back</Button>                 
                    </View>
                    <View style={styles.social}>
                        <Button onPress={() => this.openTwitter()}>
                            <Icon name="logo-twitter" style={{color: '#e2e2e2', padding: '3%',fontSize: (( Dimensions.get('window').height) * 0.04)}} />
                        </Button>
                        <Button onPress={() => this.openInstagram()}>
                            <Icon name="logo-instagram" style={{color: '#e2e2e2', padding: '3%', fontSize: (( Dimensions.get('window').height) * 0.04)}} />
                        </Button>
                        <Button onPress={() => this.openFacebook()}>
                            <Icon name="logo-facebook" style={{color: '#e2e2e2', padding: '3%', fontSize: (( Dimensions.get('window').height) * 0.04)}} />
                        </Button>
                        <Button onPress={() => this.openLinkedin()}>
                            <Icon name="logo-linkedin" style={{color: '#e2e2e2', padding: '3%', fontSize: (( Dimensions.get('window').height) * 0.04)}} />
                        </Button>           
                    </View>
                </KeyboardAvoidingView>
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    open: {
        width:  (( Dimensions.get('window').height) * 0.025),
        height:  (( Dimensions.get('window').height) * 0.025),
        marginTop: '9%',
        marginLeft: '4%'

    },
    bgImg: {
        flex: 1,
        alignSelf: 'stretch',
        width: null,
        justifyContent: 'center',
    },
    logo: {
        width:  (( Dimensions.get('window').height) * 0.23),
        height:  (( Dimensions.get('window').height) * 0.23),
        marginLeft: '31%',
        marginTop: '8%'
    },
      dob: {
          marginTop: '3%',
          width: '80%',
          alignSelf: 'center'
      },
      signup: {
          fontSize:  (( Dimensions.get('window').height) * 0.025),
          color: '#fff',
      },
      instruction: {
        marginTop: '5%',
        textAlign: 'center',
        fontSize:  (( Dimensions.get('window').height) * 0.023),
        color: '#fff'
    },
    code: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '4%'
    },
    button: {
        marginTop: '15%',
        backgroundColor: '#5cb85c',
        color: '#fff',
        padding: '6%',
        alignSelf: 'center'

      },
      butCont: {
        borderRadius: 5,
        width: '50%',
        alignSelf: 'center'
      },
      buttonContainer: {
          marginTop: '8%'
      },
      msg: {
        marginTop: '8%',
        fontSize:  (( Dimensions.get('window').height) * 0.023),
        marginBottom: '2%',
        textAlign: 'center'
      },
      social: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignSelf: 'center',
          marginTop: '6%',

      }
})
