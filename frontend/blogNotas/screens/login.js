import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import login from '../assets/login.jpg'; 
import CustomInput from '../components/CustomInput';  

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const onSingInPress = () => {
        console.log('Sing in');
    };  

    const handleLogin = () => {
        if (!username || !password) {
            Alert.alert('Error', 'Por favor completa todos los campos.');
            return;
        }
        //logica de inicio de sesion, 
        Alert.alert('Inicio de sesión', '¡Has iniciado sesión correctamente!');
    };

    return (
        <ImageBackground source={login} style={styles.background}>
            <View style={styles.container}>

                <Text style={styles.title}>DAILY DIARIES</Text>

                <Text style={styles.subTitle}>Iniciar sesión</Text>

                <CustomInput
                    value={username}
                    setvalue={setUsername}
                    placeholder="Nombre de usuario"
                />
                <CustomInput
                    value={password}
                    setvalue={setPassword}
                    placeholder="Contraseña"
                    secureTextEntry
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Iniciar sesión</Text>
                </TouchableOpacity>


                <Text style={styles.signInText}>
                    ¿No tienes cuenta? <Text style={styles.signInLink}>Regístrate aquí</Text>
                </Text>
            </View>
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
        width: '80%',
        alignItems: 'flex-start',
        borderRadius: 10,
        padding: 20,
        marginTop: -200,
    },
    title: {
        color: 'white',
        fontSize: 40,
        fontFamily: 'Garet',
        alignSelf: 'center',
        marginBottom: 40,
    },
    subTitle: {
        color: 'white',
        fontSize: 25,
        marginBottom: 20,
        marginLeft: 15,
    },
    button: {
        backgroundColor: 'transparent',
        borderRadius: 5,
        borderColor: 'white',
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 30,
        alignSelf: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    signInText: {
        color: 'white',
        marginTop: 20,
        alignSelf: 'center',
    },
    signInLink: {
        color: 'blue',
        textDecorationLine: 'underline',    },
});

export default Login;