import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from '../utils/firebase'
import "firebase/firestore";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment';


const db = firebase.firestore(firebase);

export default function AddItem(props) {

    const { user, setShowList } = props;

    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

    const [formData, setFormData] = useState({});

    const [error, setError] = useState({});

    const hideDatePicker = () => {
        setIsDatePickerVisible(false);
    };
    const confirm = (date) => {
        const fecha = date;
        fecha.setHours(0);
        fecha.setMinutes(0);
        fecha.setSeconds(0);

        hideDatePicker();
    };
    const showDatePicker = () => {
        setIsDatePickerVisible(true);
    };

    const onSubmit = () => {
        let errors = {};
        if (!formData.name || !formData.lastName || !formData.fecha) {
            if (!formData.name) error.name = true;
            if (!formData.lastName) error.lastName = true;
            if (!formData.fecha) error.fecha = true;
        }
        else {
            const item = formData;

            db.collection(user.uid)
                .add(item).then(() => {
                    setShowList(true);
                })
                .catch(() => {
                    error({ name: true, lastName: true, fecha: true })
                })
        }
        setError(errors)

    };

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }
    return (
        <>
            <View style={styles.container}>
                <TextInput style={[styles.input, error.name && { borderColor: "#940c0c" }]}
                    placeholder="Nombre"
                    placeholderTextColor="#969696"
                    onChange={(e) => onChange(e, "name")} />

                <TextInput style={[styles.input, error.lastName && { borderColor: "#940c0c" }]}
                    placeholder="Apellidos"
                    placeholderTextColor="#969696"
                    onChange={(e) => onChange(e, "lastName")} />

                <View style={[styles.input, styles.datepicker, error.fecha && { borderColor: "#940c0c" }]}>
                    <Text
                        style={{ color: formData.fecha ? "#fff" : "#969696", fontSize: 18 }}
                        onPress={showDatePicker}>
                        {
                            formData.fecha
                                ? moment(formData.fecha).format('LL')
                                : "Fecha de nacimiento"
                        }
                    </Text>
                </View>

                <TouchableOpacity onPress={onSubmit}>
                    <Text style={styles.addButton}>Crear Item</Text>
                </TouchableOpacity>

            </View>

            <DateTimePicker
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={confirm}
                onCancel={hideDatePicker}
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        height: 50,
        color: "#969696",
        width: "80%",
        marginBottom: 25,
        backgroundColor: "#1e3040",
        paddingHorizontal: 20,
        borderRadius: 30,
        fontSize: 18,
        borderWidth: 1,
        borderColor: "#fff"
    },
    datepicker: {
        justifyContent: "center"
    },
    addButton: {
        fontSize: 18,
        color: "#fff"
    }
});