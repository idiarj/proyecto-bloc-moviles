import React from "react";
import { View, StyleSheet, Text, TextInput} from "react-native";

const Inputs = (value, setvalue, placeholder) => {
    return (
        <View style={styles.container}>
           <TextInput
           value={value}
           onChange={setvalue}
           placeholder={placeholder}
           style={styles.input}/> 

        </View>
    );
};   
const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        width: '100%',
        padding: 20,
        paddingHorizontal: 10,
        bprdercolor: '#e8e8e8',
        borderRadius: 5,
        borderWidth: 1,
        marginVertical: 5,
    },
    input: {
    
    },
});
    export default Inputs