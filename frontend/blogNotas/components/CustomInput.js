import React from "react";
import { View, StyleSheet, TextInput } from "react-native";

const CustomInput = ({ value, setvalue, placeholder, secureTextEntry }) => {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                value={value}
                onChangeText={setvalue}
                placeholder={placeholder}
                style={styles.input}
                secureTextEntry={secureTextEntry}
                placeholderTextColor="white"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Fondo semitransparente
        borderRadius: 10,
        marginBottom: 20,
        paddingHorizontal: 15,
    },
    input: {
        height: 45,
        color: 'white',
        fontSize: 16,
        paddingHorizontal: 10,
        borderBottomWidth: 2, // Línea inferior
        borderColor: 'white',
    },
});

export default CustomInput;