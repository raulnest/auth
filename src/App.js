import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from '@firebase/app';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {

  state = { loggedIn:null };

  componentWillMount() {
    firebase.initializeApp ({
        apiKey: 'AIzaSyBZ57eHO80VIaXzmUjbQhHhdC0YEu70xK8',
        authDomain: 'authentication-9e715.firebaseapp.com',
        databaseURL: 'https://authentication-9e715.firebaseio.com',
        projectId: 'authentication-9e715',
        storageBucket: 'authentication-9e715.appspot.com',
        messagingSenderId: '1083009671127'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({loggedIn:true});
      } else {
        this.setState({loggedIn:false});
      }
    });
  }

  renderContent() {

    switch (this.state.loggedIn) {
      case true:
        return (
          <View style={{ flexDirection : 'row'}}>
            <Button onPress={() => firebase.auth().signOut()}>
            Log Out
            </Button>
          </View>
        );

      case false:
        return <LoginForm/>;

      default:
        return <Spinner size={"large"} />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}

      </View>
    );
  }
}


export default App;
