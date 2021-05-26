import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View, StatusBar } from 'react-native';
import Auth from "./src/components/Auth"
import firebase from './src/utils/firebase';
import "firebase/auth/";
import ListItem from './src/components/ListItem';

export default function App() {

  const [user,setUser] = useState(undefined);

  useEffect(()=>{
    firebase.auth().onAuthStateChanged((response)=>{
      setUser(response);
    })
  },[]);

  if(user === undefined) return null;

  console.log(user.uid);

  return (
    <>
    <StatusBar barStyle = "light-content"/>
      <SafeAreaView style={styles.background}>
        {user ? <ListItem/>:<Auth/>}
      </SafeAreaView>
    </>
  );
}

function Logout() {
  const logout = ()=>{
    firebase.auth().signOut();
  }
  return(
    <View>
      <Text>Bienvenido </Text>
      <Button title = "cerrar sesión" onPress={logout}></Button>
    </View>
  )
}

const styles = StyleSheet.create({
  background:{
    backgroundColor: "#15212b",
    height:"100%",
  }
});