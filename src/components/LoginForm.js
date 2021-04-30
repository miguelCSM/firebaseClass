import React, {useState} from 'react';
import {View,StyleSheet, Text,TouchableOpacity} from 'react-native';

export default function LoginForm(props) {
    
    const {changeForm} = props;
    return(
        <View>
            <Text>Login Form</Text>
            <TouchableOpacity onPress={changeForm}>
                <Text style={stylesv.btnT}>Registrate</Text>
            </TouchableOpacity>
        </View>
    );
}

const stylesv=  StyleSheet.create({
    btnT:{
        color:"#fff",
        fontSize:18
    }
});