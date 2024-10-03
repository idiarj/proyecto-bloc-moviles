import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, ScrollView, View, ImageBackground} from "react-native";
import CustomButton from '../../components/Button/CustomButton'; 
import CustomInput from '../../components/Input/CustomInput';  
import register from '../../assets/register.jpg';


const ResetPassword = () => {
    const [code, setCode] = useState("");
    const [newPassword, setnewPassword] = useState("");

    const onSubmitPressed = () => {
        console.log("Send pressed");
    };



    return (
        <ImageBackground source={register} style={styles.background}>
        <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.root}>
                    <Text style={styles.title}>DAILY DIARIES</Text>
                    <Text style={styles.subTitle}>Cambio de Contraseña</Text>
                   <View style={{...styles.container, width: "100%"}}>
                    <CustomInput
                        placeholder="Ingrese el codigo"
                        value={code}
                        setvalue={setCode}
                    />

                    <CustomInput
                        placeholder="Nueva Contraseña"
                        value={newPassword}
                        setvalue={setnewPassword}
                    />      

                    <CustomButton text="Enviar" onPress={onSubmitPressed} />

                    </View>
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
    title: {
        color: 'white',
        fontSize: 40,
        alignSelf: 'center',
        fontFamily: 'Garet',
        marginBottom: 40,
        marginTop: 50,
    },
    subTitle: {
        color: 'white',
        fontSize: 25,
        marginBottom: 20,
        marginLeft: 15,
    },
    container: {
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: 20,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        color: 'white',
    },
});


export default ResetPassword;