import React, { Component } from 'react'
import { AdMobBanner } from 'react-native-admob'
import { StyleProvider, Container, Header, Left, Body, Title, Right, Icon, ListItem, Content, List } from 'native-base'
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import { Dimensions, StyleSheet, TouchableOpacity, Image, Text, View, BackHandler, ToastAndroid, ActivityIndicator, ScrollView, Button, RefreshControl } from 'react-native'
import { Actions } from 'react-native-router-flux'
import axios from 'axios'

class Topics extends Component {
    constructor() {
        super()
        this.state = {
           isLoading: true,
           topics: [],
           error: false,
           refreshing: false
        }
        this.baseState = this.state
    }
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
      componentWillMount() {
        this.fetchTopics()
      }
      fetchTopics = async () => {
        var apiKey = 'AHUE6wpgHdfiCBfufNouWlOsUrM8sr80l17xnuY+NSNol60dI2+3nFC5IHd1SHKCm3UEcIzQ'
          axios.get(`http://api.atikuvotersapp.org/getforumtopics/${apiKey}`)
          .then(res => this.setState({
              isLoading: false,
              topics: res.data.message
          }))
          .catch(err => {
            this.setState({
                isLoading: false,
                error: true
              })
          })
      }
      
      reset = () => {
        this.setState(this.baseState)
        this.fetchTopics()
      }
      _onRefresh() {
        this.setState({refreshing: true})
        this.fetchTopics().then(() => {
          this.setState({
            refreshing: false
          })
        })
      }
      
    render() {
        const items = this.state.topics.map((topic, i) => {
            return (
                <ListItem key={topic.id} onPress={() => Actions.forum({data: [topic, this.props.data]})} style={{backgroundColor: '#f2f2f2'}}>
                    <Text style={styles.topics}>{topic.topic}</Text>
                    <Text style={styles.topics2}>Tap to join chat</Text>
                </ListItem>
            )
        })
        if (this.state.isLoading) {
            return (
              <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator size="large" color="#008841"/>
              </View>
            );
          }
          else if (this.state.error) {
            return (
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: '#000'}}>Could not load Topics :(</Text>
                <Text></Text>
                <Button onPress={() => {this.reset()}} title="RETRY" color='#008841'></Button>
              </View>
              
            )
          }
    
        return (
                <StyleProvider style={getTheme(material)}>
                    <Container style={styles.container}>
                        <Header style={{ marginTop: (( Dimensions.get('window').height) * 0.024)}}>
                            <Left>
                                <TouchableOpacity onPress={() => Actions.drawerOpen()} style={styles.touchable} activeOpacity = {0.8}>
                                    <Image source={require('../img/icons-02.png')} style={styles.open}/>
                                </TouchableOpacity>
                            </Left>
                            <Body>
                                <Title style={styles.title}>ATIKU'S VOTERS APP</Title>
                            </Body> 
                            <Right>
                                <TouchableOpacity onPress={() => Actions.pop()} style={styles.touchable} activeOpacity = {0.8}>
                                    <Image source={require('../img/back.png')} style={styles.open}/>
                                </TouchableOpacity>    
                            </Right> 
                        </Header>
                        <Text style={styles.topic} > CHAT FORUM </Text>
                        <Content>
                            <ScrollView refreshControl={
                                <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh.bind(this)}
                                />
                                }>
                                <List style={styles.list}>
                                {items}
                                </List>
                            </ScrollView>
                            
                        </Content>
                            <AdMobBanner
                                style={styles.banner}
                                adSize="fullBanner"
                                adUnitID="ca-app-pub-6559209856638953/2268666191"
                            />
                    </Container>
                </StyleProvider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF'
    },
    open: {
        width:  (( Dimensions.get('window').height) * 0.025),
        height:  (( Dimensions.get('window').height) * 0.025),
        marginTop: '9%',
        marginLeft: '4%'

    },
    title: {
        fontSize: (( Dimensions.get('window').height) * 0.024), 
        position: 'absolute',
        top: '-18%',
        left: '26%'
    },
    
    topic: {
        color: '#008841',
        fontSize: (( Dimensions.get('window').height) * 0.025),
        marginTop: '5%',
        alignSelf: 'center' 
    },
    topics: {
        color: '#008841',
        fontSize: (( Dimensions.get('window').height) * 0.023),
        padding: '5%'
    },
    topics2: {
        position: 'absolute',
        bottom: '15%',
        left: '5%',
        color: '#ccc',
        fontSize: (( Dimensions.get('window').height) * 0.02),
    },
    list: {
        marginTop: '6%',
    },
    
      content: {
        marginTop: '3%'
    },
    banner: {
        opacity: 0,
        position: 'absolute',
        bottom: -200
    },
   
})

export default Topics