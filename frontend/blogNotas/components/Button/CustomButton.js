import React from "react";
import {View, Text, StyleSheet, Pressable } from "react-native";

const CustomButton = ({onPress, text }) => {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Text style={styles.Text}>{text}</Text>
        </Pressable>
    );
};   

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        borderRadius: 5,
        borderColor: 'white',
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 30,
        alignSelf: 'center',
        marginTop: 11,
        marginBottom: 7,
    },
    Text: {
        color: 'white',
        fontSize: 16,
    },
});

export default CustomButton;