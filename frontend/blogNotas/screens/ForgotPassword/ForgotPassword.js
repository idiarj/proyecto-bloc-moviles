import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, ScrollView, View, ImageBackground} from "react-native";
import CustomButton from '../../components/Button/CustomButton'; 
import CustomInput from '../../components/Input/CustomInput';  
import register from '../../assets/register.jpg';


const ForgotPassword = () => {
    const [mail, setMail] = useState("");

    const onSendPressed = () => {
        console.log("Send pressed");
    };

    return (
        <ImageBackground source={register} style={styles.background}>
        <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.root}>
                    <Text style={styles.title}>Recuperar Contraseña</Text>

                    <CustomInput
                        placeholder="Ingrese su correo"
                        value={mail}
                        setvalue={setMail}
                    />

                    <CustomButton text="Enviar" onPress={onSendPressed} />

                    <CustomButton
                        text="Volver al inicio"
                        onPress={() => navigation.navigate("Login")}
                        style={{ backgroundColor: "transparent" }}
                    />
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        color: 'white',
    },
});


export default ForgotPassword;