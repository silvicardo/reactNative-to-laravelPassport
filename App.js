/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

 import React, {Component} from 'react';
 import axios from 'axios';
 import * as axiosHelper from './axiosHelper';
 import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

 type Props = {};
 export default class App extends Component<Props> {

   //impostiamo lo stateda per il componente, conterrà i dati
   //degli input
   state = {
     isLoggedIn: false,
     currentUser: {},
     email: '',
     password: '',
     token: null,
     error: null,
   }

   emailChangeHandler = (text) => {

     this.setState({ email: text})
   }

   passwordChangeHandler = (text) => {

     this.setState({ password: text})
   }

  onLoginSubmit = async (event) => {

      try {

      const { data } = await axios(axiosHelper.getLoginConfig(this.state));

      this.setState({ isLoggedIn: true, ...data });

    } catch(error) {

      this.setState({ error: error && error.response.data.error || "Unprocessable entity" })

    }

   }

   onLogoutSubmit = async (event) => {

    try {

      const {data} = await axios(axiosHelper.getLogoutConfig(this.state.token));

      alert('Just logged out');

      this.setState({ isLoggedIn: false, currentUser: {}, email: '', password: '', token: null, error: null });

    } catch(error){

      this.setState({ error: error && error.response.data.message  || "Logout Failed"});

    }

  }

   render() {

     let content;

     //Create content based on login status
     let headerMessage = this.state.isLoggedIn ?
      `Welcome to your account ${this.state.currentUser.name}` : 'Login to the Laravel API';

     if (!this.state.isLoggedIn){//NOT LOGGED
        content = (
          <View>
          {this.state.error /* show an error if there is any */
             && (<Text style={{...styles.welcome, color: 'red',fontSize: 15}}>{this.state.error}</Text>)}
          <TextInput
          placeholder={'Type your email'}
          keyboardType={'email-address'}
          autoCapitalize={'none'}
          style={styles.inputs}
          value={this.state.email}
          onChangeText={this.emailChangeHandler}
          editable={true}
          autoFocus={true}
          clearButtonMode={'while-editing'}
          clearTextOnFocus={true}
          />
          <TextInput
          placeholder={'Type your password'}
          secureTextEntry={true}
          autoCapitalize={'words'}
          style={styles.inputs}
          value={this.state.password}
          onChangeText={this.passwordChangeHandler}
          editable={true}
          autoFocus={false}
          clearButtonMode={'while-editing'}
          clearTextOnFocus={true}
          />
          <TouchableOpacity
          style={styles.submitBtn}
          onPress={this.onLoginSubmit}
          >
           <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
          </View>
          )
     } else {//LOGGED IN
        content = (
          <View>
            <Text style={styles.welcome}>Email: {this.state.currentUser.email}</Text>
            <TouchableOpacity
            style={styles.submitBtn}
            onPress={this.onLogoutSubmit}
            >
             <Text style={styles.loginText}>Logout</Text>
            </TouchableOpacity>
          </View>
          )
     }

     return (
       <View style={styles.container}>
         <Text style={styles.welcome}>{headerMessage}</Text>
         {content}
       </View>
     );
   }
 }

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: 'flex-start',
     alignItems: 'center',
     backgroundColor: '#F5FCFF',
     marginTop: 100
   },
   welcome: {
     fontSize: 20,
     textAlign: 'center',
     margin: 10,
     marginBottom: 30
   },
   instructions: {
     textAlign: 'center',
     color: '#333333',
     marginBottom: 5,
   },
   inputs : {
    width: 300,
    borderColor: 'black',
    borderWidth: 1,
    padding: 20,
    borderRadius: 12,
    marginBottom: 20
  },
  submitBtn: {
    padding: 20,
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: 'green',
    marginBottom: 20
  },
  loginText:{
       color:'#fff',
       textAlign:'center',
   }
 });
