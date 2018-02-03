import React, { Component } from 'react'
import { ActivityIndicator, View, AsyncStorage, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'


export default class Loader extends Component {
    constructor() {
        super()
    
    }
    render() {
        return (
            <View style={styles.container}>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#008841',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    }
})
