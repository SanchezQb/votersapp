import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, AsyncStorage, Dimensions, BackHandler, KeyboardAvoidingView, ToastAndroid } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Button from 'react-native-button'

export default class Verify extends Component{
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
     
    
    render(){

        return(
            <ImageBackground source={require('../img/bg-32.png')} style={styles.bgImg} >
                <KeyboardAvoidingView style={styles.container}>
                    <Image source={require('../img/icons-24.png')} style={styles.logo}/>
                    <View style={styles.cont}>
                        <Text style={styles.msg}>You can reach us at 
                        </Text>
                        <Text style={styles.msg2}>info@atikuvotersapp.org
                        </Text>
                    </View> 
                    <View>
                        <Button onPress={() => Actions.pop()} containerStyle={styles.butCont}
                            style={styles.button}>Go Back</Button>                 
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
      msg2: {
        marginTop: '2%',
        fontSize:  (( Dimensions.get('window').height) * 0.023),
        marginBottom: '2%',
        textAlign: 'center'
      }
})
