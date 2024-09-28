import React from "react";
import {StyleSheet, Pressable } from "react-native";

const CustomButton = ({onPress, text }) => {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Text style={styles.Text}>boton</Text>
        </Pressable>
    );
};   

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 15,
        alignItems: 'center',
    },
    Text: {
        height: 45,
        color: 'white',
        fontSize: 16,
        paddingHorizontal: 10,
        borderColor: 'white',
        alignItems: 'center',
    },
});