import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, TextInput, Keyboard, TouchableOpacity, Dimensions, Picker, BackHandler, ToastAndroid, ScrollView} from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';
import { Actions } from 'react-native-router-flux'


export default class Login extends Component{
    
    componentDidMount () {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
      }
    
      componentWillUnmount () {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
      }
    
      onBackPress () {
       BackHandler.exitApp()
      }
    render(){
        return(
            <ImageBackground source={require('../img/bg-32.png')} style={styles.bgImg} >
                <View style={styles.container}>
                    <Image source={require('../img/icons-24.png')} style={styles.logo}/>
                    <Text style={styles.welcome}>Welcome!</Text>
                    <Content style={styles.content}>
                        <Button bordered danger style={styles.button} onPress={() => Actions.login()}>
                            <Text style={styles.text}>Signup</Text>
                        </Button>
                        <Button bordered danger style={styles.button}  onPress={() => Actions.olduser()}>
                            <Text style={styles.text}>Signin</Text>
                        </Button>
                    </Content>
                        
                </View>
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
  
    bgImg: {
        flex: 1,
        alignSelf: 'stretch',
        width: null,
        justifyContent: 'center'
    },
    logo: {
        width:  (( Dimensions.get('window').height) * 0.23),
        height:  (( Dimensions.get('window').height) * 0.23),
        marginLeft: '31%',
        marginTop: '8%'
    },
   
      welcome: {
          color: '#fff',
          fontSize: (( Dimensions.get('window').height) * 0.03),
          alignSelf: 'center',
          marginTop: '15%'
      },
      button: {
          borderColor: '#fff',
          borderRadius: 25,
          alignSelf: 'center',
          marginTop: '10%'
      },
      
      text: {
          padding: '15%',
          fontSize: (( Dimensions.get('window').height) * 0.025),
      }
})
