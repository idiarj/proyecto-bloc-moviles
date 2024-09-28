import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import register from '../assets/register.jpg'; 
import CustomInput from '../components/CustomInput';  

const Register = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [correoError, setCorreoError] = useState('');

    const validarCorreo = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleRegister = () => {
        if (!validarCorreo(correo)) {
            setCorreoError('Por favor ingrese un correo válido.');
        } else {
            setCorreoError('');
            Alert.alert('Registro exitoso', 'Su cuenta ha sido creada.');
        }
    };

    return (
        <ImageBackground source={register} style={styles.background}>
            <View style={styles.container}>

                <Text style={styles.title}>DAILY DIARIES</Text>
                <Text style={styles.subTitle}>Registro</Text>

                <CustomInput
                    value={nombre} 
                    setvalue={setNombre} 
                    placeholder="Nombre" 
                />
                <CustomInput 
                    value={apellido} 
                    setvalue={setApellido} 
                    placeholder="Apellido" 
                />
                <CustomInput
                    value={correo} 
                    setvalue={setCorreo} 
                    placeholder="Correo" 
                />
                {correoError ? <Text style={styles.errorText}>{correoError}</Text> : null}
                <CustomInput
                    value={password} 
                    setvalue={setPassword} 
                    placeholder="Contraseña" 
                    secureTextEntry 
                />

                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Registrarse</Text>
                </TouchableOpacity>

                <Text style={styles.signInText}>
                    ¿Tienes cuenta? <Text style={styles.signInLink}>Iniciar sesión aquí</Text>
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
        alignItems: 'Flex-start',
        borderRadius: 10,
        padding: 20,
        marginTop: -200,
    },
    title: {
        color: 'white',
        fontSize: 40,
        alignSelf: 'center',
        fontFamily: 'Garet',
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
        fontFamily: 'Garet',
    },
    errorText: {
        color: 'red',
    },
    signInText: {
        color: 'white',
        marginTop: 20,
        alignSelf: 'center',
    },
    signInLink: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
});

export default Register;