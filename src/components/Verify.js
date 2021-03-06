import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, AsyncStorage, Dimensions, BackHandler, KeyboardAvoidingView, ToastAndroid } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Button from 'react-native-button'
import CodeInput from 'react-native-confirmation-code-input';
import axios from 'axios'
import 'url-search-params-polyfill';

export default class Verify extends Component {
    constructor() {
        super()
        this.state = {
            token: '',
            disabled: false 
        }
        
    }

    async store(payload){
        try {
            
            await AsyncStorage.setItem('#1THRU3#',payload).then((val)=>{
                if(val){
                    console.log({"stored item error":val})
                    
                }
                else{
                    console.log({SUCCESS: payload})
                    this.authUser = payload
                }
            })
            
          } catch (error) {
            console.log('err', error)
          }
    }
         

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        }
      componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
      }

       onBackPress () {
        Actions.main();
        return true;
      }
      async verify(code) {
        const apiKey = 'AHUE6wpgHdfiCBfufNouWlOsUrM8sr80l17xnuY+NSNol60dI2+3nFC5IHd1SHKCm3UEcIzQ'
          console.log("called", code, this.props.data)
        //   this.store("this.props.data")
        var params = new URLSearchParams();
        params.append('user_id', this.props.data.id);
        params.append('token', code);
        axios.post(`http://api.atikuvotersapp.org/verifytoken/${apiKey}`, params)
        .then(response => {
            console.log({VerifyRes:response})
            if(response.data.status !== 'false') {
                console.log(response)
                this.store(JSON.stringify(this.props.data))
               Actions.home({data: this.props.data})
               console.log(code)
            }
            else {
                ToastAndroid.show('Token incorrect', ToastAndroid.SHORT);
            }
        })
        .catch(err => console.log(err)) 
      }
        resend() {
        var params = new URLSearchParams();
        params.append('user_id', this.props.data.id);
        this.setState({disabled: true})
        axios.post('http://api.atikuvotersapp.org/resendverificationcode', params)
        .then(response => {
            if(response.data.status !== 'false') {
                ToastAndroid.show('Code has been sent', ToastAndroid.SHORT);
            }
            else {
                this.setState({disabled: false})
                ToastAndroid.show('Error Sending Code', ToastAndroid.SHORT);
            }
        })
        .catch(err => console.log(err)) 
      }
    
    render(){

        return(
            <ImageBackground source={require('../img/bg-32.png')} style={styles.bgImg} >
                <KeyboardAvoidingView style={styles.container}>
                    <Image source={require('../img/icons-24.png')} style={styles.logo}/>
                    <View style={ styles.bottom  } >
                    <Text style = {styles.instruction}> Verify Your Phone Number </Text> 
                    <Text style = {styles.instruction}> Enter Five Digit Code</Text>
                        <View style={ styles.code  }> 
                            <CodeInput
                                ref="codeInputRef1"
                                keyboardType="numeric"
                                secureTextEntry
                                className={'border-b'}
                                codeLength={5}
                                space={5}
                                cellBorderWidth={3}
                                size={30}
                                autoFocus={false}
                                inputPosition='left'
                                onFulfill={(code) => {
                                    this.setState({
                                        token: code
                                    })
                                    this.verify(code)
                                }}
                            />
                        </View>
                    </View>
                        <View style={styles.buttonContainer}>
                            <Button onPress={() => this.resend()} containerStyle={styles.butCont}
                            styleDisabled={{backgroundColor: '#999', opacity: 0.5}}
                            disabled={this.state.disabled}
                            style={styles.button}>Resend Code</Button>                 
                        </View>
                        <View>
                            <Text style={styles.olduser}onPress={() => Actions.dnd()}>Didn't get a message? Click here</Text>
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
        alignSelf: 'center',
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
      olduser: {
        color: '#fff',
        marginTop: '6%',
        marginBottom: '3%',
        alignSelf: 'center',
        fontSize:  (( Dimensions.get('window').height) * 0.023)
      }
})
